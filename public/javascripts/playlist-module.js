var playlist = angular.module('playlist', []);

playlist.controller('mainController', ['$scope', 'getPlaylist', '$sce', '$document', function ($scope, getPlaylist, $sce, $document) {

    // request playlist data from back-end
    $scope.getVideos = function () {
        console.log($scope.artist);
        getPlaylist.request($scope.artist, function (result) {
            console.log(result.result);
            $scope.newVideos = result.result;

        })
    };

    // check whether video with this id is being hovered
    $scope.active = function (id) {
        $scope.activeVideo = id;
    };

    // open embedded iframe to play video
    $scope.playVideo = function (id) {
        $scope.currVideo = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + id + "?enablejsapi=1");
    };

    // stop the video when user click close button
    $scope.closePlayer = function () {
        var iframe = angular.element('.player-iframe')[0].contentWindow;
        iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    };

}]);


// handle playlist relative services
playlist.factory('getPlaylist', ['$http', function ($http) {
    return {
        request: function (data, callback) {
            $http.get('/' + data).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    console.log("http error");
                    callback(response);
                })
        }
    }
}]);
