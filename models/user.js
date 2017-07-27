var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    privateName: String,
    surName: String,
    age: Number,
    address: String,
    description: String,
    avatar: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);