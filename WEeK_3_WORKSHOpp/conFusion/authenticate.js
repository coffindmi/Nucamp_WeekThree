// To store the authentication strategies
var passport = require('passport');

// Module exports a strategy that we can use for our application
var localStrategy = require('passport-local').Strategy;
var User = require('./models/users');

// ** NEW **
// JSON Web Token Strategy provided by passport JWT node module
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

// config.js
var config = require('./config');

exports.local = passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Calls a user json object and create the token
exports.getToken = function(user){
    return jwt.sign(user, config.secreKey, 
        {expiresIn: 3600});
};

//options to specify for JWT based strategy
var opts = {};
// how JWT should be extracted from incoming req message
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//helps supply the secret key to sign in
opts.secretOrKey = config.secreKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT Payload: ",jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user)=>{
            if (err){
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else{
                return done(null, false)
            }
        });
    }));

// verify incomming user
// How this works?
// Token will be included in the authentication header (line: 31)
exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = ((req,res, next) =>{
    User.findById({_id: req.user._id})
    .then((user) => {
        if (user.admin == true){
            console.log("This admin is a user", user.admin);
            next();
        }
        else{
            err = new Error("You are not an admin");
            res.statusCode = 403;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})