const express = require('express');
const bodyParser = require('body-parser');

const Post = require('./models/post');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req,res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added succsesfuly!'
  })
});

app.use('/api/posts',(req, res, next) => {
  const posts = [
    {
      id: 'dfg3427sdg',
      title: "First server-side post",
      content: "This is commit from the server"
    },
    {
      id: 'dfg34rwrsdg',
      title: "Second server-side post",
      content: "This is commit from the server"
    }
  ];
  res.status(200).json({
    message: 'Posts fetched seccesfully!',
    posts: posts
  });
});

module.exports = app;
