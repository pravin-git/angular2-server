var Recognition = require('../models/recognition');
var Comment = require('../models/comment');
var Like = require('../models/like');
var User = require('../models/user');

//using promises
module.exports.addRecognition = function(req, res){
    
  
    User.findOne({_id : req.body.id})
    .then(function(user){

        newRecognition = new Recognition({
            recognition: req.body.recognition,
            creator: user,
            users:req.body.users,
            recognitionDate:Date.now()
        })
        newRecognition.save()
        .then(function(){
            return res.status(200).json({data:true, message:'Recognition added'});
        })
        .catch(function(err){
            return res.status(500).send("error in saving recognition");
        })
    })
    .catch(function(){
        return res.status(500).send("User not found " + req.body.id);
    })
}



module.exports.getRecognitions = function(req, res){

    var query = Recognition.find().sort({recognitionDate: -1});

    // query.select('recognition recognitionDate creator').populate('creator').exec()
    query.select('recognition recognitionDate creator users').populate('creator users').exec()
    .then(function(recs){
        return res.status(200).json({data:recs});
    })
    .catch(function(err){
        return res.status(500).send("error in getting recognitions");
    })
}

//using promises
module.exports.CommentOnRecognition = function(req, res){

    newComment = new Comment({
            comment: req.body.comment,
            recognitionId: req.body.recognitionId,
            commentedBy: req.body.userId,
            CommentDate:Date.now()
        })
        newComment.save()
        .then(function(){
            return res.status(200).json({data:true, message:'Comment added'});
        })
        .catch(function(err){
            return res.status(500).send("error in saving comment");
        })
}


module.exports.getCommentOnRecognition = function(req, res){
    var query = Comment.find({"recognitionId": req.params.recognitionId}).sort({CommentDate: -1});

    // query.select('recognition recognitionDate creator').populate('creator').exec()
    query.select('comment CommentDate commentedBy').populate('user').exec()
    .then(function(recs){
        return res.status(200).json({data:recs});
    })
    .catch(function(err){
        return res.status(500).send("error in getting recognitions");
    })
}

//using promises
module.exports.LikeRecognition = function(req, res){

    newLike = new Like({
            recognitionId: req.body.recognitionId,
            likedBy: req.body.userId,
            LikeDate:Date.now()
        })
        newLike.save()
        .then(function(){
            return res.status(200).json({data:true, message:'Liked'});
        })
        .catch(function(err){
            return res.status(500).send("error in saving Like");
        })
}



module.exports.getCommentCount = function(req, res){

    Comment.find({"recognitionId": req.params.recognitionId})
        .count()
        .then(function(cnt){
            return res.status(200).json({count:cnt});
        })
        .catch(function(err){
            return res.status(500).send("error in getting comment count");
        })
}

module.exports.getLikesCount = function(req, res){

    Like.find({"recognitionId": req.params.recognitionId})
        .count()
        .then(function(cnt){
            return res.status(200).json({count:cnt});
        })
        .catch(function(err){
            return res.status(500).send("error in getting like count");
        })
}