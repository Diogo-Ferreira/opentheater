var app = angular.module("openTheater", ["ngRoute"]);


app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/home/index.html"
    })
    .when("/watch", {
        templateUrl : "templates/watch/index.html"
    })
    .when("/explore", {
        templateUrl : "templates/explore/index.html"
    })
    .when("/create", {
        templateUrl : "templates/create/index.html"
    });
});



app.controller('HomeCtrl',function($scope){

});

app.controller('WatchCtrl',function($scope){

});


app.controller('ExploreCtrl',function($scope){

});


app.controller('CreateCtrl',function($scope){

});
