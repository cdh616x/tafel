//jshint esversion:6

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//---------MESSAGE SCHEMA-----------

let CommentSchema = new Schema(
  {
    comment: String,
    username: String
  }
);

//DEFINE VIRTUAL FOR COMMENTSCHEMA HERE!!!
CommentSchema
.virtual("comment_url")
.get(function () {
  return "/" + this._id;
});

module.exports = mongoose.model("comment", CommentSchema);

let MessageSchema = new Schema(
  {
    username: String,
    message: String,
    date: Number,
    comments: [ CommentSchema ]//this is a subdocument! it is defined above in CommentSchema
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
