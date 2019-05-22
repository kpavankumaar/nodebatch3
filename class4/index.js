/*
* Primary file for API 
*
*/
// Dependencies 

var http = require('http');
var https =require('https');
var fs = require('fs');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var data = require('./lib/data');
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers')


// configure the server to respond to all requests with a string
var httpServer = http.createServer(function(req,res){
        unifiedServer(req,res)
    });
// start the server

httpServer.listen(config.httpPort, function () {
    console.log('The http server is up and running now', config.envName);
});

//instantiate  https server 
var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
}
var httpsServer = https.createServer(httpsServerOptions,function(req,res){
    unifiedServer(req,res);
})

httpsServer.listen(config.httpsPort, function(){
    console.log('The https server is up and running now', config.envName);
    
})

// server login for both https and http server 
var unifiedServer = function(req,res){
    // console.log('request url from req object',req.url);
    var parsedUrl = url.parse(req.url, true);

    // get path 

    var path = parsedUrl.pathname;

    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    console.log('trimmedpath', trimmedPath)

    // query strings 
    var queryStringObject = parsedUrl.query;
    // get the headers as an object 
    var headers = req.headers;
    console.log(headers);
    // get the http method-  get,post,delete,update,patch
    var method = req.method.toLowerCase();
    console.log(method);
    //get the payload 
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    })
    req.on('end', function () {
        buffer += decoder.end();
        var chooseHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        // construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        }

        chooseHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};

            var payloadString = JSON.stringify(payload);
            // Return the response 
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        })
    });






}


// Define the request Router 

var router = {
    'sample':handlers.sample,
    'users':handlers.users
}