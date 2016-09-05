// Hello OpenTheater :)
var opentheater = angular.module("openTheater", ["ngRoute", "ngMaterial","ngMessages"]);


// Wonderful routes
opentheater.config(function ($routeProvider, $mdIconProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/home/index.html",
            controller: "HomeCtrl"
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
