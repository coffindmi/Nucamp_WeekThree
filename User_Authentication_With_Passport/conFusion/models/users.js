const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// This auto adds username and password to the schema
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', userSchema);