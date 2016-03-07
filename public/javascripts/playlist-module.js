var playlist = angular.module('playlist', []);

playlist.controller('mainController', ['$scope', 'getPlaylist', function($scope, getPlaylist) {

    $scope.getVideos = function(){
        console.log($scope.artist);
        getPlaylist.request($scope.artist, function(result){
            console.log(result.result);
            $scope.newVideos = result.result;

        })
    };

}]);

playlist.factory('getPlaylist', ['$http', function($http) {
    return {
        request: function (data, callback) {

            $http.get('/' + data).then(
                function(response){
                    callback(response.data);
                }, function(response){
                    console.log("http error");
                    callback(response);
                })
        }

    }

}]);
