/*
* Primary file for API 
*
*/
// Dependencies 

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
// configure the server to respond to all requests with a string
var server = http.createServer(function(req,res){

    // console.log('request url from req object',req.url);
    var parsedUrl = url.parse(req.url, true);
    
    // get path 

    var path = parsedUrl.pathname;
    
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');
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
    req.on('data',function(data){
        buffer += decoder.write(data);
    })
    req.on('end',function(){
        buffer += decoder.end();
        console.log('buffer ', buffer);
        res.end('test content ');
    })
    

    

})
// start the server

server.listen(3000, function () {
    console.log('The server is up and running now')
});

