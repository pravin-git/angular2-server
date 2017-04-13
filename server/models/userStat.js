var mongoose = require('mongoose');

var UserStatModel = mongoose.Schema({

    userId: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'User' 
    },
    recognitionCount:{
        type:Number
    },
    likesCount:{
        type:Number
    },
    commentsCount:{
        type:Number
    }

});

module.exports = mongoose.model("userStat", UserStatModel);