var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
    comment:{
        type:String
    },
    recognitionId: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'RecognitionSchema'
    },
    commentedBy: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'User'
    },
    CommentDate:{
        type:Date
    }
});

module.exports = mongoose.model("comment", CommentSchema);