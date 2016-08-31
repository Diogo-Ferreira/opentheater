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