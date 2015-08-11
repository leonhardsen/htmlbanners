function iniciar(){	

	//$('#banner #fechado').css("height","0px");
	//$('#banner #fechado #conteudo #gradient-bg').css("opacity","0");
	//$('#banner #fechado #conteudo #charac').css("opacity","0").css("top","30px");

	//$('#banner #aberto').css("display","block");

	/*$('#banner #aberto').animate({		
		height:'250px'
	},300);*/

	$('#banner #conteudo #person').delay(100).animate({		
		opacity:1,
		left:"230px"
	},1000);	

	$('#banner #conteudo #logo-1').delay(200).animate({		
		opacity:1,
		left:"590px"
	},1000);

	$('#banner #conteudo #udf-1').delay(100).animate({		
		opacity:1,
		left:"644px"
	},1000);

	$('#banner #conteudo #processo-1-a').delay(200).animate({		
		opacity:1,
		top:"7px"
	},400);

	$('#banner #conteudo #processo-1-b').delay(200).animate({		
		opacity:1,
		top:"42px"
	},500);

	$('#banner #conteudo #processo-1-a').animate({				
		top:"10px"
	},500);

	$('#banner #conteudo #processo-1-b').animate({				
		top:"45px"
	},500);

	/***** segunda parte *****/

	$('#banner #conteudo #processo-1-a').delay(500).animate({		
		top:"7px"
	},500);

	$('#banner #conteudo #processo-1-b').delay(500).animate({		
		top:"42px"
	},500);

	$('#banner #conteudo #processo-1-a').animate({		
		opacity:0,
		top:"20px"
	},500);	

	$('#banner #conteudo #processo-1-b').animate({		
		opacity:0,
		top:"55px"
	},500);

	$('#banner #conteudo #person').delay(1000).animate({		
		opacity:1,
		width:"180px",
		height:"180px",
		top:"-5px"
	},800);
}

$(document).ready(function(){		
	iniciar();
});