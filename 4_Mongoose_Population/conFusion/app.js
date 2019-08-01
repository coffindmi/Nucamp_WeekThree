var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var Authenticate = require('./authenticate');
// ** new **
var config = require('./config');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

var app = express();





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var promoRouter = require('./routes/promoRouter');
var dishRouter = require('./routes/dishRouter');



// ******** database
const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

// ** new **
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());



//*********************************** AUTHENTICATION  ************************************/

// this uses the module passport
app.use(passport.initialize());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);


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