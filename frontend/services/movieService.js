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