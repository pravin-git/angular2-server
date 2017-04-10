var mongoose = require('mongoose');

var UserModel = mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    }

});

module.exports = mongoose.model("User", UserModel);