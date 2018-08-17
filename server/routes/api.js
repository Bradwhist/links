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
router.use((req, res, next) => {

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
router.post('/post', (req, res) => {
  Sub.findById(req.body.sub).exec()
  .then(sub => {
    var currentTime = new Date();
    let y = 0
    let b = 0
    y = currentTime.getTime() / 1000;
    b = y / (5 * (10 ** 9));
    let initScore = 1 - (1 / (Math.E ** b));


    var newPost = new Post({
      author: {
        id: res.locals.user._id,
        name: res.locals.user.name,
      },
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      upvotes: [res.locals.user._id],
      score: initScore,
      sub: {
        id: req.body.sub,
        title: sub.title,
      },
      createdAt: currentTime,
      flair: req.body.flair,
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
router.post('/sub', (req, res) => {
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
router.post('/rootComment', (req, res) => {
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

      return res.json(newComment)
    })
    .catch(err => res.send(err))
  })
  .catch(err => res.send(err))
})
//
// Post comment to comments
router.post('/comment', (req, res) => {
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
      return res.json(newComment)
    })
    .catch(err => res.send(err))
  })
  .catch(err => res.send(err))
})
//
// Post flair to sub
router.post('/flair', (req, res) => {
  Sub.findById(req.body.sub).exec()
  .then(sub => {
    let flairIndex = sub.flairs.indexOf(req.body.flair);
    if (flairIndex === -1) {
      sub.flairs.push(req.body.flair);
    } else {
      sub.flairs.splice(flairIndex, 1);
    }
    sub.save();
    res.json(sub);
  })
  .catch(err => res.send(err))
})
//
// Post upvote to post
router.post('/vote/post/up', (req, res) => {
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
    res.json(post.score);
  })
  .catch(err => console.log(err))
})
//
// Post downvote to posts
router.post('/vote/post/down', (req, res) => {
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
    res.json(post.score);
  })
  .catch(err => console.log(err))
})
//
//Post upvote to comment
router.post('/vote/comment/up', (req, res) => {
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
    res.json(comment.score);
  })
  .catch(err => console.log(err))
})
//
// Post downvote to comments
router.post('/vote/comment/down', (req, res) => {
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
    res.json(comment.score);
  })
  .catch(err => console.log(err))
})
//
// post subscribe user to sub
router.post('/subscribe', (req, res) => {
  User.findById(res.locals.user._id)
  .then(user => {
    console.log(req.body.sub)
    let subIndex = user.subscriptions.indexOf(req.body.sub);
    console.log(subIndex);
    if (subIndex === -1) {
    user.subscriptions.push(req.body.sub);
  } else {
    user.subscriptions.splice(subIndex, 1);
  }
    user.save();
    console.log(user.subscriptions);
    res.json(user.subscriptions);
  })
})
//
// Delete Routes
// delete post
router.post('/delete/post', (req, res) => {
    Post.findById(req.body.post).exec()
    .then(post => {
      console.log('author', post.author.id, 'locals', res.locals.user.id);
      if (post.author.id == res.locals.user.id) {
        Post.findOneAndDelete( {_id: req.body.post} ).exec()
        .then(() => {
          console.log(req.body.post, post._id);
          Sub.findOne({ posts: { $all: [req.body.post] } })
          .then(sub => {
            let postIndex = sub.posts.indexOf(req.body.post);
            sub.posts.splice(postIndex, 1);
            sub.save();
            res.send('all done');
          })
          .catch(err => console.log(err))
        })
        .catch(err => res.send(err))
      } else {
        res.send('no match');
        console.log('no match');
      }
    })
    .catch(err => console.log(err));
})
//
// delete root comment
  router.post('/delete/rootComment', (req, res) => {
    Comment.findById(req.body.comment)
      .then(comment => {
        comment.content = 'deleted by author';
        comment.author = {
          name: 'deleted',
        };
        comment.deleted = true;
        comment.save();
        res.json(comment);
      })
      .catch(err => console.log(err));
  })
// delete non-root comment
router.post('/delete/comment', (req, res) => {
  Comment.findById(req.body.comment)
    .then(comment => {
      if (comment.author.id == res.locals.user.id) {
      comment.content = 'deleted by author';
      comment.author = {
        name: 'deleted',
      };
      comment.deleted = true;
      comment.save();
      res.json(comment);
    }
    res.send('dont delete what aint yours bruh');
    })
    .catch(err => console.log(err));
})
// delete root comment UNTESTED
// router.post('/delete/rootComment', (req, res) => {
//     Comment.findById(req.body.comment).exec()
//     .then(comment => {
//       console.log('author', comment.author.id, 'locals', res.locals.user.id);
//       if (comment.author.id == res.locals.user.id) {
//         Comment.findOneAndDelete(req.body.comment).exec()
//         .then(() => {
//           Post.findOne({ comments: { $all: [req.body.post] } })
//           .then(post => {
//             let commentIndex = post.comments.indexOf(req.body.comment);
//             post.comments.splice(commentIndex, 1);
//             post.save();
//             res.send('all done');
//           })
//           .catch(err => console.log(err))
//         })
//         .catch(err => res.send(err))
//       } else {
//         console.log('no match');
//       }
//       res.send('no match');
//     })
//     .catch(err => console.log(err));
// })
// //
// // delete non root comment UNTESTED
// router.post('/delete/comment', (req, res) => {
//     Comment.findById(req.body.comment).exec()
//     .then(comment => {
//       console.log('author', comment.author.id, 'locals', res.locals.user.id);
//       if (comment.author.id == res.locals.user.id) {
//         Comment.findOneAndDelete(req.body.comment).exec()
//         .then(() => {
//           Comment.findOne({ comments: { $all: [req.body.post] } })
//           .then(parentComment => {
//             let commentIndex = parentComment.comments.indexOf(req.body.comment);
//             parentComment.comments.splice(commentIndex, 1);
//             parentComment.save();
//             res.send('all done');
//           })
//           .catch(err => console.log(err))
//         })
//         .catch(err => res.send(err))
//       } else {
//         console.log('no match');
//       }
//       res.send('no match');
//     })
//     .catch(err => console.log(err));
// })
//
// delete sub
//
// Get all posts
router.get('/post', (req, res) => {
  Post.find().exec()
  .then(posts => res.json(posts))
  .catch(err => res.send(err))
})
//
// Get Posts by Subscriptions
router.get('/post/bySub/:sub', (req, res) => {
  Post.find({"sub.id": req.params.sub }).exec()
  .then(posts => res.json(posts))
  .catch(err => res.send(err))
})
//
//Get posts by users
router.get('/post/byUser/:user', (req, res) => {
  Post.find({"author.id": req.params.user }).exec()
  .then(posts => res.json(posts))
  .catch(err => res.send(err))
})
//
//Get post by post id
router.get('/post/byPost/:post', (req, res) => {
  Post.findById(req.params.post).exec()
  .then(post => res.json(post))
  .catch(err => res.send(err))
})
//
//Get posts by self
router.get('/post/bySelf', (req, res) => {
  Post.find({ "author.id": res.locals.user.id }).exec()
  .then(posts => res.json(posts))
  .catch(err => res.send(err))
})
//
// Get comments by bySelf
router.get('/comment/bySelf', (req, res) => {
  Comment.find({ "author.id": res.locals.user.id }).exec()
  .then(comments => res.json(comments))
  .catch(err => res.send(err))
})
//
router.post('/post/edit/', (req, res) => {
  Post.findById(req.body.id).exec()
  .then(post => {
    post.content = req.body.content;
    post.save();
  })
})
//
//Get comments by post id
router.get('/comment/byPost/:post', (req, res) => {
  Comment.find({ "ancestor": req.params.post }).exec()
  .then(comments => res.json(comments))
  .catch(err => res.send(err))
})
//
// Get all Subscriptions
router.get('/sub', (req, res) => {
  Sub.find().exec()
  .then(subs => res.json(subs))
  .catch(err => res.send(err))
})
//
// get sub by id
router.get('/sub/bySub/:subId', (req, res) => {
  Sub.findById(req.params.subId)
  .then(sub => res.json(sub))
  .catch(err => res.send(err))
})
//
// get subs by self
router.get('/sub/bySelf', (req, res) => {
  User.findById(res.locals.user.id)
  .then(user => {
    Sub.find({ _id: { $in: user.subscriptions } })
    .then(subs => res.json(subs))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
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
  .then(user => {
    res.json(user);
  })
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
