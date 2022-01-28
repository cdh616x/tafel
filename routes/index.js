//jshint esversion:6

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const Message = require("../models/message.js");
let results = require("../models/message.js");

const async = require("async");

mongoose.connect("mongodb+srv://cdhprof:Lyr1c%40%40%40@tafel-dev.goaul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const db = mongoose.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
  message_list = Message.find({}).exec((err, document) => {
    if (err) console.log(err);
  res.render("index", {title: "Messages", message_list: document});
});
});

router.post("/", function(req, res, next) {
  Message.deleteOne({_id: req.body.url}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Success, Dragon!");
    }
    res.redirect("/");
  });
})

router.get("/new", function(req, res, next) {
  res.render("new", {title: "New Message"});
});

router.post("/new", function(req, res, next) {
  console.log(req.body.username);
  console.log(req.body.message);

  let message = new Message ({
    username: req.body.username,
    message: req.body.message,
    date: new Date().getFullYear()
  });

  message.save();

  res.redirect("/");
});

// Display book delete form on GET.-----------FIX THIS
router.get("/:url/delete", function(req, res, next) {
  delete_message = Message.findById(req.params.url);
  console.log(req.params);
  res.render("delete", {title: "Delete Message? --- " + delete_message});//-----MESSAGE.FINDBYID(PASS IN URL)
});

router.post("/:url/delete", function(req, res, next) {
    Message.deleteOne({_id: req.body.url}, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Success, Baby!");
      }
      res.redirect("/");
    });
});


module.exports = router;
