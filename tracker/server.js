var Server = require('bittorrent-tracker').Server

var server = new Server({
  udp: false,
  http: false,
  ws: true,
  stats: true
})

server.on('error', function(err){
  console.log(err.message)
})

server.on('warning', function(err){
  console.log(err.message)
})

server.on('listening', function(){
  console.log('listening on ws port: '+ server.ws.address().port)
})

server.listen(8998, '0.0.0.0', function (){
  console.log("starting")
})

server.on('start', function(addr) {
  console.log('got start message from ' + addr)
})
