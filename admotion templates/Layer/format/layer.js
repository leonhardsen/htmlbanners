// Copyright (c) 2013 Admotion
// Default configuration. cancelBubble be overriden in custom.js  

var closeTimeoutId;

var config = {};

var setConfig = function(param, defaultValue){
	config[param] = (typeof(adConfig) !== "undefined" && typeof(adConfig[param]) !== "undefined") ? adConfig[param] : defaultValue;
}

setConfig("creativityWidth", "400px");
setConfig("creativityHeight", "400px");
setConfig("autoClose", false);
setConfig("closeTimeout", 10);


//LoaderFix
(function (){
	$("#LoadingSection").css("width",config.creativityWidth);
	$("#LoadingSection").css("height", config.creativityHeight);
})();

	
/**
* This method it's called by HTMLCreative when it is ready.
**/
window.admReady = function() {
	$("#Creativity").on("touchmove", false);
 	$('#LoadingSection').hide();
	$('#InpageSection').show();
	
	makeUnselectable($('#Creativity'));
	
	if (config.autoClose)
		closeTimeoutId  = setTimeout( doClose, config.closeTimeout * 1000);
		
	$(document).trigger('adm_initializeAd');
	setFormatSize();
	
};

/**
* Initiates the ad's size propieties.
**/
function setFormatSize (){
	$('#Creativity').css("width",config.creativityWidth);
	$('#Creativity').css("height", config.creativityHeight);
}

/**
* It returns an object with the AdVars.
**/
function getAdVars(){
	try{
		if(!adVars)adVars = HTMLCreative.getAdVars(); 
	}catch(e){
		adVars = {cookieCount:0,instanceCount:0};
	}
	return adVars;
}

/**
* Hides the colpase and shows the expand.
**/
function delayedExpandedLayout() {
	//$(document).trigger('beforeExpand');
	$(document).trigger('adm_expand');
}

/**
* Hides the expand and shows the colpase.
**/
function doClose(isInteractive) {
	clearTimeout(closeTimeoutId);

	try{
		HTMLCreative.remove();
	}catch(e){};
	
	if(isInteractive){
		HTMLCreative.reportCloseOnUserInitiated();
	}
	
	$(document).trigger('adm_close'); 
}

/**s
* This method is triggered when the as is collapsed, expanded or 
* the windows was resized.
**/
function doResize(){
	//$(document).trigger('beforeResize');
	// Reserved for centering elements, etc
	$(document).trigger('adm_resize');
}

$(window).resize(function() {
	doResize();
});

/**
*
**/
function makeUnselectable ( $target ) {
	$target
		.addClass( 'unselectable' ) // All these attributes are inheritable
		.attr( 'unselectable', 'on' ) // For IE9 - This property is not inherited, needs to be placed onto everything
		.attr( 'draggable', 'false' ) // For moz and webkit, although Firefox 16 ignores this when -moz-user-select: none; is set, it's like these properties are mutually exclusive, seems to be a bug.
		.on( 'dragstart', function() { return false; } );  // Needed since Firefox 16 seems to ingore the 'draggable' attribute we just applied above when '-moz-user-select: none' is applied to the CSS 
		
	$target // Apply non-inheritable properties to the child elements
		.find( '*' )
		.attr( 'draggable', 'false' )
		.attr( 'unselectable', 'on' ); 
};
