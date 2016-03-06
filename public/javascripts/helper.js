$(function(){
    $('#artists-menu').on('changed.bs.select', function (e, index) {
        var child = index+1;
        var artist = $('#artists-menu option:nth-child(' + child +')').attr('value');
        $.get({
            url: '/'+artist
        });
    });

});


