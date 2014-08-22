var express = require('express'),
        cookieParser = require('cookie-parser'),
        expressSession = require('express-session');

var routes = require('./routes/routes.js');
var MongoStore = require('connect-mongo')({session: expressSession});
 
 
createServer = function createServer () {
    
    var server = express();
    // specify middleware 
    //server.use(express.bodyParser());
    server.use(express.static(__dirname + '/public'));
    server.use('/product/*', express.static(__dirname + '/public'));
    server.use('/basket/', express.static(__dirname + '/public'));
     
    server.use(cookieParser());
    server.use(expressSession(
    { 
        secret: 'mdfkldfgkl&*(sas/d,asldsjf()*)(mlksdmfNfjSDsdfYUHNn' , 
        store: new MongoStore(
        {
           url: 'mongodb://admin:admin@proximus.modulusmongo.net:27017/he5doSyj',
           db: 'traiderioSessions' 
        })
    })); 
      
     
    // attach router handlers
    routes.attachHandlers(server); //, passport);
    
    return server;
    
};
 

var server = createServer();
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
  console.log("Listening on " + port);
}); 
 