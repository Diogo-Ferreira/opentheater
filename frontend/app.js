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
    })
    .when("/login", {
        templateUrl : "templates/connexion/index.html",
    })
    .when("/signup", {
        templateUrl : "templates/inscription/index.html",
        controller: "CreateCtrl"
    })
    .otherwise({redirectTo: "/"});
    //$mdIconProvider.icon('md-toggle-arrow', 'assets/icons/toggle-arrow.svg', 48);
});


/*
    .config(['$mdIconProvider', function($mdIconProvider) {
        $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
    }])
    .controller('AppCtrl', function($scope) {
        $scope.imagePath = 'img/washedout.png';
    });
    */

// Let's create a service for rooms because why not
opentheater.service('Room', function(){

    // Later, get data with ajax request
    // use $http and $q (for ajax request and promises)
    // var deferred = $q.defer()
    // $http.get('url').success(function(data, status){ this.posts = data; deferred.resolve(this.posts); }).error(function(){ deferred.reject("cannot retrieve data"); })
    // Note for me : https://www.grafikart.fr/formations/angularjs/promesses

    // Sorry for that
    that = this;

    // All posts
    that.rooms = [
        {
            "id": "57bd8c715f8ae7b45f5e3ab6",
            "name": "deserunt duis excepteur",
            "description": "quis nostrud et pariatur labore dolor nostrud sunt deserunt quis",
            "torrent_magnet_link": "sit",
            "joinable_after_start": false,
            "is_private": true,
            "admin": 5972,
            "max_spectators": 12,
            "tags": [
                {
                    "name": "sunt"
                },
                {
                    "name": "ipsum"
                },
                {
                    "name": "aliquip"
                },
                {
                    "name": "sunt"
                },
                {
                    "name": "Lorem"
                },
                {
                    "name": "velit"
                },
                {
                    "name": "ex"
                }
            ]
        },
        {
            "id": "57bd8c71e492382da546c5a2",
            "name": "fugiat occaecat eiusmod",
            "description": "labore laboris sit enim aute enim reprehenderit pariatur cillum sint",
            "torrent_magnet_link": "nisi",
            "joinable_after_start": false,
            "is_private": true,
            "admin": 5316,
            "max_spectators": 20,
            "tags": [
                {
                    "name": "ipsum"
                },
                {
                    "name": "sit"
                },
                {
                    "name": "amet"
                },
                {
                    "name": "enim"
                },
                {
                    "name": "sit"
                },
                {
                    "name": "Lorem"
                },
                {
                    "name": "ipsum"
                }
            ]
        },
        {
            "id": "57bd8c7117cebed1f39a56fe",
            "name": "culpa ullamco eu",
            "description": "deserunt exercitation minim duis cupidatat enim eiusmod commodo tempor pariatur",
            "torrent_magnet_link": "mollit",
            "joinable_after_start": false,
            "is_private": false,
            "admin": 4890,
            "max_spectators": 17,
            "tags": [
                {
                    "name": "Lorem"
                },
                {
                    "name": "excepteur"
                },
                {
                    "name": "id"
                },
                {
                    "name": "laboris"
                },
                {
                    "name": "culpa"
                },
                {
                    "name": "cillum"
                },
                {
                    "name": "irure"
                }
            ]
        },
        {
            "id": "57bd8c71ff91208a1c37ba28",
            "name": "fugiat culpa nisi",
            "description": "amet et sint laborum ut cupidatat nulla est dolor proident",
            "torrent_magnet_link": "Lorem",
            "joinable_after_start": true,
            "is_private": false,
            "admin": 6564,
            "max_spectators": 8,
            "tags": [
                {
                    "name": "mollit"
                },
                {
                    "name": "esse"
                },
                {
                    "name": "incididunt"
                },
                {
                    "name": "proident"
                },
                {
                    "name": "et"
                },
                {
                    "name": "duis"
                },
                {
                    "name": "ullamco"
                }
            ]
        },
        {
            "id": "57bd8c71fef02368c454f339",
            "name": "nisi laboris aliqua",
            "description": "enim qui ad commodo sit pariatur Lorem duis nisi sunt",
            "torrent_magnet_link": "ad",
            "joinable_after_start": false,
            "is_private": true,
            "admin": 7709,
            "max_spectators": 4,
            "tags": [
                {
                    "name": "labore"
                },
                {
                    "name": "labore"
                },
                {
                    "name": "tempor"
                }
            ]
        },
        {
            "id": "57bd8c71b854868529686384",
            "name": "deserunt irure cillum",
            "description": "sit excepteur non veniam excepteur labore duis excepteur duis sit",
            "torrent_magnet_link": "mollit",
            "joinable_after_start": false,
            "is_private": true,
            "admin": 6249,
            "max_spectators": 11,
            "tags": [
                {
                    "name": "nisi"
                },
                {
                    "name": "amet"
                },
                {
                    "name": "nostrud"
                }
            ]
        },
        {
            "id": "57bd8c71c95d409c57b58f8c",
            "name": "ut excepteur sunt",
            "description": "amet labore qui sint in fugiat anim adipisicing magna consequat",
            "torrent_magnet_link": "commodo",
            "joinable_after_start": false,
            "is_private": false,
            "admin": 7627,
            "max_spectators": 16,
            "tags": [
                {
                    "name": "velit"
                },
                {
                    "name": "aliquip"
                },
                {
                    "name": "proident"
                },
                {
                    "name": "eu"
                },
                {
                    "name": "commodo"
                }
            ]
        },
        {
            "id": "57bd8c71facf95f52e7a0b92",
            "name": "tempor Lorem eu",
            "description": "amet cupidatat exercitation ex quis reprehenderit elit laboris aute veniam",
            "torrent_magnet_link": "aute",
            "joinable_after_start": false,
            "is_private": true,
            "admin": 6298,
            "max_spectators": 16,
            "tags": [
                {
                    "name": "eiusmod"
                },
                {
                    "name": "duis"
                },
                {
                    "name": "quis"
                },
                {
                    "name": "occaecat"
                },
                {
                    "name": "non"
                },
                {
                    "name": "anim"
                },
                {
                    "name": "id"
                }
            ]
        },
        {
            "id": "57bd8c71d3b53c11aff4d414",
            "name": "officia irure eu",
            "description": "amet do voluptate voluptate consequat ut veniam elit ipsum aute",
            "torrent_magnet_link": "sunt",
            "joinable_after_start": true,
            "is_private": false,
            "admin": 1608,
            "max_spectators": 2,
            "tags": [
                {
                    "name": "esse"
                },
                {
                    "name": "sunt"
                },
                {
                    "name": "duis"
                },
                {
                    "name": "magna"
                },
                {
                    "name": "anim"
                },
                {
                    "name": "aliqua"
                },
                {
                    "name": "qui"
                }
            ]
        },
        {
            "id": "57bd8c71cee30cd75cc98da4",
            "name": "veniam tempor commodo",
            "description": "esse minim consequat incididunt nostrud nulla ullamco sunt culpa elit",
            "torrent_magnet_link": "est",
            "joinable_after_start": true,
            "is_private": false,
            "admin": 2285,
            "max_spectators": 10,
            "tags": [
                {
                    "name": "mollit"
                },
                {
                    "name": "sunt"
                },
                {
                    "name": "adipisicing"
                },
                {
                    "name": "fugiat"
                },
                {
                    "name": "minim"
                },
                {
                    "name": "incididunt"
                },
                {
                    "name": "incididunt"
                }
            ]
        },
        {
            "id": "57bd8c7166f6f9e5601408b1",
            "name": "officia pariatur nulla",
            "description": "proident ad proident dolor dolor elit duis consequat Lorem elit",
            "torrent_magnet_link": "ea",
            "joinable_after_start": false,
            "is_private": false,
            "admin": 4404,
            "max_spectators": 20,
            "tags": [
                {
                    "name": "irure"
                },
                {
                    "name": "do"
                },
                {
                    "name": "nisi"
                },
                {
                    "name": "cupidatat"
                },
                {
                    "name": "cillum"
                }
            ]
        },
        {
            "id": "57bd8c71d406cf928bba117c",
            "name": "velit veniam irure",
            "description": "culpa consequat veniam est dolore Lorem veniam dolor dolor esse",
            "torrent_magnet_link": "culpa",
            "joinable_after_start": true,
            "is_private": false,
            "admin": 5330,
            "max_spectators": 19,
            "tags": [
                {
                    "name": "anim"
                },
                {
                    "name": "cupidatat"
                },
                {
                    "name": "nostrud"
                },
                {
                    "name": "do"
                },
                {
                    "name": "in"
                },
                {
                    "name": "sunt"
                }
            ]
        },
        {
            "id": "57bd8c71b405cd18b6ce275a",
            "name": "incididunt ullamco nostrud",
            "description": "minim ea nostrud ad irure aliqua dolore irure eiusmod reprehenderit",
            "torrent_magnet_link": "occaecat",
            "joinable_after_start": false,
            "is_private": false,
            "admin": 7067,
            "max_spectators": 10,
            "tags": [
                {
                    "name": "cillum"
                },
                {
                    "name": "deserunt"
                },
                {
                    "name": "anim"
                },
                {
                    "name": "pariatur"
                },
                {
                    "name": "proident"
                }
            ]
        },
        {
            "id": "57bd8c7144a20dbdba010ccc",
            "name": "eiusmod excepteur consectetur",
            "description": "occaecat consectetur proident labore ad ipsum fugiat consequat quis nulla",
            "torrent_magnet_link": "aliquip",
            "joinable_after_start": true,
            "is_private": true,
            "admin": 2037,
            "max_spectators": 16,
            "tags": [
                {
                    "name": "est"
                },
                {
                    "name": "elit"
                },
                {
                    "name": "excepteur"
                },
                {
                    "name": "reprehenderit"
                }
            ]
        },
        {
            "id": "57bd8c711960c16a398b6947",
            "name": "laboris adipisicing proident",
            "description": "aliqua velit anim Lorem aute enim anim fugiat commodo nostrud",
            "torrent_magnet_link": "eiusmod",
            "joinable_after_start": true,
            "is_private": true,
            "admin": 3341,
            "max_spectators": 14,
            "tags": [
                {
                    "name": "laborum"
                },
                {
                    "name": "ad"
                },
                {
                    "name": "ad"
                },
                {
                    "name": "mollit"
                },
                {
                    "name": "excepteur"
                }
            ]
        },
        {
            "id": "57bd8c713a762f2450a52561",
            "name": "nulla ipsum qui",
            "description": "nulla dolor irure adipisicing ad consequat nulla occaecat cillum labore",
            "torrent_magnet_link": "ea",
            "joinable_after_start": false,
            "is_private": false,
            "admin": 6827,
            "max_spectators": 6,
            "tags": [
                {
                    "name": "adipisicing"
                },
                {
                    "name": "incididunt"
                },
                {
                    "name": "elit"
                },
                {
                    "name": "sunt"
                }
            ]
        },
        {
            "id": "57bd8c718e3f14e2a8a2d48d",
            "name": "nostrud duis aliqua",
            "description": "enim deserunt elit incididunt mollit ex ex consectetur reprehenderit incididunt",
            "torrent_magnet_link": "velit",
            "joinable_after_start": true,
            "is_private": true,
            "admin": 7013,
            "max_spectators": 13,
            "tags": [
                {
                    "name": "aliqua"
                },
                {
                    "name": "officia"
                },
                {
                    "name": "eu"
                },
                {
                    "name": "nisi"
                },
                {
                    "name": "aliquip"
                }
            ]
        },
        {
            "id": "57bd8c714951a8d6df28947c",
            "name": "ipsum labore elit",
            "description": "et ad aliqua et enim nisi eu laboris consequat irure",
            "torrent_magnet_link": "culpa",
            "joinable_after_start": true,
            "is_private": true,
            "admin": 5190,
            "max_spectators": 5,
            "tags": [
                {
                    "name": "reprehenderit"
                },
                {
                    "name": "irure"
                },
                {
                    "name": "enim"
                }
            ]
        },
        {
            "id": "57bd8c714c63126539369141",
            "name": "nostrud quis cillum",
            "description": "do voluptate ea ipsum ut reprehenderit id pariatur pariatur ex",
            "torrent_magnet_link": "dolor",
            "joinable_after_start": false,
            "is_private": true,
            "admin": 7340,
            "max_spectators": 9,
            "tags": [
                {
                    "name": "dolor"
                },
                {
                    "name": "ex"
                },
                {
                    "name": "amet"
                },
                {
                    "name": "do"
                },
                {
                    "name": "veniam"
                },
                {
                    "name": "aute"
                }
            ]
        },
        {
            "id": "57bd8c71651ea074046af805",
            "name": "nulla minim anim",
            "description": "quis quis veniam amet sint ea pariatur anim veniam elit",
            "torrent_magnet_link": "duis",
            "joinable_after_start": false,
            "is_private": true,
            "admin": 5086,
            "max_spectators": 6,
            "tags": [
                {
                    "name": "consequat"
                },
                {
                    "name": "incididunt"
                },
                {
                    "name": "ex"
                },
                {
                    "name": "elit"
                },
                {
                    "name": "dolore"
                },
                {
                    "name": "ullamco"
                },
                {
                    "name": "sit"
                }
            ]
        },
        {
            "id": "57bd8c7159598a65d49bd458",
            "name": "Lorem aute cillum",
            "description": "ullamco dolor voluptate amet excepteur tempor ipsum magna amet sunt",
            "torrent_magnet_link": "culpa",
            "joinable_after_start": true,
            "is_private": true,
            "admin": 2019,
            "max_spectators": 9,
            "tags": [
                {
                    "name": "culpa"
                },
                {
                    "name": "sunt"
                },
                {
                    "name": "nulla"
                },
                {
                    "name": "aute"
                },
                {
                    "name": "aliquip"
                },
                {
                    "name": "cillum"
                },
                {
                    "name": "qui"
                }
            ]
        },
        {
            "id": "57bd8c71f28dd78be6ee6888",
            "name": "occaecat dolore anim",
            "description": "officia labore labore duis deserunt voluptate irure tempor velit eu",
            "torrent_magnet_link": "dolore",
            "joinable_after_start": true,
            "is_private": true,
            "admin": 3432,
            "max_spectators": 7,
            "tags": [
                {
                    "name": "proident"
                },
                {
                    "name": "consectetur"
                },
                {
                    "name": "irure"
                },
                {
                    "name": "ipsum"
                },
                {
                    "name": "pariatur"
                },
                {
                    "name": "sunt"
                }
            ]
        },
        {
            "id": "57bd8c7151f4142c77f82cd5",
            "name": "nisi minim reprehenderit",
            "description": "deserunt laboris qui sunt et eiusmod consequat eu officia est",
            "torrent_magnet_link": "Lorem",
            "joinable_after_start": true,
            "is_private": false,
            "admin": 1716,
            "max_spectators": 18,
            "tags": [
                {
                    "name": "eu"
                },
                {
                    "name": "elit"
                },
                {
                    "name": "id"
                },
                {
                    "name": "consectetur"
                },
                {
                    "name": "officia"
                },
                {
                    "name": "aliquip"
                }
            ]
        }
    ]
    that.getRooms = function(){return that.rooms}
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


// Amazing controllers
opentheater.controller('HomeCtrl',function($scope){
    // Static sexy page by Bryan in templates/home/index.html <3
});

opentheater.controller('WatchCtrl',function($scope, $http, Room, $routeParams, $rootScope){
    var openpeer
    $scope.send = function(){
      console.log('j\'ai pété')
      openpeer.sendAll('prout')
    }

    $scope.loadRoom = function(cb){
      $http({method: 'GET', url: '/watch', params: {roomid: $routeParams.id}}).then(function(response){
        var roomData = angular.fromJson(response.data[0])
        cb(roomData)
      }, function(response){
        //Throw error
        console.log(response)
      })
    }
    // the room

    $scope.room = Room.getRoom($routeParams.id)
    messages = [
        {
            "username": "Bryan",
            "message": "labore laboris sit enim aute enim reprehenderit pariatur cillum sint",
        },
        {
            "username": "Dom",
            "message": "labore laboris sit enim aute enim reprehenderit pariatur cillum sint",
        },
        {
            "username": "Diogo",
            "message": "labore laboris sit enim aute enim reprehenderit pariatur cillum sint",
        },
        {
            "username": "Guillaume",
            "message": "labore laboris sit enim aute enim reprehenderit pariatur cillum sint",
        },
        {
            "username": "Bryan",
            "message": "labore laboris sit enim aute enim reprehenderit pariatur cillum sint",
        },
        {
            "username": "Dom",
            "message": "labore laboris sit enim aute enim reprehenderit pariatur cillum sint",
        },
        {
            "username": "Diogo",
            "message": "labore laboris sit enim aute enim reprehenderit pariatur cillum sint",
        },
        {
            "username": "Guillaume",
            "message": "labore laboris sit enim aute enim reprehenderit pariatur cillum sint",
        },
    ]
    $scope.messages = messages;
    var injector = angular.injector(['ng', 'openTheater'])
    if($rootScope.isAdmin){
      openpeer = $rootScope.adminInstance
      openpeer.onMessage = function(data){
        console.log(data)
      }

    } else {
      $scope.loadRoom(function(roomData){
        console.log(roomData)
        openpeer = new OpenPeer(roomData.admin)
        $scope.roomData = roomData

        openpeer.listen(openpeer.peerAdmin, function(data){
          console.log(data)
        })
      })


    }

});

opentheater.controller('ExploreCtrl',function($scope, Room, $timeout, $mdSidenav, $log){
    // Say hello to all the rooms
    $scope.rooms = Room.getRooms();
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
    };

    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };

});

opentheater.controller('CreateCtrl',function($rootScope, $scope, $http){
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






