$("#follower").hide();

$( "html" ).mousemove(function( event ) {
	$("#follower").css("top", event.pageY + "px");
	$("#follower").css("left", event.pageX + "px")
});


$( "html" ).mousedown(function(){
	$("#circle1").addClass("clicked");
	$("#circle2").addClass("clicked");
});

$( "html" ).mouseup(function(){
	$("#circle1").removeClass("clicked");
	$("#circle2").removeClass("clicked");
});

$(".changeCloudsOnClick").mouseenter(function(){
	$("#follower").show();
	
})

$(".changeCloudsOnClick").mouseleave(function(){
	$("#follower").hide();
})

$(".changeCloudsOnClick").click(function(){
	$(".changeable-canvas").fadeToggle();
	$("#iam").toggleClass("canvasRemoved");
	$(".scroll-down-btn").toggleClass("canvasRemoved");
});
