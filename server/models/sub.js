const mongoose = require('mongoose');

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

const SubSchema = new mongoose.Schema({
  title: {
    type: String,
    index: { unique: true }
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  founder: {
    name: String,
    id: {
      type: ObjectId,
      required: true,
      ref: "users"
    }
  },
  posts: {
    type: [{
        type: ObjectId,
        ref: "posts"
      }],
      default: [],
    },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  flairs: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('Sub', SubSchema);
