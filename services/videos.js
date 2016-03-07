var request = require('request');
var artists = require('./artists');
var NodeCache = require( "node-cache" );
var cache = new NodeCache({ stdTTL: 1800, checkperiod: 120 });

var videos = [
    {"id": 1, "title": "第一篇", "body": "正文", "published": "6/2/2013"},
    {"id": 2, "title": "第二篇", "body": "正文", "published": "6/3/2013"},
    {"id": 3, "title": "第三篇", "body": "正文", "published": "6/4/2013"},
    {"id": 4, "title": "第四篇", "body": "正文", "published": "6/5/2013"},
    {"id": 5, "title": "第五篇", "body": "正文", "published": "6/10/2013"},
    {"id": 6, "title": "第六篇", "body": "正文", "published": "6/12/2013"}
];

var api_key = 'AIzaSyCBFJBCzHnXpFAYwaRT2M02F19t-K8CzXY';
var server = 'https://www.googleapis.com/youtube/v3/search';

exports.getPlayList = function (artist, callback) {
    var playlist = cache.get(artist);
    if(!playlist){
        playlist = [];
        request(
            server + '?part=snippet&key=' + api_key + '&q=' + artist + '&maxResults=20',
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var bodyObj = JSON.parse(body);
                    for(var i in bodyObj.items){
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
    }else{
        callback(playlist);
    }

};

