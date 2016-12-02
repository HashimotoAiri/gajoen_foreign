jQuery(function($){

    var loder = function(){
        var pageH = $("#container").height();

        $("#fade").delay(1200).fadeOut(1000);
        // $("#fade").css("height", pageH).delay(1000).fadeOut(1000);
        $("#loader").delay(500).fadeOut(500);
        $("#container").css("display", "block");
    }

    $('head').append(
        '<style type="text/css">#container { display: none; } #fade, #loader { display: block; }</style>'
    );

    jQuery.event.add(window,"load",function() { //
        setTimeout(loder, 1000);
    });

});