/*
 *   Library for storing and editing data 
 * 
 */

// Dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');
// Container for module 
var lib = {};

// base directory of data folder 
// console.log('dirname', __dirname + '/../.data/');
lib.baseDir = path.join(__dirname,'/../.data/');

lib.create = function(dir,file,data,callback){
    // open the file that is there in the directory 
    // write the file 
    // and append the file 
    // w - open file for writing . if the file doesnot exist it will create
    // wx - not to open a file if it is already existing 
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err,fd){
        if (!err && fd) {
            // convert the data to string
            var stringData = JSON.stringify(data);
            // write to file and close it 
            fs.writeFile(fd,stringData,function(err){
                if (!err) {
                    fs.close(fd, function(err){
                        if(!err){
                            callback(false);
                        }else{
                            callback('Error closing the file ')
                        }
                    })
                }else { 
                    callback('Error writing to new file ');
                }
            });
            
        } else {
            callback('couldnot create a new file, it may already exist');
        }
    });


}

lib.read = function(dir,file,callback){

    // read the file 
    fs.readFile(lib.baseDir +dir+'/'+file+'.json', 'utf8', function(err, data){
        if(!err && data){
            var parsedData = helpers.parseJsonToObject(data);
            console.log(typeof parsedData);
            callback(false,parsedData);
        }else{
            callback(err,data);
        }
    })
}
lib.update = function(dir,file,data,callback){
    //open the file 
    //removing the old content 
    //write 
// close  
    // r  - open file for reading , and exception occurs if the file doesnot exist 
    // r+ - open file for reading and writing . And exception occurs if the file exist

    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fd){
        if(!err && fd){
            console.log('************'+typeof data);
            fs.writeFile(fd,data,function(err){
                if(!err){
                    fs.close(fd,function(err){
                        if(!err){
                          callback('false');
                        }else{
                            callback('failed to close the file ');
                        }
                    })
                }
            })
        }else{

        }
    } )
}
lib.delete = function(){
    // delete a file 
}

module.exports = lib;