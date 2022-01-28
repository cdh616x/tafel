//jshint esversion:6

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const Message = require("../models/message.js");
let results = require("../models/message.js");

let message_list = require("../controllers/messageController.js");

mongoose.connect("mongodb+srv://cdhprof:Lyr1c%40%40%40@tafel-dev.goaul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const db = mongoose.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
  message_list = Message.find({}).exec((err, document) => {
    if (err) console.log(err);
    console.log(document);
  res.render("index", {title: "Messages", message_list: document});
});
});



router.get("/new", function(req, res, next) {
  res.render("new", {title: "New Message", message_list: message_list});
});



router.post("/new", function(req, res, next) {
  console.log(req.body.username);
  console.log(req.body.message);

  let message = new Message ({
    username: req.body.username,
    message: req.body.message
  });

  message.save();

  res.redirect("/");
});

module.exports = router;
