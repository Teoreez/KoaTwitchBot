window.setInterval(event, 2000);
var tempdata = "/sound/.mp3";
function event() {
    $.ajax({
        url: "/soundalert",
        data: { attr1: 'value1' },
        success: function( data ) {
            if(data != tempdata) {
                var audio = new Audio(data);
                audio.play();
                tempdata = data;
            } else {
                $.get(
                    "/refreshaudio",
                    {paramOne : 10, paramX : 'abc'},
                    function(data) {
                });
            }
            
            
        }
    });
}

