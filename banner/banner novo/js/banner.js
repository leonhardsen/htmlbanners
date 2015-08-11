function fechado(){	

	$('#banner #aberto').css("height","0px");
	$('#banner #aberto #conteudo #charac-exp').css("opacity","0").css("top","30px");	

	$('#banner #fechado').animate({		
		height:'90px'
	},300);

	$('#banner #fechado #conteudo #gradient-bg').delay(300).animate({		
		opacity:1
	},300);

	$('#banner #fechado #conteudo #charac').delay(450).animate({		
		opacity:1,
		top:"3px"
	},1000);
}

function aberto(){	

	$('#banner #fechado').css("height","0px");
	$('#banner #fechado #conteudo #gradient-bg').css("opacity","0");
	$('#banner #fechado #conteudo #charac').css("opacity","0").css("top","30px");

	$('#banner #aberto').css("display","block");

	$('#banner #aberto').animate({		
		height:'250px'
	},300);

	$('#banner #aberto #conteudo #charac-exp').delay(450).animate({		
		opacity:1,
		top:"12px"
	},1000);	
}

function iniciar(){	
  	if(estado == "fechado"){  		  		
  		fechado();
  		estado = "aberto";  		
  	}else{  		
  		aberto();
  		estado = "fechado";
  	} 	 	
}

var estado = "fechado";

$(document).ready(function(){		
	iniciar();		
});