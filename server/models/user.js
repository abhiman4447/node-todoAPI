const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true,
        validate: {
            validator: validator.isEmail, 
            message: '{value} is not valid' 
        }
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    tokens: [{
        access: {
            type: String,
            required: true
        }, 
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

userSchema.methods.generateAuthToken = function() {
   var user = this;
   var access = 'auth';
   var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123');

   user.tokens = user.tokens.concat([{access, token}]);

   return user.save().then(() => {
       return token;
   })
};

var User = mongoose.model('UserData', userSchema);

//module.exports.User = User;
module.exports = {User};