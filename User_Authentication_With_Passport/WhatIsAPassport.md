***********************************

npm install passport

npm install passport-local

npm install passport-local-mongoose
    -Provides hashing
***********************************

It is an authentication module that uses different strategies for user authentication.


EXAMPLE:
app.post('/login', passport.authenticate('local),
(req,res) => {
    // if this func gets called, then authentication was successful.
    /req.uses contains authenticated user
    res.redirect('/uses/' +req.user.username)
});