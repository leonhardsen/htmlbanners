function animarFechado(){
	$('#banner_hoc_fechado').show();

	$('#banner_hoc_fechado').animate({		
		opacity:1
	},500);	

	$('#banner_hoc_fechado_gradient').delay(200).animate({		
		opacity:1
	},1000);
    
	$('#banner_hoc_fechado_charac').animate({
		bottom:'-4px',
		opacity:1
	},2000);

	$('#banner_hoc_fechado_logo').delay(1000).animate({		
		opacity:1
	},1000);

	$('#banner_hoc_fechado_flag').delay(400).animate({		
		opacity:1
	},1000);

	$('#banner_hoc_fechado_button').delay(1200).animate({		
		opacity:1
	},1000);

	$('#banner_hoc_fechado_netflix').delay(1400).animate({		
		opacity:1
	},1000);
}

function desanimarFechado(){
	$('#banner_hoc_fechado').animate({		
		opacity:0
	},500);

	$('#banner_hoc_fechado_gradient').animate({		
		opacity:0
	},500);
    
	$('#banner_hoc_fechado_charac').animate({		
		opacity:0
	},500);

	$('#banner_hoc_fechado_logo').animate({		
		opacity:0
	},500);

	$('#banner_hoc_fechado_flag').animate({		
		opacity:0
	},500);

	$('#banner_hoc_fechado_button').animate({		
		opacity:0
	},500);

	$('#banner_hoc_fechado_netflix').animate({		
		opacity:0
	},500);

	$('#banner_hoc_fechado').hide();
}

function animarAberto(){
	$('#banner_hoc_aberto').show();

	$('#banner_hoc_aberto').animate({		
		opacity:1		
	},500);

	$('#banner_hoc_aberto_house').delay(200).animate({		
		opacity:1
	},1000);
    
	$('#banner_hoc_aberto_dvd').animate({
		bottom:'-4px',
		opacity:1
	},2000);

	$('#banner_hoc_aberto_netflix').delay(1000).animate({		
		opacity:1
	},1000);

	$('#banner_hoc_aberto_logo').delay(400).animate({		
		opacity:1
	},1000);

	$('#banner_hoc_aberto_charac').delay(1200).animate({		
		opacity:1
	},1000);

	$('#banner_hoc_aberto_flag').delay(100).animate({		
		opacity:1
	},500);

	$('#banner_hoc_aberto_button').delay(1400).animate({		
		opacity:1
	},1000);
}

function desanimarAberto(){
	$('#banner_hoc_aberto').animate({		
		opacity:0		
	},500);

	$('#banner_hoc_aberto_house').animate({		
		opacity:0
	},500);
    
	$('#banner_hoc_aberto_dvd').animate({		
		opacity:0
	},500);

	$('#banner_hoc_aberto_netflix').animate({		
		opacity:0
	},500);

	$('#banner_hoc_aberto_logo').animate({		
		opacity:0
	},500);

	$('#banner_hoc_aberto_charac').animate({		
		opacity:0
	},500);

	$('#banner_hoc_aberto_flag').animate({		
		opacity:0
	},500);

	$('#banner_hoc_aberto_button').animate({		
		opacity:0
	},500);

	$('#banner_hoc_aberto').hide();
}

function iniciar(){	
  	if(estado == "fechado"){  		  		
  		estado = "aberto";
  		desanimarAberto();
  		animarFechado();  		
  	}else{  		
  		estado = "fechado";
  		desanimarFechado();  		
  		animarAberto(); 		
  	} 	 	
}

var estado = "fechado";

$(document).ready(function(){		
	iniciar();		
});



