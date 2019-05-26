var crypto = require('crypto');
// container for all the helpers 
var helpers = {}

// parse a json to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){
    
    try{
        var obj = JSON.parse(str);
        console.log("** try ***",obj);
        return obj;
    }catch(e){
        console.log("** catch ***", obj);
        return {};
    }

}

// create a sha256 hash
helpers.hash = function(str){   
    if(typeof(str) == 'string' && str.length > 0){
        var hash = crypto.createHmac('sha256','secretpassword').update(str).digest('hex');
        console.log(hash, typeof hash);
        return hash;
    }
}

module.exports = helpers;