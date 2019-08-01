var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());


router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
  User.find({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err)=> next(err))
});
// WHAT IS GOING ON HERE
// AFter the user is registered with the given username and password
// after success we will set the firstname and lastname
router.post('/signup', (req, res, next) => {
  //mongoose plugin provides register
  //takes username as a parameter first then password
  User.register(new User({username: req.body.username}),
    req.body.password, (err, user) => {
      if(err){
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else{
        if (req.body.firstname){
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname){
          user.lastname = req.body.lastname;
        }
        user.save((err, user) => {
          if (err){
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            return;
          }
        //pasport wants you to do this func lik this
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
          });
        })
      }
    });
});

//this need username and password, so use passport.authenticate
//if there is an error when authenticating, passport-local will
//automatially send back an error reply

// ** NEW **
// Once authenticated by 'local' we will issue the token
// All subsequent request will carry token in the header of incoming req message
router.post('/login', passport.authenticate('local'), (req, res) => {
  // Where is req.user comming from?
  // It comes from passport.authenticate('local') when it successfully authenticates the user
  // It will load up the user property onto the req.message
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'Login Successful!'});
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
