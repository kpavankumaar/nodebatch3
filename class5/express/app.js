const express = require('express');
const path = require('path');
const app = express();
// var router = app.router();
const port = 3000;

app.get('/',function(req,res){
    res.send('welcome express js session ')
})
app.post('/',function(req, res){
    res.send('Got the post request');
})
app.put('/user',function(req,res){
    res.send('got the put request');
})
app.delete('/user',function(req,res){
    res.send('got a delete requrest at / user');
})
app.get('/sample.text',function(req,res){
    res.send('random.text');
})
app.get('/ab*cd',function(req,res){
    res.send('ab*cd');
})

app.get('/ab?cd',function(req,res){
    res.send('ab?cd');
})
app.get(/.*fly$/,function(req,res){
    res.send('/.*fly$/');
})
app.get('/example/b',function(req,res,next){
    console.log('response will be sent to next function');
    next()
},function(req,res){
    console.log('this is next function');
    res.send('Hello')
})

app.listen(port, ()=> console.log(`app listening to port ${port}`));