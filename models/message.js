//jshint esversion:6

const mongoose = require('mongoose');
const CommentSchema = require("./comment.js");

const Schema = mongoose.Schema;

let MessageSchema = new Schema(
  {
    username: String,
    message: String,
    date: Number,
    comments: [ {comment: String, username: String} ]//this is a subdocument! it is defined above in CommentSchema
  }
);

// Virtual for Message URL -------- MESSAGE URL = _ID
MessageSchema
.virtual('url')
.get(function () {
  return '/' + this._id;
});

//Export model
module.exports = mongoose.model('message', MessageSchema);
