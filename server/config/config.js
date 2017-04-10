module.exports.setConfig = function(){
    process.env.CONNECTIONSTRING = 'mongodb://localhost/RecognitionSystem';
    process.env.SECRET_KEY = 'piakey';
}