var mongoose = require('mongoose');

var User = mongoose.model('UserData', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    }
})

//module.exports.User = User;
module.exports = {User};