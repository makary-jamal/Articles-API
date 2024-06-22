const express = require("express");
const mongoose = require("mongoose");

const Article = require("./article");

const app = express();

// Connect to MongoDB
const uri =
  "mongodb+srv://makary_gamal:HT9VwfAJE0JdkJev@cluster0.n13ua1m.mongodb.net/?retryWrites=true&w=majority&appName=test";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create a new article
app.post("/", async (req, res) => {
  const article = new Article({
    title: "Article 1",
    description: "Description 1",
    url: "https://www.example.com",
    photo_link: "https://www.example.com/photo.jpg",
    category : "Category1",
  });

  try {
    const newArticle = await article.save();
    res.status(201).json({
      status: "success",
      data: newArticle,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
});

// Get all articles
app.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({
      status: "success",
      length: articles.length,
      data: articles,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
});

// Get an article by ID
app.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: article,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
});

// Get an article by Category

app.get("/:category", async (req, res) => {
  try {
    const article1 = await Article.find(req.category);
    res.status(200).json({
      status: "success",
      data: article1,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
