var request = require('request');
var artists = require('./artists');
var NodeCache = require("node-cache");
// set cache ttl to 30 min
var cache = new NodeCache({stdTTL: 1800, checkperiod: 120});

// store api_key for accessing youtube api
var api_key = 'AIzaSyCBFJBCzHnXpFAYwaRT2M02F19t-K8CzXY';
var server = 'https://www.googleapis.com/youtube/v3/search';

// given an artist name, return an array containing up to 40 relative videos
exports.getPlayList = function (artist, callback) {
    var playlist = cache.get(artist);
    if (!playlist) {
        playlist = [];
        request(
            server + '?part=snippet&key=' + api_key + '&q=' + artist + '&maxResults=40',
            function (error, response, body) {
                // if successfully return data, for each video item, store video id and snippet into a temporary object currVideo
                // store all the video info in playlist array and pass it to callback function
                if (!error && response.statusCode == 200) {
                    var bodyObj = JSON.parse(body);
                    for (var i in bodyObj.items) {
                        var currVideo = {};
                        currVideo.id = bodyObj.items[i].id.videoId;
                        currVideo.snippet = bodyObj.items[i].snippet;
                        playlist.push(currVideo);
                    }
                    cache.set(artist, playlist);
                    callback(playlist);
                    playlist = null;
                }
            });
    } else {
        callback(playlist);
    }

};

