/*
 *   Library for storing and editing data 
 * 
 */

// Dependencies
var fs = require('fs');
var path = require('path');

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
    // wx - 
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

lib.read = function(){
    // read the file 
}
lib.update = function(){
    //open the file 
    //removing the old content 
    //write 
// close  
}
lib.delete = function(){
    // delete a file 
}

module.exports = lib;