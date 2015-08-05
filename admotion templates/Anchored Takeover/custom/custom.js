// Copyright (c) 2013 Admotion

/**
* Initializes the ad.
**/
$(document).on('adm_initializeAd', function(){
	setButtonHandlers();
});

function setButtonHandlers(){
	$('.adButton').click(function () {
			HTMLCreative.clickThrough();
	});

	$('.expander').click(function () {
		doExpand(true);
	});

	$(".collapser").click(function () {
		doCollapse(true);
	});

	$(".closer").click(function () {
		doClose(true);
	});
}

/**
* This method is called after the ad's collapse.
**/
$(document).on('adm_close', function(){
	
});

/**
* This method is called after the ad's expand.
**/
$(document).on('adm_expand', function(){
	
});

$(document).on('adm_resize', function(){
	reDraw();
});

function reDraw(){
	
}