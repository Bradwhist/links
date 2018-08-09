// var express = require('express');
// var router = express.Router();
// //var models = require('./../../src/models');
// router.get('/api', function(req, res) {
//   res.send('hello');
// })
//
// return router;
const express = require('express');
const User = require('../models/User')
const Post = require('../models/Post');
const Sub = require('../models/Sub');
const Comment = require('../models/Comment');
const router = new express.Router();
//middleware for verifying token
router.use(function(req, res, next) {

  if (!req.headers.token) {
    return res.send('no token in request, gg no re');
  }
  User.findOne({token: req.headers.token})
  .then(user => {
    if (!user) {
      return res.send('token no good.  construct additional tokens');
    }
    res.locals.user = user;
    next();
  })
  .catch(err => console.log('error in middleware', err))
});
// API Routes
// Create new post
router.post('/post', function(req, res) {
  Sub.findById(req.body.sub).exec()
  .then(sub => {
    var currentTime = new Date();
    var newPost = new Post({
      author: {
        id: res.locals.user._id,
        name: res.locals.user.name,
      },
      title: req.body.title,
      content: req.body.content,
      sub: {
        id: req.body.sub,
        title: sub.title,
      },
      createdAt: currentTime,
      flair: '',
    })
    newPost.save()
    .then(response => res.json(newPost))
    .catch(err => res.send(err))
  })
  .catch(err => res.send(err))
})
//
// Create new Sub
router.post('/sub', function(req, res) {
  var currentTime = new Date();
  var newSub = new Sub({
    title: req.body.title,
    founder: {
      name: req.body.name,
      id: req.body.id
    },
    posts: [],
    createdAt: currentTime,
  })
  newSub.save()
  .then(response => res.json(newSub))
  .catch(err => res.send(err))

})
//
// Post comment to post
router.post('/rootComment', function(req, res) {
  var currentTime = new Date();
  var newComment = new Comment({
    author: {
      name: req.user.name,
      id: req.user
    },
    content: req.body.content,
    createdAt: currentTime,
    upVotes: [],
    downVotes: [],
    ancestor: req.body.parent,
  })

  newComment.save()
  .then(response => {
    Post.findById(req.body.parent).exec()
    .then(post => {
      post.comments.push(response.id);
      post.save();

      res.json({newComment: newComment, parentPost: post})
    })
    .catch(err => res.send(err))
  })
  .catch(err => res.send(err))
})
//
// Post comment to comments
router.post('/comment', function(req, res) {

  Comment.findById(req.body.parent).exec()
  .then(comment => {
    var currentTime = new Date();
    var newComment = new Comment({
      author: {
        name: req.user.name,
        id: req.user
      },
      content: req.body.content,
      createdAt: currentTime,
      upVotes: [],
      downVotes: [],
      parent: req.body.parent,
      ancestor: comment.ancestor,
    })

    newComment.save()
    .then(response => {
      comment.comments.push(response.id);
      comment.save();
      res.json({newComment: newComment, parentComment: comment})
    })
    .catch(err => res.send(err))
  })
  .catch(err => res.send(err))
})
//
// Get all posts
router.get('/post', function(req, res) {
  Post.find().exec()
  .then(posts => res.json(posts))
  .catch(err => res.send(err))
})
//
// Get Posts by Subscriptions
router.get('/post/bySub/:sub', function(req, res) {
  Post.find({"sub.id": req.params.sub }).exec()
  .then(posts => res.json(posts))
  .catch(err => res.send(err))
})
//
//Get posts by users
router.get('/post/byUser/:user', function(req, res) {
  Post.find({"author.id": req.params.user }).exec()
  .then(posts => res.json(posts))
  .catch(err => res.send(err))
})
//
//Get post by post id
router.get('/post/byPost/:post', function(req, res) {
  Post.findById(req.params.post).exec()
  .then(post => res.json(post))
  .catch(err => res.send(err))
})
//
router.post('/post/edit/', function(req, res) {
  Post.findById(req.body.id).exec()
  .then(post => {
    post.content = req.body.content;
    post.save();
  })
})
//
// Get all Subscriptions
router.get('/sub', function(req, res) {
  Sub.find().exec()
  .then(subs => res.json(subs))
  .catch(err => res.send(err))
})
//
// Test logged inspect
router.get('/currentUser', (req, res) => {
  console.log('req.user in current user', req.user);
  res.json(req.user);
})
// Token check user
router.get('/checkUser', (req, res) => {
  console.log('token in checkuser route', req.headers.token);
  User.findOne({ token: req.headers.token })
  .then(user => res.json(user))
  .catch(err => console.log(err))
})
//Test Dashboard
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
});

module.exports = router;
