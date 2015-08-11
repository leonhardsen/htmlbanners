// Copyright (c) 2013 Admotion

// Default configuration. cancelBubble be overriden in custom.js  
var collapseTimeoutId, expandTimeoutId;
var config = {};
	config.expandTimeoutMsecs = 100;
	config.autoExpand = false;
	config.collapseTimeout = 10;
	config.autoExpandCap = 1;
	
/**
* This method it's called by HTMLCreative when it is ready.
**/
window.admReady = function() {
	$("#ExpandedState").on("touchmove", false);
	$("#InpageSection").width($(window).width());
	$("#InpageSection").height($(window).height());
	
 	$('#LoadingSection').hide();
	$('#InpageSection').show();
	
	makeUnselectable($('#CollapsedState'));
	makeUnselectable($('#ExpandedState'));
	
	if (config.autoExpand)
		doExpandWithCap(config.autoExpandCap, config.collapseTimeout);
		
	$(document).trigger('adm_initializeAd');
	
	doResize();
};

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
* Initiates the ad's expansion.
**/
function doExpand(isInteractive) {
	clearTimeout(expandTimeoutId);
	expandTimeoutId = setTimeout( delayedExpandedLayout, config.expandTimeoutMsecs);
	try{
		HTMLCreative.expand();
	}catch(e){
		console.debug(e);
	}  
	
	if(isInteractive){
		HTMLCreative.reportExpandOnUserInitiated();
	}else{
		HTMLCreative.reportAutomaticExpand();
	}
	
}

/**
* Initiates the autoexpand.
* @param delay: seconds that will last the expansion. The Number must be greater than 0. 
**/
function doExpandWithCap(freqCap, delay){
	freqCap = isNaN(freqCap) ? 0 : freqCap;
	delay   = isNaN(delay)   ? 0 : delay;
	
	var adVars = getAdVars();
	if((freqCap == 0 || adVars.cookieCount < freqCap) && adVars.instanceCount == 0){
		doExpand();
		if (delay > 0)
			collapseTimeoutId  = setTimeout( doCollapse, delay * 1000);		
	}
}

/**
* Initiates the autoexpand.
* @param delay: seconds that will last the expansion. The Number must be greater than 0. 
**/
function doExpandTeaser(delay){
	doExpandWithCap(1, delay);
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
function doCollapse(isInteractive) {
	clearTimeout(collapseTimeoutId);
	clearTimeout(expandTimeoutId);
	//$(document).trigger('beforeClose');

	try{
		HTMLCreative.collapse();
	}catch(e){
		console.debug(e);
	};
	
	if(isInteractive){
		HTMLCreative.reportCollapseOnUserInitiated();
	}
	
	$(document).trigger('adm_close'); 
}

/**
* This method is triggered when the as is collapsed, expanded or 
* the windows was resized.
**/
function doResize(){
	//$(document).trigger('beforeResize');
	// Reserved for centering elements, etc
	$(document).trigger('adm_resize');
}

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

$(window).resize(function() {
	doResize();
});