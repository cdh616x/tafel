//jshint esversion:6

const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Message = require("../models/message.js");//qHYVkEDiZI7l5bTc
const Comment = require("../models/comment.js");

mongoose.connect("mongodb+srv://public:qHYVkEDiZI7l5bTc@tafel-dev.goaul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

//---------HOMEPAGE
router.get('/', function(req, res, next) {
  message_list = Message.find({}).sort({_id: -1}).exec((err, document) => {
    if (err) console.log(err);
  res.render("index", {title: "Messages", message_list: document});
});
});

//---------NEW MESSAGE

router.get("/new", function(req, res, next) {
  res.render("new", {title: "New Message"});
});

router.post("/new", function(req, res, next) {
  let message = new Message ({
    username: req.body.username,
    message: req.body.message,
    date: new Date().getFullYear()
  });
  message.save();
  res.redirect("/");
});

//--------COMMENT

router.get("/:url/comment", function(req, res, next) {
  res.render("comment", {title: "New Comment"});
});

router.post("/:url/comment", function(req, res, next) {
  Message.updateOne({_id: req.params.url}, { $push: {comments: {comment: req.body.user_comment, username: req.body.username}}}, {upsert: true}, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
  res.redirect("/");
});

//-----------DELETE COMMENT

router.get("/:comment_url/delete-comment", function(req, res, next) {//-----HAVE TO GET EXACT ROUTE OF HREF OF DELETE-COMMENT.PUG AND ROUTE TO IT
  let del_comment = Comment.findById({_id: req.params.comment_url});
  console.log("*");
  console.log(del_comment);
  console.log(req.params.comment_url);
  res.render("delete-comment", {title: "Delete Comment?" + del_comment});
 });

router.post("/:comment_url/delete-comment", function (req, res, next) {
  Comment.deleteOne({_id: req.params.comment_url}, function(err, results) {//......., { $pull: {comments: {comment: req.params.comment_url}}},
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
  res.redirect("/");
});

//---------DELETE MESSAGE

router.get("/:url/delete", function(req, res, next) {
  delete_message = Message.findById(req.params.url);
  res.render("delete", {title: "Delete Message? --- " + delete_message});// Display message delete form on GET
});

router.post("/:url/delete", function(req, res, next) {
    Message.deleteOne({_id: req.params.url}, function(err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log("Success, Baby!");
      }
      res.redirect("/");
    });
});

module.exports = router;
