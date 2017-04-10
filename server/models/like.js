var mongoose = require('mongoose');

var LikeSchema = mongoose.Schema({
    recognitionId: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'RecognitionSchema'
    },
    likedBy: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'UserModel'
    },
    LikeDate:{
        type:Date
    }
});

module.exports = mongoose.model("like", LikeSchema);