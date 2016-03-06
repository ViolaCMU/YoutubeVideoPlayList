var request = require('request');

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

var getVideo = function (artist) {
    request(
        server + '?part=snippet&key=' + api_key + "&q=" + artist,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        });
};


exports.getPlayList = function (artist) {
    //console.log(artist);
    return videos;
};

