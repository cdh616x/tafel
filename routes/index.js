//jshint esversion:6

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const Message = require("../models/message.js");//qHYVkEDiZI7l5bTc

mongoose.connect("mongodb+srv://public:qHYVkEDiZI7l5bTc@tafel-dev.goaul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

/* GET home page. */
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
  // console.log("*");
  // console.log(req.body.username);
  // console.log(req.body.comment);
  // console.log("*");
  Message.updateOne({_id: req.params.url}, { $push: {comments: {comment: req.body.comment}}}, {upsert: true}, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
  res.redirect("/");
});

//---------DELETE

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
