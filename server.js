//All requires
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors')
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./server/config/config.js');
var userController = require('./server/controllers/userController');
var recognitionController = require('./server/controllers/recognitionController');

//object Instantiation
var app = express();
var secureRoute = express.Router();
config.setConfig();
mongoose.Promise = Promise;

//App settings
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.use(cors());
app.use('/secure', secureRoute);
mongoose.connect(process.env.CONNECTIONSTRING);

//Middleware-->Action Filter
secureRoute.use(function(req, res, next){
    var token = req.body.token || req.headers['token'];
    //console.log(token);
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
            if(err){
                res.status(401).send('invalid token');
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(401).send('Please send a token');
    }
})

//Current router
secureRoute.get('/user', userController.getAllUsers);
app.post('/user/authenticate', userController.authenticate);
app.post('/user/register', userController.addUser);

app.post('/recognition/add', recognitionController.addRecognition);
secureRoute.get('/recognition', recognitionController.getRecognitions);


app.post('/comment/add', recognitionController.CommentOnRecognition);
secureRoute.get('/getcomment/:recognitionId', recognitionController.getCommentOnRecognition),
secureRoute.get('/comment/count/:recognitionId', recognitionController.getCommentCount);



app.post('/like/add', recognitionController.LikeRecognition);
secureRoute.get('/like/count/:recognitionId', recognitionController.getLikesCount);
secureRoute.post('/isRecognitionLikedByMe', recognitionController.isRecognitionLikedByMe);

app.listen(9000, function(){
    console.log('--------------------------')
    console.log('server is up @ Port::9000');
    console.log('--------------------------')
})