// Copyright (c) 2013 Admotion

/**
* Initializes the ad.
**/
$(document).on('adm_initializeAd', function(){
	setButtonHandlers();
})

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
}

/**
* This method is called after the ad collapses.
**/
$(document).on('adm_close', function(){
	
});

/**
* This method is called after the ad expands.
**/
$(document).on('adm_expand', function(){
	
});