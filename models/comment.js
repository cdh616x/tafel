const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
