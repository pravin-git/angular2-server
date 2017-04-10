var mongoose = require('mongoose');

var RecognitionSchema = mongoose.Schema({
    recognition:{
        type:String
    },
    creator: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'User' 
    },

    users:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    
    recognitionDate:{
        type:Date
    }
});

module.exports = mongoose.model("recognition", RecognitionSchema);