class OpenPeer {
  constructor(adminId){
    //Dom est un bel homme
    this.adminId = adminId

    this.peer = new Peer({key: '0nu1ohrtpnfjemi'})
    peer.on('open', function(id){
      this.peerid = id
    })

    this.peerAdmin = this.peer.connect(pid)
  }

  function listen(conn, cb){
    conn.on('open', function(){
      conn.on('data', function(data){
        //Do some magic here.
        cb(data)
      })
    })
  }

  function sendAll(data){
    sendTo(this.peerAdmin, data);
  }

  function sendTo(receiver, data){
    receiver.send(data);
  }

}

class OpenPeerAdmin extends OpenPeer{
  constructor(){
    this.peer = new Peer({key: '0nu1ohrtpnfjemi'})
    peer.on('open', function(id){
      this.peerid = id
    })

    this.clients = {}

    peer.on('connection', function(conn){
      this.clients[conn.id] = conn;
    })
  }

  function listen(conn){
    conn.on('open', function(){
      conn.on('data', function(data){
        for(var el in this.clients){
          this.clients[el].send(data)
        }
      })
    })
  }

  function sendAll(data){
    for(var el in this.clients){
      sendTo(this.clients[el], data);
    }
  }

}
