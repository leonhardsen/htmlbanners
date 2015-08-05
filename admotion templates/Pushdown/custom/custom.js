// Copyright (c) 2013 Admotion
var COLLAPSE_STATE = "collapse";
var EXPAND_STATE   = "expand";
var lastAdState;
/**
* Initializes the ad.
**/
$(document).on('adm_initializeAd', function(){
	
	HTMLCreative.admExpandCommand = function(data){
		if(lastAdState != EXPAND_STATE){
			showExpandState();
		}
	}

	HTMLCreative.admCollapseCommand = function(data){
		if(lastAdState != COLLAPSE_STATE){
			showCollapseState();
		}
	}
	
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
* This method is called after the ad's collapse.
**/
$(document).on('adm_close', function(){
	showCollapseState();
});

/**
* This method is called after the ad's expand.
**/
$(document).on('adm_expand', function(){
	showExpandState();
});

function showCollapseState() {
	lastAdState = COLLAPSE_STATE;
	$('#ExpandedState').hide();
	$('#CollapsedState').show();
}

function showExpandState() {
	lastAdState = EXPAND_STATE;
	$('#CollapsedState').hide();
	$('#ExpandedState').show();
}

/**
* This method is called when the windows' size was changed.
**/
$(document).on('adm_resize', function(){
	
});
