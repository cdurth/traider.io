var mongoHandler = require("./db.client.js");
var config = require('./config');
var collectionName = "products";

exports.getById = function(id, callback){
    if(callback === null || typeof(callback) !== "function"){throw "Call to db method must include callback function"} 
    var mongoclient = mongoHandler.getDbClient();
    // Open the connection to the server
    mongoclient.open(function(err, mongoclient) {  
        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName); 
        db.authenticate(config.db_user, config.db_pass, function(err, result) {
            var mongoId;
            try{
                mongoId = mongoHandler.makeObjectID(id);
            }
            catch(e)
            {
                return callback(e); 
            }
            console.log("id:"+mongoId);
            db.collection(collectionName).findOne({"_id": mongoId}, function(err, result) {
                mongoclient.close(); 
                if (err){  
                    callback(err);
                    return;
                }
                else
                {
                    // Close the connection
                    return callback(null, result); 
                }
            });
        });

    });
};

exports.getAll = function(callback)
{
    if(callback === null || typeof(callback) !== "function"){throw "Call to db method must include callback function"} 
    var mongoclient = mongoHandler.getDbClient();
    mongoclient.open(function(err, mongoclient) {
        
        if (err){
            mongoclient.close(); 
            throw err.Message;
            return;
        }
        
        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName); 
        console.log(dbName+"."+collectionName);

        db.authenticate(config.db_user, config.db_pass, function(err, result) {
            db.collection(collectionName).find({}, function(err, result) {
                if (err){
                    mongoclient.close(); 
                    throw err.Message;
                    return;
                }
                else
                { 
                    result.toArray(function(err, resultArray)
                    {
                       // Close the connection
                        mongoclient.close(); 
                        
                        console.log("Got data: " + resultArray.length + " records.");
                        return callback(resultArray);
                         
                    });
                }
            }); 
          });
    }); 
};


exports.insert = function(data, callback)
{
    var mongoclient = mongoHandler.getDbClient();
    mongoclient.open(function(err, mongoclient) {
        
        if (err){
            mongoclient.close(); 
            throw err.Message;
            return;
        }
        
        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName); 
        console.log(dbName+"."+collectionName);
        db.authenticate(config.db_user, config.db_pass, function(err, result) {
            console.log('authenticated');
            db.collection(collectionName).insert(data, function(err, result) {
                if (err){
                     
                    mongoclient.close();
                    throw err.Message;
                    return;
                }
                else if(callback === null && typeof(callback) !== "function")
                {  
                    mongoclient.close();
                    return callback(result); 
                }
            });
        });
 
    }); 
};