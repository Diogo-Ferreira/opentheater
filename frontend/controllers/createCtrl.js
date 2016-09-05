opentheater.controller('CreateCtrl', function ($window, $rootScope, $scope, $http,$mdConstant) {

    $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.SPACE];
    $scope.tags = [];
    // Create
    $rootScope.isAdmin = true

    var punchline
    $scope.file = {}

    $scope.uploadFile = function (upFile) {
        $scope.file = upFile
        console.log($scope.file.files[0])
    }

    $scope.createRoomAlpha = function (elems) {

        $scope.punchline = "init 0"
        // Swag animation 3000 thank you Bryan
        document.getElementById("form").style.display = "none"
        document.getElementById("loading").style.display = "block"
        var punchtimer = undefined
        $http.get('./assets/json/punchlines.json').success(function(data){
                punchtimer = setInterval(function(data){
                var id = Math.floor(Math.random()*data.length)
                punchline = data[id].punchline
                $scope.punchline = punchline
                $scope.$apply()
                console.log(punchline)
            }, 4527,data)
        })

        $rootScope.client = new WebTorrent()
        $rootScope.client.seed($scope.file.files[0],
        {
            //TODO: store de tracker name in the db, in case if the user want's to use his own tracker
            announceList: [["ws://opentheater.infinit8.io:8998"]]
        }, function (torrent) {
            $rootScope.torrent = torrent
            $rootScope.adminInstance = new OpenPeerAdmin(function () {
                $http({
                    method: 'POST', url: '/create', data: {
                        "torrent_magnet_link": torrent.magnetURI,
                        "joinable_after_start": true,
                        "name": elems.room.name,
                        "admin": $rootScope.adminInstance.peerid,
                        "private": elems.room.private,
                        "max_spectators": elems.room.nbmax,
                        "description": elems.movie.description,
                        "tags": $scope.tags
                    }
                }).then(function (response) {
                    $rootScope.magnet = torrent.magnetURI
                    clearInterval(punchtimer) //Pls sthap it, think about the poor cpu
                    $window.location.href = "#/watch/" + response.data._id
                })

            })
        })
    }
})
