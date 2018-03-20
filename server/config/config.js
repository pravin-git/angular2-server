module.exports.setConfig = function(){
    process.env.CONNECTIONSTRING = 'mongodb://myPpdUser:83DySOEj85scornl@cluster0-shard-00-00-x27qu.mongodb.net:27017,cluster0-shard-00-01-x27qu.mongodb.net:27017,cluster0-shard-00-02-x27qu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
    process.env.SECRET_KEY = 'piakey';

    
}