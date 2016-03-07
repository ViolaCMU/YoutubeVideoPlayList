var playlist = angular.module('playlist', []);

playlist.controller('mainController', ['$scope', 'getPlaylist', '$sce', '$document', function($scope, getPlaylist, $sce, $document) {

    $scope.getVideos = function(){
        console.log($scope.artist);
        getPlaylist.request($scope.artist, function(result){
            console.log(result.result);
            $scope.newVideos = result.result;

        })
    };

    $scope.playVideo = function(id){
        $scope.currVideo = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + id + "?enablejsapi=1");
    };

    $scope.closePlayer = function(){
        var iframe = angular.element('.player-iframe')[0].contentWindow;
        var player = angular.element('.player-iframe')[0].contentWindow.angular.element('#player');
        //player.stopVideo();

        //var div = document.getElementById("popupVid");
        //var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
        //div.style.display = state == 'hide' ? 'none' : '';
        //func = state == 'hide' ? 'pauseVideo' : 'playVideo';
        iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
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
