render = Cq.combine(

			Cq.sequence(
		       Cq.sleep( 100 ),
		       Cq.combine(
			        Cq.linear('person', 1000, { left: 220 }, {left: 237 }),
			        Cq.linear('person', 500, { opacity: 0 }, {opacity: 1 }),

			        Cq.linear('logo', 500, { left: 560 }, {left: 580 }),
			        Cq.linear('logo', 500, { opacity: 0 }, {opacity: 1 }),
			        Cq.linear('logo_udf', 400, { left: 600 }, {left: 630 }),
			        Cq.linear('logo_udf', 400, { opacity: 0 }, {opacity: 1 }),

			        Cq.linear('text1', 500, { opacity: 0 }, {opacity: 1 }),
			        Cq.linear('text1', 500, { top: 30 }, {top: 20 }),

			        Cq.linear('text2', 500, { opacity: 0 }, {opacity: 1 }),
			        Cq.linear('text2', 500, { top: 60 }, {top: 50 })
			   )
		    )
		    
);

Cq.renderloop();