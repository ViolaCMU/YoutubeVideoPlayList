var express = require('express');
var router = express.Router();
var videoList = require('../services/videos');
var artists = require('../services/artists');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(artists);
  res.render('index', { title: 'Youtube Video List', videos: videoList.getPlayList(), artists: artists });
});

router.get('/:artist', function(req, res, next) {
  console.log("path: " + req.params.artist);
  res.render('index', { title: 'Youtube Video List', videos: videoList.getPlayList(req.params.artist), artists: artists });
});

module.exports = router;
