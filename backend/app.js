const express = require('express');
const app = express();

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
