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
        return $http.get('./assets/json/rooms.json').success(function (data) {
            that.rooms = data
            return data
        }).error(function (data) {
            console.log("Cannot retrieve data")
        });
    }
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


opentheater.controller('WatchCtrl', function ($scope, $http, Room, $routeParams, $rootScope) {

    $scope.messages = []

    $scope.showPlay = true

    var openpeer

    $scope.onPlayBtnClicked = function () {
        openpeer.sendAll({
            "type": "cmd",
            "cmd": "play"
        })
        document.getElementById("vid").play()
        $scope.showPlay = !$scope.showPlay
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
    $scope.OnMessage = function (data) {
        console.log(data)
        if (data.type == "chat") {
            $scope.messages.push(data)
            $scope.$apply()
        } else if (data.type == "cmd") {
            if (data.cmd == "play") {
                document.getElementById("vid").play()
                /*setTimeout(function(){
                 document.getElementById("vid").play()
                 }, new Date(data.at - Date.now()).getMilliseconds())*/
            } else if (data.cmd == "pause") {
                document.getElementById("vid").pause()
            }
        }
    }

    $scope.loadRoom = function (roomData) {
        console.log(roomData)
        openpeer = new OpenPeer(roomData.admin)
        $scope.roomData = roomData
        openpeer.OnMessage = $scope.OnMessage
        openpeer.listen(openpeer.peerAdmin)

        client.add(roomData.torren_magnet_link, function (torrent) {
            console.log('Added torrent ' + roomData.torren_magnet_link)
            torrent.files.forEach(function (file) {
                file.renderTo('#vid')
            })
        })
    };

    // the room TODO : adapt this with loadroom() !
    $scope.room = Room.getRoom($routeParams.id)

    var client = new WebTorrent();

    if ($rootScope.isAdmin) {
        openpeer = $rootScope.adminInstance
        openpeer.OnMessage = $scope.OnMessage

        client.add($rootScope.magnet, function (torrent) {
            console.log('Added torrent ' + $rootScope.magnet)
            torrent.files.forEach(function (file) {
                file.renderTo('#vid', {
                    autoplay: false
                }, function (err, elem) {
                    console.log(err)
                    console.log(elem)
                });
            })
        })
    } else {
        client.add(roomData.torren_magnet_link, function (torrent) {
            console.log('Added torrent ' + roomData.torren_magnet_link)
            torrent.files.forEach(function (file) {
                file.renderTo('#vid', {
                    autoplay: false,
                    controls: false,
                }, function (err, elem) {
                    console.log(err);
                    console.log(elem);
                })
            })
            torrent.on('download', function (bytes) {
                console.log('just downloaded: ' + bytes)
                console.log('total downloaded: ' + torrent.downloaded);
                console.log('download speed: ' + torrent.downloadSpeed)
                console.log('progress: ' + torrent.progress)
            })
        })
    }
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

    $scope.file = {}

    $scope.uploadFile = function (upFile) {
        $scope.file = upFile
        console.log($scope.file.files[0])
    }

    $scope.createRoomAlpha = function (elems) {

        // Swag animation 3000 thank you Bryan
        document.getElementById("form").style.display = "none";
        document.getElementById("loading").style.display = "block";

        var client = new WebTorrent()
        client.seed($scope.file.files[0],
            {
                announceList: [["ws://157.26.106.7:8998"]]
            }, function (torrent) {
                tor = torrent
                // console.log("Client is seeding " + torrent.magnetURI)
                $rootScope.adminInstance = new OpenPeerAdmin(function () {

                    // Here we post
                    console.log("post")
                    $rootScope.adminInstance = new OpenPeerAdmin(function () {
                        $http({
                            method: 'POST', url: '/create', data: {
                                "torrent_magnet_link": torrent.magnetURI,
                                "joinable_after_start": true,
                                "name": elems.room.name,
                                "admin": $rootScope.adminInstance.peer.peerid,
                                "private": true,
                                "max_spectators": elems.room.nbmax,
                                "description": elems.movie.description
                            }
                        }).then(function (response) {
                            $rootScope.magnet = torrent.magnetURI
                            $window.location.href = "#/watch/" + response.data._id
                        })
                    })
                })
            })
    }
});

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
