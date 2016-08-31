// Hello OpenTheater :)
var opentheater = angular.module("openTheater", ["ngRoute", "ngMaterial"]);


// Wonderful routes
opentheater.config(function ($routeProvider, $mdIconProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/home/index.html",
        })
        .when("/watch/:id", {
            templateUrl: "templates/watch/index.html",
            controller: "WatchCtrl"
        })
        .when("/explore", {
            templateUrl: "templates/explore/index.html",
            controller: "ExploreCtrl"
        })
        .when("/create", {
            templateUrl: "templates/create/index.html",
            controller: "CreateCtrl"
        })
        .when("/login", {
            templateUrl: "templates/connexion/index.html",
        })
        .when("/signup", {
            templateUrl: "templates/inscription/index.html",

        })
        .otherwise({redirectTo: "/"});
});


// Let's create a service for rooms because why not
opentheater.service('Room', function ($http) {

    // Sorry for that
    that = this

    // All posts
    that.rooms = {}
    that.getRooms = function () {
        return $http({
          method : 'GET',
          url : '/explore'
        }).success(function (data) {
            that.rooms = data.data
            return data
        }).error(function (data) {
            console.log("Cannot retrieve data")
        });
    }

    //Avion
    that.getRoom = function (id) {
        var room = {};
        // Challenge : do the same with one single line
        angular.forEach(that.rooms, function (value, key) {
            if (value.id == id) {
                room = value;
            }
        });
        return room;
    }
})

opentheater.service('MovieAPI', function ($http, $rootScope) {

    that = this

    //TODO: maybe it would be better to store the api link in a config file
    that.searchMovie = function (query) {
        return $http.get("http://api.themoviedb.org/3/search/movie?api_key=" + tmdbKey + "&query=" + query).then(function (response) {
            return angular.fromJson(response.data[0])
        }, function (response) {
            console.log("Error fetching tmdb data!")
        })
    }

    /*
     Coming soon

     that.findMovie = function(id){

     }*/

})


// Amazing controllers
opentheater.controller('HomeCtrl', function ($scope) {
    // Static sexy page by Bryan in templates/home/index.html <3
});


opentheater.controller('WatchCtrl', function ($scope, $http, Room, $routeParams, $rootScope){

    $scope.messages = []
    $scope.showPlay = true
    var openpeer
    var started = false

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


opentheater.controller('ExploreCtrl', function ($scope, Room, MovieAPI, $timeout, $mdSidenav, $log) {

    Room.getRooms().success(function (data) {
        $scope.rooms = data;
        console.log(data)
    })

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };
});

opentheater.controller('CreateCtrl', function ($window, $rootScope, $scope, $http) {
    // Create
    $rootScope.isAdmin = true

    var punchline

    $scope.file = {}
    $http.get('./assets/json/punchlines.json').success(function(data){
        console.log(data)
        var id = Math.floor(Math.random()*data.length)
        punchline = data[id].punchline
        console.log(punchline)
        return data
    })



    $scope.uploadFile = function (upFile) {
        $scope.file = upFile
        console.log($scope.file.files[0])
    }

    $scope.createRoomAlpha = function (elems) {

        // Swag animation 3000 thank you Bryan

        $scope.punchline = punchline
        document.getElementById("form").style.display = "none"
        document.getElementById("loading").style.display = "block"
        setInterval(function(){
          $http.get('./assets/json/punchlines.json').success(function(data){
              console.log(data)
              var id = Math.floor(Math.random()*data.length)
              punchline = data[id].punchline
              console.log(punchline)
              return data
          })
          $scope.punchline = punchline
        }, 4527)
        //TODO: maybe it would more efficient and clean to only use one instance of webtorrent
        $rootScope.client = new WebTorrent()
        $rootScope.client.seed($scope.file.files[0],
            {
                //TODO: store de tracker name in the db, in case if the user want's to use his own tracker
                announceList: [["ws://opentheater.infinit8.io:8998"]]
            }, function (torrent) {
                $rootScope.torrent = torrent
                // console.log("Client is seeding " + torrent.magnetURI)
                $rootScope.adminInstance = new OpenPeerAdmin(function () {
                        $http({
                            method: 'POST', url: '/create', data: {
                                "torrent_magnet_link": torrent.magnetURI,
                                "joinable_after_start": true,
                                "name": elems.room.name,
                                "admin": $rootScope.adminInstance.peer.peerid,
                                "private": false,
                                "max_spectators": elems.room.nbmax,
                                "description": elems.movie.description
                            }
                        }).then(function (response) {
                            $rootScope.magnet = torrent.magnetURI
                            $window.location.href = "#/watch/" + response.data._id
                        })

                })
            })
    }
})

/**
 * Supplies a function that will continue to operate until the
 * time is up.
 */
function debounce(func, wait, context) {
    var timer;
    return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function () {
            timer = undefined;
            func.apply(context, args);
        }, wait || 10);
    };
}

/**
 * Build handler to open/close a SideNav; when animation finishes
 * report completion in console
 */
function buildDelayedToggler(navID) {
    return debounce(function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
            .toggle()
            .then(function () {
                $log.debug("toggle " + navID + " is done");
            });
    }, 200);
}

function buildToggler(navID) {
    return function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
            .toggle()
            .then(function () {
                $log.debug("toggle " + navID + " is done");
            });
    }
}
