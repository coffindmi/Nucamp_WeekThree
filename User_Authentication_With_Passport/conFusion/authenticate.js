// To store the authentication strategies
var passport = require('passport');

// Module exports a strategy that we can use for our application
var localStrategy = require('passport-local').Strategy;
var User = require('./models/users');

exports.local = passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());