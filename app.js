require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyPaser = require("body-parser");
var app = express();
var connectDB = require('./config/dbConnect');
var jwt = require("jsonwebtoken");
connectDB()
app.use(bodyPaser.urlencoded({extended: false}));
app.use(bodyPaser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.get("/get-token", function(req, res){
  try {
  let token =  req.body.token || req.headers.authorization;
  console.log(token);
    let jwtDecode = jwt.verify(token, process.env.JWT_SECRET);
    res.json(jwtDecode)
  } catch (error) {
    if(error.message === "jwt must be provided"){
      console.log("here");
    }
    if(error.message === "jwt expired"){
      console.log("mã token hết hạn");
    }
    if(error.message === "invalid signature"){
      console.log("mã token sai vui lòng gửi lại");
    }
    res.json("lỗi server")
  }

})










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
