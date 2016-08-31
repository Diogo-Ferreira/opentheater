class abstractOpenPeer {
  constructor(){}

  listen(conn){
    var that = this
    conn.on('open', function(){
      conn.on('data', function(data){
        //Do some magic here.
        if(that.OnMessage,conn)
          that.OnMessage(data);
      })
    })
  }

  sendTo(receiver, data){
    receiver.send(data);
  }

  sendAll(data){
    this.sendTo(this.peerAdmin, data);
  }
}

class OpenPeer extends abstractOpenPeer{
  constructor(adminId){
    super()
    //Dom est un bel homme
    this.adminId = adminId

    this.peer = new Peer({key: '0nu1ohrtpnfjemi'})


    this.peerAdmin = this.peer.connect(adminId,{
      reliable: true
    })

    this.listen(this.peerAdmin)

    this.peer.on('open', function(id){
      this.peerid = id
    })

    this.peer.on('error', function(err){
      console.log(err)
      console.log('fils de pute')
    })
  }
}

class OpenPeerAdmin extends OpenPeer{
  constructor(onReady){
    super()
    this.peer = new Peer({key: '0nu1ohrtpnfjemi'})
    this.peer.on('open', function(id){
      this.peerid = id
      onReady()
    })

    this.clients = {}
    var that = this
    this.peer.on('connection', function(conn){
      console.log('Un lapin s\'est connecté')
      that.clients[conn.id] = conn;
      that.listen(that.clients[conn.id])

      if(that.OnNewPeer)
        that.OnNewPeer(conn)

    })
    this.peer.on('error', function(err){
      console.log(err)
      console.log('fils de pute')
    })
  }

  listen(conn){
    var that = this
    conn.on('open', function(){
      conn.on('data', function(data){
        if(that.OnMessage)
          that.OnMessage(data,conn)
        that.sendAll(data,conn.peer)
      })
    })
  }

  sendAll(data,except){
    for(var el in this.clients){
      if(this.clients[el].peer != except){
        console.log(this.clients[el])
        this.sendTo(this.clients[el], data);
      }
    }
  }
}
