// Hello OpenTheater :)

var opentheater = angular.module("openTheater", ["auth0.lock", "angular-jwt", "ngRoute", "ngMaterial", "ngMessages"])


// Wonderful routes
opentheater.config(function ($routeProvider, $httpProvider,lockProvider,jwtOptionsProvider, jwtInterceptorProvider) {
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
            controller: "loginController"
        })
        .when("/signup", {
            templateUrl: "templates/inscription/index.html",

        }).when('/callback',{
            templateUrl : 'templates/connexion/index.html',
            controller : 'HomeCtrl'
        })


    lockProvider.init({
        clientID: 'ROoscKM61UfPnY5T0rwTyBrnDoAwjppz',
        domain: 'infinit8.eu.auth0.com'
    });


    // Configuration for angular-jwt
    jwtOptionsProvider.config({
        tokenGetter: function() {
            return localStorage.getItem('id_token');
        },
        whiteListedDomains: ['localhost'],
        unauthenticatedRedirectPath: '/login'
    });

    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');

})


opentheater.run(function(authService, $rootScope, authManager) {

    console.log("running")

    $rootScope.authService = authService

    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    authService.registerAuthenticationListener();

    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    authManager.checkAuthOnRefresh();
});
