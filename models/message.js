var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    username: String,
    message: String
  }
);

// Virtual for book's URL
MessageSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('message', MessageSchema);
