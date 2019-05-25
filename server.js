const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

var db = require ("./models");

var PORT = 8080;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/wsjArticles", {useNewUrlParser:true});

app.get("/scrape", function(req,res){
    axios.get("https://www.wsj.com/news/business/industrial-services").then(function(response){
        var $ = cheerio.load(response.data);
        $("article").each(function(i, element){
            var result = {};

            result.headline = $(this)
            .children(".WSJTheme_headline_19_2KfxGdC8OTxXXrZcwJ2 a")
            .text();
            result.url = $(this)
            .children(".WSJTheme_headline_19_2KfxGdC8OTxXXrZcwJ2 a")
            .attr("href");
            result.summary = $(this)
            .children("p")
            .text();
            result.artCategory= $(this)
            .children(".WSJTheme_articleType_WZo32uUhVLQVoD6_eTR7q span")
            .text();

            console.log(result);
        })
    })
})