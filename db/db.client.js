var config = require('./config');
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient,
    Server = require('mongodb').Server,
    BSON = mongo.BSONPure;
console.log(config.db_url);
 
exports.getDbClient = function(){
     return new MongoClient(new Server(config.db_url,config.db_port), {native_parser: true});
   
};

exports.dbName = function(){
    return config.db_database;
};
    
exports.makeObjectID = function(id){
    return new BSON.ObjectID(id);
};