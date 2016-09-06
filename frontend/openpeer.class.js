//TODO: replace with angular service
class abstractOpenPeer {
  constructor(){}

  listen(conn){
    var that = this
    conn.on('open', function(){
      conn.on('data', function(data){
        if(that.OnMessage)
          that.OnMessage(data,conn);
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
  constructor(adminId,onReady){
    super()

    var that = this

    this.adminId = adminId

    this.peer = new Peer({key: '0nu1ohrtpnfjemi'})

    this.peerAdmin = this.peer.connect(adminId,{
      reliable: true
    })

    this.peer.on('open', function(id){
      that.peerid = id
      if(onReady)
        onReady()
    })

    this.peer.on('error', function(err){
      console.log(err)
    })
  }
}

class OpenPeerAdmin extends OpenPeer{
  constructor(onReady){
    super()
    var that = this
    this.peer = new Peer({key: '0nu1ohrtpnfjemi'})
    this.peer.on('open', function(id){
      that.peerid = id
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
    conn.on('close',function (){
      if(that.OnConnClose)
        that.OnConnClose(conn)
        
      delete that.clients[conn.id]
    })
  }

  sendAll(data,except){
    console.log("SEND ALL")
    console.log(this.clients)
    for(var el in this.clients){
      if(this.clients[el].peer != except){
        this.sendTo(this.clients[el], data);
      }
    }
  }
}
