opentheater.service('Room', function ($http) {

    // Sorry for that
    that = this

    // All posts
    that.rooms = {}
    that.getRooms = function () {
        return $http({
            method : 'GET',
            url : '/explore'
        }).success(function (data) {
            that.rooms = data.data
            return data
        }).error(function (data) {
            console.log("Cannot retrieve data")
        });
    }

    //Avion
    that.getRoom = function (id) {
        var room = {};
        // Challenge : do the same with one single line
        angular.forEach(that.rooms, function (value, key) {
            if (value.id == id) {
                room = value;
            }
        });
        return room;
    }
})