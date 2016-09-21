opentheater.controller('ExploreCtrl', function ($scope, Room, MovieAPI, $timeout, $mdSidenav, $log) {
  
    Room.getRooms().success((rooms) => {
        rooms.forEach((e) => {
          //We have the movie name, great !
          if(e.movie_name != undefined){
            MovieAPI.searchMovie(e.movie_name,(data) => {
                if(data.data.results.length >= 1){
                  e.movieData = data.data.results[0]
                  e.movieData.base_url = MovieAPI.api_backgrop_url
                }
                else
                  e.movieData = MovieAPI.not_found
            }, (error) => console.log(error))
          }
          //If not, let's search by the file name...
          else{
            console.log("search by file name")
          }
        })
        $scope.rooms = rooms
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
