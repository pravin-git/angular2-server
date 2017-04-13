var Recognition = require('../models/recognition');
var Comment = require('../models/comment');
var Like = require('../models/like');
var User = require('../models/user');
var UserStat = require('../models/userStat');

//using promises
module.exports.addRecognition = function (req, res) {


    User.findOne({ _id: req.body.id })
        .then(function (user) {

            newRecognition = new Recognition({
                recognition: req.body.recognition,
                creator: user,
                users: req.body.users,
                recognitionDate: Date.now()
            })
            newRecognition.save()
                .then(function () {
                    req.body.users.forEach(function (element) {
                        incrementRecognitionCount(element);
                    }, this);

                    return res.status(200).json({ data: true, message: 'Recognition added' });
                })
                .catch(function (err) {
                    return res.status(500).send("error in saving recognition");
                })
        })
        .catch(function () {
            return res.status(500).send("User not found " + req.body.id);
        })
}

function incrementRecognitionCount(userId) {
    addRecognitionStatForUser('recognition', userId);
}

function incrementCommentCount(userId) {
    addRecognitionStatForUser('comment', userId);
}

function incrementLikeCount(userId) {
    addRecognitionStatForUser('like', userId);
}


function addRecognitionStatForUser(type, userId) {
    UserStat.findOne({ userId: userId })
        .then(function (userStat) {
            if (!userStat) {
                newUserStat = new UserStat({
                    userId: userId,
                    recognitionCount: type == 'recognition' ? 1 : 0,
                    likesCount: type == 'like' ? 1 : 0,
                    commentsCount: type == 'comment' ? 1 : 0
                });
                newUserStat.save()
                    .catch(function (err) {
                        throw err;
                    })
            }
            else {
                if (type == 'recognition') {
                    userStat.recognitionCount = userStat.recognitionCount + 1;
                }
                if (type == 'like') {
                    userStat.likesCount = userStat.likesCount + 1;
                }
                if (type == 'comment') {
                    userStat.commentsCount = userStat.commentsCount + 1;
                }
                userStat.save(function (err) {
                    if (err) {
                        throw err;
                    }
                })
            }
        })
        .catch(function (err) {
            throw err;
        });
}

module.exports.getRecognitions = function (req, res) {

    var query = Recognition.find().sort({ recognitionDate: -1 });

    // query.select('recognition recognitionDate creator').populate('creator').exec()
    query.select('recognition recognitionDate creator users').populate('creator users').exec()
        .then(function (recs) {
            return res.status(200).json({ data: recs });
        })
        .catch(function (err) {
            return res.status(500).send("error in getting recognitions");
        })
}

//using promises
module.exports.CommentOnRecognition = function (req, res) {

    newComment = new Comment({
        comment: req.body.comment,
        recognitionId: req.body.recognitionId,
        commentedBy: req.body.userId,
        CommentDate: Date.now()
    })
    newComment.save()
        .then(function () {
            Recognition.findOne({ _id: req.body.recognitionId })
                .then(function (recog) {
                    recog.users.forEach(function (element) {
                        incrementCommentCount(element);
                    }, this);
                })
            return res.status(200).json({ data: true, message: 'Comment added' });
        })
        .catch(function (err) {
            return res.status(500).send("error in saving comment");
        })
}


module.exports.getCommentOnRecognition = function (req, res) {
    var query = Comment.find({ "recognitionId": req.params.recognitionId }).sort({ CommentDate: -1 });

    // query.select('recognition recognitionDate creator').populate('creator').exec()
    query.select('comment CommentDate commentedBy').populate('commentedBy').exec()
        .then(function (recs) {
            return res.status(200).json({ data: recs });
        })
        .catch(function (err) {
            return res.status(500).send("error in getting recognitions");
        })
}

//using promises
module.exports.LikeRecognition = function (req, res) {

    newLike = new Like({
        recognitionId: req.body.recognitionId,
        likedBy: req.body.userId,
        LikeDate: Date.now()
    })
    newLike.save()
        .then(function () {
            Recognition.findOne({ _id: req.body.recognitionId })
                .then(function (recog) {
                    recog.users.forEach(function (element) {
                        incrementLikeCount(element);
                    }, this);
                })
            return res.status(200).json({ data: true, message: 'Liked' });
        })
        .catch(function (err) {
            return res.status(500).send("error in saving Like");
        })
}



module.exports.getCommentCount = function (req, res) {

    Comment.find({ "recognitionId": req.params.recognitionId })
        .count()
        .then(function (cnt) {
            return res.status(200).json({ count: cnt });
        })
        .catch(function (err) {
            return res.status(500).send("error in getting comment count");
        })
}

module.exports.getLikesCount = function (req, res) {

    Like.find({ "recognitionId": req.params.recognitionId })
        .count()
        .then(function (cnt) {
            return res.status(200).json({ count: cnt });
        })
        .catch(function (err) {
            return res.status(500).send("error in getting like count");
        })
}

module.exports.isRecognitionLikedByMe = function (req, res) {

    Like.count({ $and: [{ "recognitionId": req.body.recognitionId }, { "likedBy": req.body.userId }] })
        .then(function (cnt) {
            return res.status(200).json({ count: cnt });
        })
        .catch(function (err) {
            return res.status(500).send("error in getting isLikedByMe count");
        })
}