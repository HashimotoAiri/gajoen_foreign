jQuery(function($){

    // goTop
    $(document).ready(function(){
        // hide #goTop first
        $("#goTop").hide();
        // fade in .goTop
        $(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 500) {
                    $('#goTop').fadeIn();
                } else {
                    $('#goTop').fadeOut();
                }
            });
            // scroll body to 0px on click
            // $('.goTop a').click(function () {
            //     $('body,html').animate({
            //             scrollTop: 0
            //         }, 700);
            //     return false;
            // });
        });
    });



    $("#menuBtn").click(function(){
      $("#spNavi,#menuBtn").toggleClass("open");
      // $("#gNaviTb").toggleClass("open");
    });

    $("#newsWrap").hide();
    $("#spOpenBtn").click(function(){
      $("#spOpenBtn").toggleClass("open");
      $("#newsWrap").slideToggle();
    });
    $("#openBtn").click(function(){
      $("#openBtn").toggleClass("open");
      $("#newsWrap").slideToggle();
    });

    //クリックしたらオーバーレイを消す
    $('#spNavi li a, #overlay').on('click',function() {
        $("#spNavi, #overlay, #menuBtn").removeClass("open");
    });

    var ww = $(window).width();
    if( ww < 768 ){
        $(".hover_wrap").on("click",function(){
            $(".hover_wrap").removeClass("hover")
            $(this).addClass("hover");
        });
    }

});