var expect    = require("chai").expect;
var videos = require("../services/videos");

// test videos module
describe("Get videos from Youtube", function() {
    it("Given artist name return a list of videos", function() {
        videos.getPlayList('Elton John',function(result){
            expect(result.length).to.equal(40);
        });
        videos.getPlayList('Stevie Wonder',function(result){
            expect(result.length).to.equal(40);
        });
        videos.getPlayList('Frank Sinatra',function(result){
            expect(result.length).to.equal(40);
        });
        videos.getPlayList('Louis Armstrong',function(result){
            expect(result.length).to.equal(40);
        });
    });
});