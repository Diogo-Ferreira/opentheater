// Hello OpenTheater :)
var opentheater = angular.module("openTheater", ["ngRoute", "ngMaterial"]);


// Wonderful routes
opentheater.config(function($routeProvider, $mdIconProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/home/index.html",
    })
    .when("/watch/:id", {
        templateUrl : "templates/watch/index.html",
        controller: "WatchCtrl"
    })
    .when("/explore", {
        templateUrl : "templates/explore/index.html",
        controller: "ExploreCtrl"
    })
    .when("/create", {
        templateUrl : "templates/create/index.html",
        controller: "CreateCtrl"
    })
    .when("/login", {
        templateUrl : "templates/connexion/index.html",
    })
    .when("/signup", {
        templateUrl : "templates/inscription/index.html",

    })
    .otherwise({redirectTo: "/"});
});


// Let's create a service for rooms because why not
opentheater.service('Room', function($http){

    // Sorry for that
    that = this

    // All posts
    that.rooms = {}
    that.getRooms = function() {
        return $http.get('./assets/json/rooms.json').success(function (data) {
            that.rooms = data
            return data
        }).error(function (data) {
            console.log("Cannot retrieve data")
        });
    }
    that.getRoom = function(id){
        var room = {};
        // Challenge : do the same with one single line
        angular.forEach(that.rooms, function(value, key){
            if(value.id == id){
                room = value;
            }
        });
        return room;
    }
})

opentheater.service('MovieAPI', function($http){

    that = this

    /*
    that.fetchMovieInfos = function(){
        return $http.get('http://image.tmdb.org/t/p/')
    }
    */


})


// Amazing controllers
opentheater.controller('HomeCtrl',function($scope){
    // Static sexy page by Bryan in templates/home/index.html <3
});

opentheater.controller('WatchCtrl',function($scope, $http, Room, $routeParams, $rootScope){
  $scope.messages = [];
    var openpeer
    $scope.sendChatMessage = function(){
      var msg = {
        "type" : "chat",
        "content": $scope.currentMessage,
        "username": $scope.username
      }
      $scope.messages.push(msg)
      openpeer.sendAll(msg)
    }

    //PeerJS on message callback
    $scope.OnMessage = function(data){
      console.log(data)
      if(data.type == "chat"){
        $scope.messages.push(data)
        $scope.$apply()
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
    // the room TODO : adapt this with loadroom() !
    $scope.room = Room.getRoom($routeParams.id)

    if($rootScope.isAdmin){
      openpeer = $rootScope.adminInstance
      openpeer.OnMessage = $scope.OnMessage
    } else {
      $scope.loadRoom(function(roomData){
        console.log(roomData)
        openpeer = new OpenPeer(roomData.admin)
        $scope.roomData = roomData
        openpeer.OnMessage = $scope.OnMessage
        openpeer.listen(openpeer.peerAdmin)
      })
    }
});

opentheater.controller('ExploreCtrl',function($scope, Room, $timeout, $mdSidenav, $log){
    // Say hello to all the rooms
    //$scope.rooms = Room.getRooms();

    Room.getRooms().success(function(data){
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

opentheater.controller('CreateCtrl',function($window,$rootScope, $scope, $http){
    // Create
    $rootScope.isAdmin = true
    $rootScope.adminInstance = new OpenPeerAdmin(function(){
        $http({method: 'POST', url: '/create', data: {
        "torren_magnet_link" : 'ioejfosidfjafiowe',
        "joignable_after_start" : true,
        "name"  : 'Le petit chaperon rouge',
        "admin" : $rootScope.adminInstance.peer.peerid,
        "private" : true,
        "max_spectators" : 69,
        "description" : 'Gros film de boule avec un loup et une grand-mère'
      }}).then(function(response){
        console.log(response)
        $window.location.href = "#/watch/"+response.data._id;
      })
    })
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
        timer = $timeout(function() {
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
    return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
            .toggle()
            .then(function () {
                $log.debug("toggle " + navID + " is done");
            });
    }, 200);
}
function buildToggler(navID) {
    return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
            .toggle()
            .then(function () {
                $log.debug("toggle " + navID + " is done");
            });
    }
}
