opentheater.service('MovieAPI', function ($http, $rootScope) {

    that = this

    this.api_url = "http://api.themoviedb.org/3"

    this.api_backgrop_url = "http://image.tmdb.org/t/p/w780"

    this.not_found = {
        "backdrop_path" : "/627/200/3",
        "base_url" : "http://lorempicsum.com/futurama"
    }

    this.searchMovie = (query,successCb,errorCb) => {
        $http.get(that.api_url+"/search/movie?api_key=" + tmdbKey + "&query=" + query).then(successCb,errorCb)
    }
})
