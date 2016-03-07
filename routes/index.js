var express = require('express');
var router = express.Router();
var videoList = require('../services/videos');
var artists = require('../services/artists');

// GET home page
router.get('/', function (req, res, next) {
    videoList.getPlayList(artists[0], function (result) {
        // render page with data
        res.render('index', {title: 'Youtube Video List', videos: result, artists: artists});
    });

});

// GET playlist json data
router.get('/:artist', function (req, res, next) {
    videoList.getPlayList(req.params.artist, function (result) {
        // only send data
        res.send({"result": result});
    });
});

module.exports = router;
