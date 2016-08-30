var express = require('express');
var app = express();
var data = require('./backend/data')

var mongoHostname = process.env['MONGO_HOSTNAME'] || 'localhost'
var url = 'mongodb://'+ mongoHostname +':27017/mongo-node-backend';
var bodyParser = require("body-parser");

var peerAdminId = '20934ujjws'

app.use(bodyParser.json());
data.init(url);

app.use(express.static('./frontend'))


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
  },function (result,data){
    res.send(data)
  });
});


app.get('/watch',function(req,res){
  //Send magnet link and admin peerid
  console.log(req.query.roomid)
  data.find(data.db, {'_id': data.ObjectID(req.query.roomid)}, 'rooms', function(data){
    console.log(data)
    res.json(data)
  })
});

app.listen(3000, '0.0.0.0', function (){
   console.log("Magic is happening on port 3000 !");
});
