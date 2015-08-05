// Copyright (c) 2013 Admotion

var closeTimeoutId, currentState;

var config = {};


var setConfig = function(param, defaultValue){
	config[param] = (typeof(adConfig) !== "undefined" && typeof(adConfig[param]) !== "undefined") ? adConfig[param] : defaultValue;
};

setConfig("autoClose", false);
setConfig("closeTimeout", 10);
setConfig("frequencyCap", 0);
setConfig("autoScale", true);
setConfig("animationType", "none");
setConfig("isMraid", false);


//LoaderFix
(function (){
	$("#LoadingSection").css("width","100%");
	$("#LoadingSection").css("height", "100%");
})();

/**
* This method it's called by HTMLCreative when it is ready.
**/

window.admReady = function() {
	doResize();
    $("#Creativity").on("touchmove", false);
    $('#LoadingSection').hide();
    $('#InpageSection').show();

    makeUnselectable($('#Creativity'));

    if( config.isMraid ) {
        AdmBase.DOMEvent.add( window, 'message', function ( event ) {
            var data = AdmBase.fromJSON(event.data);
            if ( data.message == "stateChange" ) {
                var state = data.args;

                if ( currentState == state ) {
                    return; //Early return
                }

                switch ( state ) {
                    case mraid.AdState.Expanded:
                        showAd();
                        break;
                    case mraid.AdState.Default:
                        doClose();
                        break;
                }
            }
        });

        mraid.setExpandProperties({
            useCustomClose : true
        });

    }

	if (config.autoClose) {
		closeTimeoutId  = setTimeout( function () {
											doClose(true);
										}, config.closeTimeout * 1000);
	}

	doExpandWithCap(config.frequencyCap);

	$(document).trigger('adm_initializeAd');
	setFormatSize();
	setAnimationType();
};

/**
* Initiates the ad's size propieties.
**/
function setFormatSize (){
	$('#Creativity').css("width", "100%");
	$('#Creativity').css("height", "100%");
}

/**
* Initiates the ad's animationType.
**/
function setAnimationType (){
	var params = null;
	switch(config.animationType){
		case "up":
			params = {top:-$("#Creativity").height()};
			break;
		case "down":
			params = {top:$("#Creativity").height()};
			break;
		case "right":
			params = {left:$("#Creativity").width()};
			break;
		case "left":
			params = {left:-$("#Creativity").width()};
			break;
		default:
			config.animationType = "none";
	}

	if(params != null) {
		$("#Creativity").css(params);
	}
}

function stripSizeString(str){	
	return parseInt(str.replace("%","").replace("px",""));
}

/**
* Animation's functions.
**/
function showAd(){

    if ( config.isMraid && currentState == mraid.AdState.Expanded ){
        return // Early return;
    }

	switch (config.animationType){
		case "none": 
			$('#Creativity').show();
			break;
		case "fade":
			$('#Creativity').fadeIn();
			break;
		case "up":
		case "down":
		case "right":
		case "left":
			$('#Creativity').show();
			$("#Creativity").animate({left: 0, top: 0}, 250);
			break;
	}
    currentState = mraid.AdState.Expanded;
}

function hideAd(){

    if ( config.isMraid && currentState == mraid.AdState.Default ) {
        return // Early return;
    }

	var params;

	switch (config.animationType){
		case "none":
			params = {};
			break;
		case "fade":
			$('#Creativity').fadeOut();
			break;
		case "up":
			params = {top: -$("#Creativity").height()};
			break;
		case "down":
			params = {top: $("#Creativity").height()};
			break;
		case "right":
			params = {left: $("#Creativity").width()};
			break;
		case "left":
			params = {left: -$("#Creativity").width()};
			break;
	}

    currentState = mraid.AdState.Default;

	if(params != null) {
		$("#Creativity").animate(params,  250, function (){
			$('#Creativity').hide();
		});
	}
}

/**
* Closes the ad.
**/
function doClose(isInteractive) {
	clearTimeout(closeTimeoutId);
	hideAd();
	doResize();
		HTMLCreative.remove();
	
	if(isInteractive){
		HTMLCreative.reportCloseOnUserInitiated();
	}
	
	$(document).trigger('adm_close'); 
}


/**
* Initiates the ad's expansion.
**/
function doExpand() {

		HTMLCreative.expand({
								method: "size",
								width: 100,
								height: 100,
								widthRule: "percentage",
								heightRule: "percentage",
								isFixedPositioning: true,
								isWindowCoordinates: true
							});

	
	showAd();
}

/**
* Initiates the autoexpand.
* @param delay: seconds that will last the expansion. The Number must be greater than 0. 
**/
function doExpandWithCap(freqCap){
	freqCap = isNaN(freqCap) ? 0 : freqCap;

	if((freqCap == 0 || HTMLCreative.getCookieCount() < freqCap) /*&& adVars.instanceCount == 0*/)
	{
		doExpand();
	}
	else
	{
		doClose();
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
	doResize();

	$(document).trigger('adm_expand');
}


/**
* Resize.
**/
function doResize(){
	var fContainerWidth  = parseInt($('#Foreground').outerWidth());
	var fContainerHeight = parseInt($('#Foreground').outerHeight());
	var wWidth  = $(window).width();
	var wHeight = $(window).height();
	var ratio   = wWidth / wHeight;
	var adRatio = fContainerWidth/fContainerHeight;
	var percent = ratio >= adRatio  ? (wHeight / fContainerHeight) : (wWidth / fContainerWidth);
		percent = config.autoScale ? percent : 1;


		$("#InpageSection").width(wWidth);
		$("#InpageSection").height(wHeight);
		$("#Creativity").width(wWidth);
		$("#Creativity").height(wHeight);

        $('#Foreground').css({
            position: 'absolute',
            transform: 'scale(' + percent + ',' + percent + ')',
            left: (wWidth - fContainerWidth) / 2,
            top: (wHeight - fContainerHeight) / 2
        });

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