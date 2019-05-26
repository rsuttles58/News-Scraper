const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

    headline: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    artCategory: {
        type: String,
        required: true
    },

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }

});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;