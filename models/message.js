var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    username: String,
    message: String,
    date: Number
  }
);

// Virtual for book's URL
MessageSchema
.virtual('url')
.get(function () {
  return '/' + this._id;
});

//Export model
module.exports = mongoose.model('message', MessageSchema);
