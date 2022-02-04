//jshint esversion:6

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let MessageSchema = new Schema(
  {
    username: String,
    message: String,
    date: Number,
    comments: [{comment: String, username: String}]
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
