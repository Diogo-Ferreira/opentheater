var express = require('express');
var app = express();
var data = require('./data')
var url = 'mongodb://localhost:27017/mongo-node-backend';
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
data.init(url);

app.get('/', function (req, res){
   res.send("Hello world !");
});


app.get('/explore',function(req,res){
  data.find(data.db,{},'rooms',function(rooms){
    res.json(rooms);
  });
});


app.post('/create',function(req,res){
  //Still need to add params validation
  data.insert(data.db,'rooms',{
    "torren_magnet_link" : req.body.torren_magnet_link,
    "joignable_after_start" : req.body.joignable_after_start,
    "name"  : req.body.name,
    "admin" : req.body.admin,
    "private" : req.body.private,
    "max_spectators" : req.body.max_spectators,
    "description" : req.body.description
  },function (result){
    res.send(result)
  });
});


app.get('/watch',function(req,res){
  //Send magnet link and admin peerid

});

app.listen(3000, function (){
   console.log("Magic is happening on port 3000 !");
});
