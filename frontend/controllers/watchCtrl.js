opentheater.controller('WatchCtrl', function ($window,$scope, $http, Room, $routeParams, $rootScope){

    $scope.messages = []
    $scope.peers = []
    $scope.showPlay = true
    $scope.reactions = []
    var openpeer
    var started = false
    var syncTimer
    $scope.peerName = "I'm "

    for(var i = 1; i <= 5;i++){
      $scope.reactions.push({
        id : i
      })
    }

    $scope.onReactionClicked = function(reaction){
      console.log(reaction)
      openpeer.sendAll({
        "type" : "cmd",
        "cmd"  : "showreaction",
        "reaction" : reaction,
        "peer" : openpeer.peerid
      })
    }

    //For invalidateRoom, since were not sure that routeParams will be avaible on destroy
    var roomid = $routeParams.id

    $scope.invalidateRoom = function(){
        $http({
            method : 'POST',
            url : '/invalidate',
            data : {
                "roomid" : roomid
            }
        })
    }

    $scope.$on('$destroy', function() {
        if($rootScope.isAdmin) $scope.invalidateRoom()
    });

    angular.element($window)
        .on('beforeunload', function(e) {
            var msg = "\o/"
            e.returnValue = msg
            return msg
        })
        .on('unload', function(e) {
            openpeer.peer.destroy()
            if($rootScope.isAdmin)
                $scope.invalidateRoom()
        })


    $scope.onPlayBtnClicked = function(){
        openpeer.sendAll({
            "type" : "cmd",
            "cmd"  : "play"
        })
        document.getElementById("vid").play()
        $scope.showPlay = !$scope.showPlay
        started = true
    }

    $scope.onPauseBtnClicked = function () {
        openpeer.sendAll({
            "type": "cmd",
            "cmd": "pause"
        })
        document.getElementById("vid").pause()
        $scope.showPlay = !$scope.showPlay
    }

    $scope.sendChatMessage = function () {
        var msg = {
            "type": "chat",
            "content": $scope.currentMessage,
            "username": $scope.username
        }
        $scope.messages.push(msg)
        openpeer.sendAll(msg)
    }

    //PeerJS on message callback
    //TODO : implement state pattern
    $scope.OnMessage = function(data,peer){
        that = this
        console.log(data)
        if(data.type == "chat"){
            $scope.messages.push(data)
            $scope.$apply()
        }else if(data.type == "cmd"){
            if(data.cmd == "play"){
                document.getElementById("vid").play()
            }else if(data.cmd == "pause"){
                document.getElementById("vid").pause()
            }else if(data.cmd == "goto"){
                started = true
                console.log(data.time_info)
                //Set the video time at the rendez-vous video time
                document.getElementById("vid").currentTime = data.time_info.startVidAt
                $scope.torrent.critical(data.time_info.startPiece,data.time_info.endPiece)
                //Check if current time is equal to the rendez-vous
                var syncTimer = setInterval(function(playAt){
                    //Rendez-vous reached, play the video !
                    if(parseInt(Date.now()) >= playAt){
                       document.getElementById("vid").play()
                       clearInterval(syncTimer)
                     }
                  },
                  10,
                  parseInt(data.time_info.playAtTimeStamp)
                )
            }else if(data.cmd == "quickresync" && $rootScope.isAdmin){
              openpeer.sendTo(peer,{
                  "type" : "cmd",
                  "cmd"  : "quickgoto",
                  "to"   : document.getElementById("vid").currentTime
              })
            }else if(data.cmd == "quickgoto"){
              document.getElementById("vid").currentTime = data.to
            }else if(data.cmd == "showreaction"){
              $scope.peers.forEach(p => {
                if(p.id === data.peer){
                  p.currentReaction = data.reaction
                  $scope.$apply()
                }
              })
            }
        }else if(data.type == "info"){
            console.log("One peer's ready !")
            if(data.info == "ready" && started && $scope.isAdmin){
                openpeer.sendTo(peer,{
                    "type" : "cmd",
                    "cmd"  : "goto",
                    "time_info"   : $scope.getSyncTimeInfo(document.getElementById("vid").currentTime)
                })
            }else if(data.info == "ready" && !started && $scope.isAdmin){
              openpeer.sendTo(peer,{
                "type" : "info",
                "info" : "peers",
                "peers": Object.keys(openpeer.clients).map(function(key){return {"id" : openpeer.clients[key].peer,"currentReaction" : {"id":0}}})
              })
              openpeer.sendAll({
                "type" : "info",
                "info" : "newpeer",
                "peer" : { "id" : peer.peer ,"currentReaction" : {"id":0}}
              },peer.peer)
            }else if(data.info == "newpeer" && !$scope.isAdmin){
              console.log("newpeerinforeceveid")
              $scope.peers.push(data.peer)
              $scope.$apply()
              console.log($scope.peers)
            }else if(data.info == "peers" && !$scope.isAdmin){
              console.log("peersreceveid")
              $scope.peers = data.peers.filter(e => e.id != openpeer.peerid)
              $scope.peers.push({"id" : openpeer.adminId ,"currentReaction" : {"id":0}})
              $scope.$apply()
              console.log($scope.peers)
            }else if(data.info == "peerdisconnected" && !$scope.isAdmin){
              console.log("One peer's gone")
              $scope.peers = $scope.peers.filter(e => e.id != data.peer)
            }
        }
    }

    /**
    * Gets rendez-vous timestamps for video sync beetween the peers
    */
    $scope.getSyncTimeInfo = function(currentVidTime){
      var msDelay = 60000.0
      //TODO : Split into more lines to clearify
      var startPiece = parseFloat((document.getElementById("vid").currentTime+msDelay) *  $rootScope.torrent.files[0].length / document.getElementById("vid").duration) / $rootScope.torrent.pieceLength
      return {
        "playAtTimeStamp" : Date.now() + msDelay, //Play the video, in 5 seconds
        "startVidAt" : currentVidTime + parseFloat(msDelay / 1000.0),
        "startPiece" : parseInt(startPiece),
        "endPiece"   : parseInt(startPiece) + 10
      }
    }

    //Gets room information
    $scope.loadRoom = function(cb){
        $http({method: 'GET', url: '/watch', params: {roomid: $routeParams.id}}).then(function(response){
            var roomData = angular.fromJson(response.data[0])
            cb(roomData)
        }, function(response){
            //Throw error
            console.log(response)
        })
    }

    $scope.quickResync = function(){
      openpeer.sendTo(openpeer.peerAdmin,{
          "type" : "cmd",
          "cmd" : "quickresync"
      })
    }

    $scope.room = Room.getRoom($routeParams.id)

    if($rootScope.client == undefined) $rootScope.client = new WebTorrent()

    //Are we the room admin ? If yes, we're also the WebRTC network HOST
    if($rootScope.isAdmin){
        openpeer = $rootScope.adminInstance
        openpeer.OnMessage = $scope.OnMessage
        $rootScope.torrent.files.forEach(function (file){
            file.renderTo('#vid',{
                autoplay : false
            },function(err,elem){
                console.log(err)
                console.log(elem)
            });
            openpeer.OnNewPeer = function(conn){
                console.log("New Peer Connected !")
                $scope.peers.push({
                  "id" : conn.peer
                })
                $scope.$apply()
            }

            openpeer.OnConnClose = (conn) => {
              openpeer.sendAll({
                "type" : "info",
                "info" : "peerdisconnected",
                "peer" : conn.peer
              },conn.peer)
            }
        })
        //Pings the room each minute to say we're alive, so don't destroy the room !
        setInterval(function(){
            $http({
                method : 'POST',
                url : '/ping_room',
                data : {
                    "roomid" : $routeParams.id
                }
            })
        },10000)

    } else {
        $scope.loadRoom(function(roomData){
            openpeer = new OpenPeer(roomData.admin,() => {
              $scope.peerName = "I'm " + openpeer.peerid
              $scope.room = roomData
              openpeer.OnMessage = $scope.OnMessage
              openpeer.listen(openpeer.peerAdmin)
              $rootScope.client.add(roomData.torrent_magnet_link, function(torrent){
                  $scope.torrent = torrent
                  console.log('Added torrent '+ roomData.torrent_magnet_link)
                  torrent.files.forEach(function(file){
                      file.renderTo('#vid',{
                          controls : false,
                      },function(err,elem){
                          console.log(err);
                          console.log(elem);
                          openpeer.sendTo(openpeer.peerAdmin,{
                              "type" : "info",
                              "info" : "ready"
                          })
                          document.getElementById("vid").pause()
                      })
                  })
                  torrent.on('download', function (bytes) {
                  })
              })
              $scope.$apply()
            })
        })
    };
});
