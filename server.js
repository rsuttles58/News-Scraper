const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

var db = require("./models");

var PORT = 8080;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bravesArticles";
mongoose.connect(MONGODB_URI);

const artUrl = "http://www.espn.com/mlb/team/_/name/atl/atlanta-braves";


//Scrape route
app.get("/scrape", function (req, res) {
    axios.get(artUrl).then(function (response) {
        const $ = cheerio.load(response.data);

        const results = [];

        $("article.news-feed-item.news-feed-story-package").each(function (i, element) {
            let title = $(element).find("a.realStory").text()
            let timeStamp = $(element).find(".timestamp").text()
            let url = artUrl + ($(element).find("a.realStory").attr("href"));
            let summary = $(element).find("p").text();

            results.push({
                title: title,
                timeStamp: timeStamp,
                url: url,
                summary: summary
            });
            console.log("Local Results:" + results);
            db.Article.create(results)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                }).catch(function (err) {
                    console.log(err);
                })
        });

        // Log the results once you've looped through each of the elements found with cheerio
        // console.log(results);
    });
    res.send("Scrape Complete");
})

//Route that grabs all articles from DB.
app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

//Route that grabs an article by ID.
app.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {

        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});