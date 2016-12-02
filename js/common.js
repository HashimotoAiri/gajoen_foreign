jQuery(function($){

	$core = {

		init: function(){
		},

		breakPoint: function(){
			//$.core.imageChange();
			if(window.matchMedia('(max-width:767px)').matches){
				$core.breakOn();
			}
			else {
				$core.breakOff();
				var meta = document.createElement('meta');
				meta.setAttribute('name', 'viewport');
				meta.setAttribute('content', 'width=1200, user-scalable=yes');
				document.getElementsByTagName('head')[0].appendChild(meta);
			}
			function breakPointResize(){
				if($("body").hasClass("breakOff")){
					$core.breakOn();
				}
				else if ((!window.matchMedia('(max-width:767px)').matches)&&($("body").hasClass("breakOn"))){
					$core.breakOff();
				}
			};
			window.matchMedia("(max-width:767px)").addListener(breakPointResize);
		},

		breakOn: function(){
			$(window).triggerHandler(/* 'breakChange', */"breakOn");
			$("body").addClass("breakOn").removeClass("breakOff");
			$(".SPLink").off('.spTargetLink');
		},

		breakOff: function(){
			$(window).triggerHandler(/* 'breakChange', */"breakOff");
			$("body").addClass("breakOff").removeClass("breakOn");
			$(".SPLink").off('.spTargetLink').on('click.spTargetLink',function() {
				return false;
			})
		},

		imageChange: function(){
			$(window).on('breakOn',function() {
				$('.imgChange').each(function() {
					$(this).attr('src', $(this).data('sp-img'));
					if($(this).attr("data-sp-width")){
						imgW=($(this).attr("data-sp-width"));
						$(this).width(imgW);
					}
					if($(this).attr("data-sp-height")){
						imgH=($(this).attr("data-sp-height"));
						$(this).height(imgH);
					}
				});
			});
			$(window).on('breakOff',function() {
				$('.imgChange').each(function() {
					$(this).attr('src', $(this).data('img'));
						$(this).width("auto").height("auto");
				});
			});
		},

		// 横幅の変化を監視する（timer）
		changeWidth: function(){
			$(window).load(function () {
				var winWidth = $(window).width();
				var winWidth_resized;
				var timer = false;
				$(window).resize(function () {
					if (timer !== false) {
							clearTimeout(timer);
					}
					timer = setTimeout(function() {
						$(window).triggerHandler("widthChange");
					}, 200);
				});
			});
		}

	};

	$(document).ready(function(){

		// breakPoint
		$core.breakPoint();
	
		/* timerで実行する */
		$core.changeWidth();

		// fadeIn
		function fadeIn(){
			$('.fadein').each(function(){
				var $target = $(this);
				$(window).scroll(function (){
					var elemPos = $target.offset().top;
					var scroll = $(window).scrollTop();
					var windowHeight = $(window).height();
					if (scroll > elemPos - windowHeight + 200){
						$target.addClass('scrollin');
					}
				});
			});
			$('.fadeinLeft').each(function(){
				var $target = $(this);
				$(window).scroll(function (){
					var elemPos = $target.offset().top;
					var scroll = $(window).scrollTop();
					var windowHeight = $(window).height();
					if (scroll > elemPos - windowHeight + 200){
						$target.addClass('scrollin');
					}
				});
			});
		}
		fadeIn();

		// スムーズスクロール
		$('a[href^=#]').click(function(){
			var speed = 500;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			$("html, body").animate({scrollTop:position}, speed, "swing");
			return false;
		});

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