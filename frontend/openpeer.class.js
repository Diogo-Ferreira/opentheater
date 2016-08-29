class abstractOpenPeer {
  constructor(){

  }

  listen(conn, cb){
    conn.on('open', function(){
      conn.on('data', function(data){
        //Do some magic here.
        cb(data)
      })
    })
  }

  sendAll(data){
    sendTo(this.peerAdmin, data);
  }

  sendTo(receiver, data){
    receiver.send(data);
  }

}

class OpenPeer extends abstractOpenPeer{
  constructor(adminId){
    super()
    //Dom est un bel homme
    this.adminId = adminId

    this.peer = new Peer({key: '0nu1ohrtpnfjemi'})
    this.peer.on('open', function(id){
      this.peerid = id
    })

    this.peerAdmin = this.peer.connect(adminId)
  }
}

class OpenPeerAdmin extends OpenPeer{
  constructor(){
    super()
    this.peer = new Peer({key: '0nu1ohrtpnfjemi'})
    this.peer.on('open', function(id){
      this.peerid = id
    })

    this.clients = {}

    this.peer.on('connection', function(conn){
      console.log('Un lapin s\'est connecté')
      this.clients[conn.id] = conn;
      listen(this.clients[conn.id])
    })
  }

  listen(conn){
    conn.on('open', function(){
      conn.on('data', function(data){
        for(var el in this.clients){
          this.clients[el].send(data)
        }
      })
    })
  }

  sendAll(data){
    for(var el in this.clients){
      sendTo(this.clients[el], data);
    }
  }

}
