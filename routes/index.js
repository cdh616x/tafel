//jshint esversion:6

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://cdhprof:Lyr1c%40%40%40@tafel-dev.goaul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const messageSchema = new mongoose.Schema({
  username: String,
  message: String
});

const Message = mongoose.model("message", messageSchema);

let mess = new Message({
  username: "LuckyZeeland",
  message: "Let's see if this works!"
});

mess.save();//-------THIS SUCCESSFULLY SAVES A MESSAGE TO THE DATABASE!!!!!!!

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/new", function(req, res, next) {
  res.render("new", {title: "New Message"});
});

router.post("/new", function(req, res, next) {
  console.log(req.body.username);
  console.log(req.body.message);
  res.redirect("/")
});

module.exports = router;
