const mongoose = require('mongoose');

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

const PostSchema = new mongoose.Schema({

  author: {
    name: String,
    id: {
      type: ObjectId,
      required: true,
      ref: "users"
    }
  },
  title: {
    type: String,
  },
  content: {
    type: String,
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
  sub: {
    title: String,
    id: {
    type: ObjectId,
    ref: "sub",
  }},
  flair: {
    type: String,
    default: '',
  }
});

module.exports = mongoose.model('Post', PostSchema);
