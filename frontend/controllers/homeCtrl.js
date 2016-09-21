opentheater.controller('HomeCtrl', function ($scope, $rootScope, authService, authManager) {
    $rootScope.bgGif = "url('../assets/img/gif/" + Math.floor(Math.random() * 47) + ".gif') no-repeat"

    // Put the authService on $scope to access
    // the login method in the view
    $rootScope.authService = authService;

    // Set the user profile when the page is refreshed
    $rootScope.profile = authService.userProfile;

    // Listen for the user profile being set when the user
    // logs in and update it in the view
    $scope.$on('userProfileSet', function (event, userProfile) {
        $rootScope.profile = userProfile;
    });
});