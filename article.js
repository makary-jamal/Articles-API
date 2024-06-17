const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    url: String,
    photo_link: String,
    category : String
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
