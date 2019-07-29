var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
var passport = require('passport');

var router = express.Router();
router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  //mongoose plugin provides register
  //takes username as a parameter first then password
  User.register(new User({username: req.body.username}),
    req.body.password, (err, user) => {
      if(err){
        res.statusCode = 500;
        res.setHeader('Conten-Type', 'application/json');
        res.json({err: err});
      }
      else{
        //pasport wants you to do this func lik this
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      }
    });
});

//this need username and password, so use passport.authenticate
//if there is an error when authenticating, passport-local will
//automatially send back an error reply
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'Login Successful!'});
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
