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
const BigNumber = require('bignumber.js');
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
      upvotes: [res.locals.user._id],
      sub: {
        id: req.body.sub,
        title: sub.title,
      },
      createdAt: currentTime,
      flair: '',
    })
    newPost.save()
    .then(response => {
      console.log('CONSOLE LOGGING SUB IN RESPONSE', sub, 'response: ', response);
      sub.posts.push(response._id);
      sub.save();
      return res.json(newPost);
    })
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
    description: req.body.description,
    image: req.body.image,
    founder: {
      name: res.locals.user.name,
      id: res.locals.user._id,
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
  console.log('in root comment');
  var currentTime = new Date();
  var newComment = new Comment({
    author: {
      name: res.locals.user.name,
      id: res.locals.user._id,
    },
    content: req.body.content,
    createdAt: currentTime,
    upvotes: [res.locals.user._id],
    ancestor: req.body.postId,
  })

  newComment.save()
  .then(response => {
    Post.findById(req.body.postId).exec()
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
        name: res.locals.user.name,
        id: res.locals.user._id,
      },
      content: req.body.content,
      createdAt: currentTime,
      upvotes: [res.locals.user._id],
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
// Post upvote to post
router.post('/vote/post/up', function(req, res) {
  Post.findById(req.body.post)
  .then(post => {
    let upIndex = post.upvotes.indexOf(res.locals.user._id);
    if (upIndex === -1) {
      let downIndex = post.downvotes.indexOf(res.locals.user._id);
      if (downIndex !== -1) {
        post.downvotes.splice(downIndex, 1);
      }
      post.upvotes.push(res.locals.user._id);
      } else {
      post.upvotes.splice(upIndex, 1);
    }
    let vote = post.upvotes.length - post.downvotes.length;
    console.log(vote);
    let x = new BigNumber(0);     // Big number for greater accuracy
    let y = new BigNumber(0);
    let a = new BigNumber(0);
    let b = new BigNumber(0);
    if (vote === 0) {
      x = 1;
      y = 0;
    } else if (vote < 0){                              // else case to handle negative scores in case of more down than up votes
      x = vote * -1;
      y = (post.createdAt.getTime() / 1000) * -1;     // y = Time in seconds since arbitrary start time
    } else {
      x = vote;
      y = post.createdAt.getTime() / 1000;
    }
    console.log('x:', x, 'y', y);
    a = 1 / (2 * (10 ** 5));                           // coefficients for algorithm - vote coefficient
    b = y / (5 * (10 ** 9));                           // - time coefficient
    post.score = 1 - (1 / ((x ** a) * (Math.E ** b)));  // calculates score based on net vote difference and time posted, maps score to (-1, 1)
    post.save();
  })
  .catch(err => console.log(err))
})
//
// Post downvote to posts
router.post('/vote/post/down', function(req, res) {
  Post.findById(req.body.post)
  .then(post => {
    let downIndex = post.downvotes.indexOf(res.locals.user._id);
    if (downIndex === -1) {
      let upIndex = post.upvotes.indexOf(res.locals.user._id);
      if (upIndex !== -1) {
        post.upvotes.splice(upIndex, 1);
      }
      post.downvotes.push(res.locals.user._id);
    } else {
      post.downvotes.splice(downIndex, 1);
    }
    let vote = post.upvotes.length - post.downvotes.length;
    console.log(vote);
    let x = new BigNumber(0);
    let y = new BigNumber(0);
    let a = new BigNumber(0);
    let b = new BigNumber(0);
    if (vote === 0) {
      x = 1;
      y = 0;
    } else if (vote < 0){                              // else case to handle negative scores in case of more down than up votes
      x = vote * -1;
      y = (post.createdAt.getTime() / 1000) * -1;      // y = Time in seconds since arbitrary start time
    } else {
      x = vote;
      y = post.createdAt.getTime() / 1000;
    }
    console.log('x:', x, 'y', y);

    a = 1 / (2 * (10 ** 5));                            // coefficients for algorithm - vote coefficient
    b = y / (5 * (10 ** 9));                            // - time coefficient
    post.score = 1 - (1 / ((x ** a) * (Math.E ** b)));  // calculates score based on net vote difference and time posted, maps score to (-1, 1)
    post.save();
  })
  .catch(err => console.log(err))
})
//
//Post upvote to comment
router.post('/vote/comment/up', function(req, res) {
  Comment.findById(req.body.comment)
  .then(comment => {
    let upIndex = comment.upvotes.indexOf(res.locals.user._id);
    if (upIndex === -1) {
      let downIndex = comment.downvotes.indexOf(res.locals.user._id);
      if (downIndex !== -1) {
        comment.downvotes.splice(downIndex, 1);
      }
      comment.upvotes.push(res.locals.user._id);
    } else {
      comment.upvotes.splice(upIndex, 1);
    }
    let vote = comment.upvotes.length - comment.downvotes.length;

    let t = comment.upvotes.length + comment.downvotes.length;  // total votes
    if (t === 0) {                                              // handle edge case of no votes
      comment.score = 0.2;
    } else {
    let u = comment.upvotes.length;                             // upvotes
    let r = u / t;                                              //ration of upvotes to total votes
    z = 1.5;                                                    // standard deviations from mean (93.32% confidence interval)
    z2 = z ** 2;                                                // simplify score function
    // Now calculating tail of interval of ratios where we can be 93.32% sure that comment truly warrants score
    comment.score = ((r + z2/(2 * t) - z * Math.sqrt((r * (1 - r) + z2/(4 * t))/t))/(1 + z2/t))  //wilson interval calculation
  }
    comment.save();
  })
  .catch(err => console.log(err))
})
//
// Post downvote to comments
router.post('/vote/comment/down', function(req, res) {
  Comment.findById(req.body.comment)
  .then(comment => {
    let downIndex = comment.downvotes.indexOf(res.locals.user._id);
    if (downIndex === -1) {
      let upIndex = comment.upvotes.indexOf(res.locals.user._id);
      if (upIndex !== -1) {
        comment.upvotes.splice(upIndex, 1);
      }
      comment.downvotes.push(res.locals.user._id);
    } else {
      comment.downvotes.splice(downIndex, 1);
    }
    let vote = comment.upvotes.length - comment.downvotes.length;

    let t = comment.upvotes.length + comment.downvotes.length;  // total votes
    if (t === 0) {                                              // handle edge case of no votes
      comment.score = 0.2;
    } else {
    let u = comment.upvotes.length;                             // upvotes
    let r = u / t;                                              //ration of upvotes to total votes
    z = 1.5;                                                    // standard deviations from mean (93.32% confidence interval)
    z2 = z ** 2;                                                // simplify score function
    // Now calculating tail of interval of ratios where we can be 93.32% sure that comment truly warrants score
    comment.score = ((r + z2/(2 * t) - z * Math.sqrt((r * (1 - r) + z2/(4 * t))/t))/(1 + z2/t))  //wilson interval calculation
  }
    comment.save();
  })
  .catch(err => console.log(err))
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
//Get comments by post id
router.get('/comment/byPost/:post', function(req, res) {
  Comment.find({ "ancestor": req.params.post }).exec()
  .then(comments => res.json(comments))
  .catch(err => res.send(err))
})
//
// Get all Subscriptions
router.get('/sub', function(req, res) {
  Sub.find().exec()
  .then(subs => res.json(subs))
  .catch(err => res.send(err))
})
//
// get sub by id
router.get('/sub/bySub/:subId', function(req, res) {
  Sub.findById(req.params.subId)
  .then(sub => res.json(sub))
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
