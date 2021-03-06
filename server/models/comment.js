const mongoose = require('mongoose');

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

const CommentSchema = new mongoose.Schema({

  author: {
    name: String,
    id: {
      type: ObjectId,
      ref: "users"
    }
  },
  content: {
    type: String,
    default: 'DEFAULT CONTENT',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: {
    type: [{
      type: ObjectId,
      ref: "comments"
    }],
    default: [],
  },
  upvotes: {
    type: [{
      type: ObjectId,
      ref: "users"
    }],
    default: [],
  },
  downvotes: {
    type: [{
        type: ObjectId,
        ref: "users"
      }],
      default: [],
    },
    score: {
      type: Number,
      default: 0.3076923076923077,
    },
    parent: {
      type: ObjectId,
      ref: "comments",
      default: null,
    },
    ancestor: {
      type: ObjectId,
      ref: "posts"
    },
    deleted: {
      type: Boolean,
      default: false,
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
