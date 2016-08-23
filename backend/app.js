var express = require('express');
var app = express();
require('./models')

app.get('/', function (req, res){
   res.send("Hello world !");
});


app.get('/explore',function(req,res){

});


app.get('/create',function(req,res){

});


app.get('/watch',function(req,res){

});

app.listen(3000, function (){
   console.log("Magic is happening on port 3000 !");
});
