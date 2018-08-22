const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name : String,
    age : String
});

// copy UserSchema 
const UserModel = mongoose.model('User' , UserSchema);

module.exports = UserModel;