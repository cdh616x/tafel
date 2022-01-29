//jshint esversion:6

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const Message = require("../models/message.js");

mongoose.connect("mongodb+srv://cdhprof:Lyr1c%40%40%40@tafel-dev.goaul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

/* GET home page. */
router.get('/', function(req, res, next) {
  message_list = Message.find({}).sort({_id: -1}).exec((err, document) => {
    if (err) console.log(err);
  res.render("index", {title: "Messages", message_list: document});
});
});

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

// Display message delete form on GET
router.get("/:url/delete", function(req, res, next) {
  delete_message = Message.findById(req.params.url);
  console.log(req.params);
  res.render("delete", {title: "Delete Message? --- " + delete_message});//-----MESSAGE.FINDBYID(PASS IN URL)
});

router.post("/:url/delete", function(req, res, next) {
    Message.deleteOne({_id: req.params.url}, function(err, results) {
      console.log(results);
      if (err) {
        console.log(err);
      } else {
        console.log("Success, Baby!");
      }
      res.redirect("/");
    });
});


module.exports = router;
