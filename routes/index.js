var express = require('express');
var router = express.Router();
var path = require("path");

router.get("/sign-up", function(req, res){
  res.sendFile(path.join(__dirname, "../views/signUp.html"))
})

router.get("/home", function(req, res){
  res.sendFile(path.join(__dirname, "../views/home.html"))
})

router.get("/login", function(req, res){
  res.sendFile(path.join(__dirname, "../views/login.html"))
})


module.exports = router;
