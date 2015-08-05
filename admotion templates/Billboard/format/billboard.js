// Copyright (c) 2013 Admotion

var collapseTimeoutId, expandTimeoutId;


var isAdmReady = false;

var config = {};

var setConfig = function(param, defaultValue){
	config[param] = (typeof(adConfig) !== "undefined" && typeof(adConfig[param]) !== "undefined") ? adConfig[param] : defaultValue;
};

setConfig("expandTimeoutMsecs", 10);
setConfig("collapsedWidth", "970px");
setConfig("collapsedHeight", "90px");
setConfig("expandedWidth", "970px");
setConfig("expandedHeight", "250");
setConfig("autoExpand", false);
setConfig("collapseTimeout", 10);
setConfig("autoExpandCap", 1);


//LoaderFix
(function (){
	$("#LoadingSection").css("width",config.collapsedWidth);
	$("#LoadingSection").css("height", config.collapsedHeight);
})();

function getAdCookies() {

    var panelGroup = HTMLCreative.getPanelGroup();
	return HTMLCreative.getSavedData( panelGroup );
}

function getCookieByName(name/*String*/) {
	var cookies = getAdCookies();
	return cookies && cookies.hasOwnProperty(name) ? cookies[name] : "collapse";
}

function setCookieByName(name/*String*/, value/*Object*/) {
	var data = {};
	data[name] = value;
	HTMLCreative.sendCommand("saveData" , data);
}

/**
* This method initialize the ad
**/
function initialize(){

    $("#ExpandedState").on("touchmove", false);
    $('#LoadingSection').hide();
    $('#InpageSection').show();

    makeUnselectable($('#CollapsedState'));
    makeUnselectable($('#ExpandedState'));

    var lastState = getCookieByName("lastState");
    if( lastState == "expand" ){
        doExpand();
    }else   if (config.autoExpand ) {
        var wasExecuted = doExpandWithCap(config.autoExpandCap, config.collapseTimeout);
		
		if(!wasExecuted){
			doCollapse(false, true);
		}
    }

    $(document).trigger('adm_initializeAd');

    setFormatSize();
    doResize();

}



/**
* This method it's called by HTMLCreative when it is ready.
**/
window.admReady = function() {
	isAdmReady = true;
	initialize();
};

/**
* Initiates the ad's size propieties.
**/
function setFormatSize (){
	$('#CollapsedState').css("width",config.collapsedWidth);
	$('#CollapsedState').css("height", config.collapsedHeight);
	$('#ExpandedState').css("height", config.expandedHeight);
    $('#ExpandedState').css("width", config.expandedWidth);
}

/**
* Initiates the ad's expansion.
**/
function doExpand(isInteractive) {
	clearTimeout(expandTimeoutId);
	expandTimeoutId = setTimeout( delayedExpandedLayout, config.expandTimeoutMsecs);
	
	HTMLCreative.expand({ method:"size" });
	
	if(isInteractive){
		HTMLCreative.reportExpandOnUserInitiated();
	}else{
		HTMLCreative.reportAutomaticExpand();
	}
	setCookieByName("lastState", "expand");
}

/**
* Initiates the autoexpand.
* @param delay: seconds that will last the expansion. The Number must be greater than 0. 
**/
function doExpandWithCap(freqCap, delay){
	freqCap = isNaN(freqCap) ? 0 : freqCap;
	delay   = isNaN(delay)   ? 0 : delay;
	

	// The instanceCount is not avaialable from the core.
	if( ( freqCap == 0 || HTMLCreative.getCookieCount() < freqCap ) /*&& adVars.instanceCount == 0*/){
		doExpand();
		if (delay > 0)
			collapseTimeoutId  = setTimeout( doCollapse, delay * 1000);
		return true;
	}
	
	return false;
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
	
	HTMLCreative.collapse({ method:"size" });
	
	if(isInteractive){
		setCookieByName("lastState", "collapse");
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

$(window).resize(function() {
	doResize();
});

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
}

