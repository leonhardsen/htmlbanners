// Copyright (c) 2013 Admotion


/**
* Ad configuration
**/
config.autoExpand = false;
config.collapseTimeout = 10;
config.autoExpandCap = 1;

/**
* Initializes the ad.
**/
$(document).on('adm_initializeAd', function(){
	setButtonHandlers();
	
	$('.hoc-character').animate({
		bottom:'0px',
		opacity:1
	},2000);
	$('.flag').fadeIn(400);
	$('.hoc-logo-text').delay(1000).fadeIn(600);
	$('#CollapsedState_ExpandButton').delay(1600).fadeIn(600);
	$('.netflix-logo').delay(1800).fadeIn(600);
});

function setButtonHandlers(){
	$('.hittable').click(function () {
		HTMLCreative.clickThrough();
	});
	
	$("#CollapsedState_ExpandButton").click(function () {
		doExpand(true);
	});
	
	$("#ExpandedState_CloseButton").click(function () {
		doCollapse(true);
	});
}

/**
* This method is called after the ad's collapse.
**/
$(document).on('adm_close', function(){
	$('#ExpandedState').hide();
	$('#CollapsedState').show();
	
	$('.character-exp').css({
		top:'60px',
		opacity:0
	});
	$('.hoc-logo-text-exp').fadeOut(0);
	$('.house').fadeOut(0);
	$('.netflix-text').fadeOut(0);
	$('.dvd').delay(800).css({left:'-88px',opacity:0});
	$('.text-content').fadeOut(0);
	$('.cta').fadeOut(0);
	$('.critic-content').fadeOut(0);
	$('.flag-exp').fadeOut(0);
	
	$('.hoc-character').animate({
		bottom:'0px',
		opacity:1
	},2000);
	$('.flag').fadeIn(400);
	$('.hoc-logo-text').delay(1000).fadeIn(600);
	$('#CollapsedState_ExpandButton').delay(1600).fadeIn(600);
	$('.netflix-logo').delay(1800).fadeIn(600);

});

/**
* This method is called after the ad's expand.
**/
$(document).on('adm_expand', function(){
	$('#CollapsedState').hide();
	$('#ExpandedState').show();
	
	
	$('.flag-exp').fadeIn(600);
	$('.character-exp').animate({
		top:'12px',
		opacity:1
	},2000);
	$('.hoc-logo-text-exp').delay(800).fadeIn(600);
	$('.house').fadeIn(900);
	$('.netflix-text').delay(1100).fadeIn(600);
	$('.dvd').delay(800).animate({left:'0',opacity:1},1000);
	$('.text-content').delay(1500).fadeIn(600);
	$('.cta').delay(2000).fadeIn(600);
	$('.critic-content').delay(1700).fadeIn(800);
	
	var posQuote = Array();
		var currentPos = 1;

		function movePos(obj,pos){
			obj.parent().delay(2500).fadeOut(700, function(){
	
				obj.parent().css('left', -pos + 'px');	
			
				obj.parent().fadeIn(700);

				currentPos++;

				if (currentPos < 3){
					movePos(obj, posQuote[currentPos]);
				}else{
					currentPos = 0;
					movePos(obj, posQuote[currentPos]);
				}
			});	
			
		}

		$('#expanded-bg-970x250 .critic-content .cont ul li').each(
			function(i,v){
				posQuote.push(221 * i);
			}
		);

		movePos($('#expanded-bg-970x250 .critic-content .cont ul li'), posQuote[currentPos]);
	
	$('.hoc-character').css({
		bottom:'-30px',
		opacity:0
	});
	$('.flag').fadeOut(0);
	$('.hoc-logo-text').fadeOut(0);
	$('#CollapsedState_ExpandButton').fadeOut(0);
	$('.netflix-logo').fadeOut(0);
	

});

/**
* This method is called when the windows' size was changed.
**/
$(document).on('adm_resize', function(){
	
});
