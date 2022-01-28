//jshint esversion:6

const Message = require("../models/message.js");
const async = require("async");

message_list = function(req, res, next) {
  Message.find({}, function(err, results) {
    console.log(results);
    if (err) return handleError(err);
    module.exports = results;
  })
}

// exports.Message = Message;
// exports.message_list = message_list
