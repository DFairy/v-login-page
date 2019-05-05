var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    password: String,
    recheck: String,
    token: String,
    create_time: Date,
    islive:Boolean
})

module.exports = mongoose.model('User', userSchema)