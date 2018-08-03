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
  Upvotes: {
    type: [{
      type: ObjectId,
      ref: "users"
    }],
    default: [],
  },
  Downvotes: {
      type: [{
        type: ObjectId,
        ref: "users"
      }],
      default: [],
},
  Sub: {
    type: ObjectId,
    ref: "sub",
  },
  Flair: {
    type: String,
    default: '',
  }
});

module.exports = mongoose.model('Post', PostSchema);
