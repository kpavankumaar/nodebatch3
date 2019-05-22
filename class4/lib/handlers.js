

var _data = require('./data');
var helpers = require('./helpers');
// Define all the handlers
var handlers = {};

// Sample handler
handlers.sample = function (data, callback) {
    callback(200, { 'name': 'sample handler' });
}
// not found handler 
handlers.notFound = function (data, callback) {
    callback(400);
}

// users
handlers.users = function(data,callback){
    var acceptableMethods = ['post','get','put','delete'];
    if (acceptableMethods.indexOf(data.method)> -1 ) {
        handlers._users[data.method](data,callback);
    }else{

    }
}
// create a container for all the methods 
handlers._users = {};
handlers._users.post = function(data,callback){
    console.log('data.payload', data.payload);
    // check that all required fields are filled out
    console.log('firstname datatype', data.payload.firstName);
    var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim(): false;
    var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length>0 ? data.payload.lastName.trim() : false;
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true: false;
    console.log(firstName, lastName, phone, password, tosAgreement);
    if(firstName && lastName && phone && password && tosAgreement){
        // make sure the user doesnot already exist 
        _data.read('users',phone,function(err,data){
            if(err){
                console.log('data.payload', data.payload);
                var hashedPassword = helpers.hash(password);
                // create a user object
                if (hashedPassword) {
                    var userObject = {
                        'firstName': firstName,
                        'lastName': lastName,
                        'phone': phone,
                        'hashedPassword': hashedPassword,
                        'tosAgreement': true
                    }

                    _data.create('users', phone, userObject, function (err) {
                        if (!err) {
                            callback(200);
                        } else {
                            console.log(err);
                            callback(500, { 'Error': 'Could not create the new user' });
                        }
                    });
                }
            }else{
                callback(400, {'Error': 'A user with that phone number already exists'});
            }

        })
        
    }else{
        console.log('failed');
    }
}
// read the data from the existing 
handlers._users.get = function(data,callback){
    console.log('get method ');
    var phone  = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
    if(phone){
        _data.read('users',phone,function(err, userData){
            if(!err && userData){
                delete userData.hashedPassword;
                callback(200, userData);
            }else{
        
            }
        })
    }else{
        callback('404', { 'Error': 'No existing user ' })
    }
}
handlers._users.put = function(data, callback){
    var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    
    var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    
    if(phone){
        if(firstName || lastName || password){
            // lookup the user
            // _data.read()
        }
    }

    
}

module.exports = handlers;