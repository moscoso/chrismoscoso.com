$(document).ready(function () {

	$("#menu-btn").click(function () {
		$("#navMenu").slideToggle();
		$(".nav-toggle").toggleClass("active");
	});



	var h = $(".move-on-resize").height();
	$(".move-on-resize").css("top", "-" + h + "px");

	$(window).resize(function () {
		var h = $(".move-on-resize").height();
		$(".move-on-resize").css("top", "-" + h + "px");

	});

	$(window).scroll(function () {
		if ($(window).width() >= 992) {
			var $header = $("header");
			var $landing = $("#landing")
			var offset = $landing.height() - $header.height();

			if ($header.offset().top > offset) {
				$header.css("background-color", "rgba(0,0,0,0.9)");
			} else {
				$header.css("background-color", "rgba(0,0,0,0)");
			}
		}


	});

	$(".website button").click(function () {

		$(this).toggleClass("expanded");
		$(this).siblings(".link").toggleClass("expanded");

		if ($(this).hasClass("expanded")) {
			$(this).html('<i class="fa fa-minus" aria-hidden="true"></i>');
		} else {
			$(this).html('<i class="fa fa-plus" aria-hidden="true"></i>');

		}
	});

	// init
	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 'onLeave',
			vertical: false
		}
	});

	// get all slides
	var slides = document.querySelectorAll("section.magic");

	// create scene for every slide
	for (var i = 0; i < slides.length; i++) {
		new ScrollMagic.Scene({
				triggerElement: slides[i]
			})
			.setPin(slides[i])
			.addIndicators() // add indicators (requires plugin)
			.addTo(controller);
	}


});


/*Smooth Scroll*/
$(function () {
	$('a[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				console.log("window width: " + $(window).width());

				if ($(window).width() >= 992) {
					console.log("yes");
					$('html, body').animate({
						scrollTop: target.offset().top - $("header").height()
					}, 1000);
					return false;
				} else {
					console.log("no");
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		}
	});
});

//The very last call to be made
$(window).load(function () {
	$('body').addClass('loaded');

	$("#js-rotating").Morphext({
		animation: "bounceIn", // Overrides default "bounceIn"
		separator: ",", // Overrides default ","
		speed: 3000, // Overrides default 2000
		complete: function () {
			// Overrides default empty function
			//console.log($("#iam").offset());
		}
	});

	$("#logo").on("click", function () {
		$("#canvas2").fadeToggle();
		$("#canvas2").show();

		console.log("ay");
	});
});