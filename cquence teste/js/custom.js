function teste() {

	render = null;

	render = Cq.combine(

			Cq.sequence(
		       Cq.sleep( 100 ),
		       Cq.combine(
			        Cq.linear('person', 1000, { left: 220 }, {left: 237 }),
			        Cq.linear('person', 500, { opacity: 0 }, {opacity: 1 })
			   )			   
		    ),

		    Cq.sequence(
		    	Cq.combine(
			   		Cq.linear('text1', 400, { opacity: 0 }, {opacity: 1 }),
			        Cq.linear('text1', 400, { top: 16 }, {top: 6 })			        
			   ),
		    	Cq.combine(			   		
			        Cq.linear('text1', 600, { top: 6 }, {top: 10 })			        
			   )
		    ),

		    Cq.sequence(
		    	Cq.sleep( 200 ),
		    	Cq.combine(
			   		Cq.linear('text2', 400, { opacity: 0 }, {opacity: 1 }),
			        Cq.linear('text2', 400, { top: 50 }, {top: 40 })			        
			   ),
		    	Cq.combine(			   		
			        Cq.linear('text2', 600, { top: 40 }, {top: 44 })			        
			   )
		    ),

		    Cq.sequence(
		    	Cq.sleep( 300 ),
		    	Cq.combine(
			   		Cq.linear('logo', 500, { left: 560 }, {left: 580 }),
			        Cq.linear('logo', 500, { opacity: 0 }, {opacity: 1 })			       	        
			   )		    	
		    ),

		    Cq.sequence(
		    	Cq.sleep( 200 ),
		    	Cq.combine(			   		
			        Cq.linear('logo_udf', 400, { left: 580 }, {left: 630 }),
			        Cq.linear('logo_udf', 400, { opacity: 0 }, {opacity: 1 })		        
			   )		    
		    ),

		    /**** segunda fase ****/

		    Cq.sequence(
		    	Cq.sleep( 2000 ),
		    	Cq.combine(
			   		Cq.linear('text1', 400, { opacity: 1 }, {opacity: 0 }),
			        Cq.linear('text1', 400, { top: 6 }, {top: 16 })			        
			   ),
		    	Cq.combine(			   		
			        Cq.linear('text1', 600, { top: 10 }, {top: 6 })			        
			   )
		    ),

		    Cq.sequence(
		    	Cq.sleep( 2000 ),
		    	Cq.combine(
			   		Cq.linear('text2', 400, { opacity: 1 }, {opacity: 0 }),
			        Cq.linear('text2', 400, { top: 40 }, {top: 50 })			        
			   ),
		    	Cq.combine(			   		
			        Cq.linear('text2', 600, { top: 44 }, {top: 40 })			        
			   )
		    ),

		    Cq.sequence(
		       Cq.sleep( 2000 ),
		       Cq.combine(
		       		Cq.linear('person', 1000, { top: -40 }, {top: -5 }),
			        Cq.linear('person', 1000, { width: 329 }, {width: 180 }),
			        Cq.linear('person', 500, { height: 399 }, {height: 180 })
			   )			   
		    ),

		    Cq.sequence(
		    	Cq.sleep( 2200 ),
		    	Cq.combine(
			   		Cq.linear('text3', 400, { opacity: 0 }, {opacity: 1 }),
			        Cq.linear('text3', 400, { width: 200 }, {width: 84 }),
			        Cq.linear('text3', 400, { height: 200 }, {height: 62 }),
			        Cq.linear('text3', 400, { left: -27 }, {left: 14 }),
			        Cq.linear('text3', 400, { top: -30 }, {top: 13 })
			   )
		    ),

		    Cq.sequence(
		    	Cq.sleep( 2600 ),
		    	Cq.combine(
			   		Cq.linear('paragrafo1', 400, { opacity: 0 }, {opacity: 1 }),
			        Cq.linear('paragrafo1', 400, { top: 26 }, {top: 16 })			        
			   ),
		    	Cq.combine(			   		
			        Cq.linear('paragrafo1', 600, { top: 16 }, {top: 20 })			        
			   )
		    ),

		    Cq.sequence(
		    	Cq.sleep( 2700 ),
		    	Cq.combine(
			   		Cq.linear('paragrafo2', 400, { opacity: 0 }, {opacity: 1 }),
			        Cq.linear('paragrafo2', 400, { top: 46 }, {top: 36 })			        
			   ),
		    	Cq.combine(			   		
			        Cq.linear('paragrafo2', 600, { top: 36 }, {top: 40 })			        
			   )
		    ),

		    Cq.sequence(
		    	Cq.sleep( 2800 ),
		    	Cq.combine(
			   		Cq.linear('paragrafo3', 400, { opacity: 0 }, {opacity: 1 }),
			        Cq.linear('paragrafo3', 400, { top: 66 }, {top: 56 })			        
			   ),
		    	Cq.combine(			   		
			        Cq.linear('paragrafo3', 600, { top: 56 }, {top: 60 })			        
			   )
		    ),

		    Cq.sequence(
		    	Cq.sleep( 3200 ),
		    	Cq.combine(
		    		Cq.linear('botao', 400, { opacity: 0 }, {opacity: 1 }),
			   		Cq.linear('botao', 400, { width: 0 }, {width: 161 }),
			        Cq.linear('botao', 400, { height: 0 }, {height: 30 }),
			        Cq.linear('botao', 400, { fontSize: 0 }, {fontSize: 20 })			        
			   ),
		    	Cq.combine(			   		
			        Cq.linear('paragrafo3', 600, { top: 56 }, {top: 60 })			        
			   )
		    )


);

Cq.renderloop();

}



document.onload=teste();

