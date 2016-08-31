opentheater.controller('WatchCtrl', function ($window,$scope, $http, Room, $routeParams, $rootScope){

    $scope.messages = []
    $scope.showPlay = true
    var openpeer
    var started = false

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
    $scope.OnMessage = function(data,peer){
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
                document.getElementById("vid").currentTime = data.to
                document.getElementById("vid").play()
            }
        }else if(data.type == "info"){
            console.log("One peer's ready !")
            if(data.info == "ready" && started){
                openpeer.sendTo(peer,{
                    "type" : "cmd",
                    "cmd"  : "goto",
                    "to"   : document.getElementById("vid").currentTime
                })
            }
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

    $scope.room = Room.getRoom($routeParams.id)

    if($rootScope.client == undefined) $rootScope.client = new WebTorrent()

    //TODO: JS's not like java, having a parent class for peeradmin, peer and peerjs encapsulation is maybe not the good way, check angular factories !
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
            openpeer = new OpenPeer(roomData.admin)
            $scope.room = roomData
            openpeer.OnMessage = $scope.OnMessage
            openpeer.listen(openpeer.peerAdmin)
            $rootScope.client.add(roomData.torrent_magnet_link, function(torrent){
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
        })
    };
});