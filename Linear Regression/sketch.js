



let cnv = Array(4).fill();// ARRAY OF CANVAS 
let points = [] // ARRAY TO STORE THE PONTS
let reg_line;
let reset_button; 
let cost_plot;
let calc_cost_button;


// CANVAS 0 IS WHERE THE POINTS ARE TO BE DRAWN
let canvas_0 = (c_0) => { // CANVAS 0

	
	c_0.setup = () =>{
		c_0.createCanvas((c_0.windowWidth/2)*0.3, (c_0.windowWidth/2)*0.3);
		c_0.background(0);
		reg_line = new Regression();
		reset_button = c_0.select("#reset"); // RESET BUTTON TO RESET THE POINTS
		reset_button.mousePressed( () =>{
			points = [];
			reg_line.m = 0; 
			reg_line.c = 0;
	
		});
		
	}

	c_0.draw = () =>{
		c_0.background(0);
		if(points.length > 0){// DISPLAY WACH POINTS
			reg_line.show(c_0, points, "g");
			points.forEach( (x) => x.show(c_0));
			
		}
		

	}

	c_0.mousePressed = () => { // DRAW THE POINTS ONLY WHEN
		//THE MOUSE IS PRESSED ON THE CANVAS_0

		if(c_0.mouseX > 0 && c_0.mouseX < c_0.width && c_0.mouseY >0 && c_0.mouseY <c_0.height){
			let temp = new Point(c_0.mouseX, c_0.mouseY, c_0);
			points.push(temp); 
		}


	}

	c_0.windowResized = () => {// WHEN THE WINDOW IS RESIZED
		c_0.resizeCanvas((c_0.windowWidth/2)*0.3, (c_0.windowWidth/2)*0.3); // RESIZE THE CANVAS
		c_0.background(0);
		reg_line.m = 0; 
		reg_line.c = 0;

	}


}



let canvas_1 = (c_1) => { // CANVAS 1

	 
	c_1.setup = () =>{
		c_1.createCanvas((c_1.windowWidth/2)*0.3, (c_1.windowWidth/2)*0.3);
		
	}

	c_1.draw = () =>{
		c_1.background(0);
		if(points.length > 0){
			reg_line.show(c_1, points, "d");
			points.forEach( (x) => x.show(c_1));
		}
	}

	c_1.windowResized = () => {
		c_1.resizeCanvas((c_1.windowWidth/2)*0.3, (c_1.windowWidth/2)*0.3);
		c_1.background(0);
	}

}






let canvas_2 = (c_2) => { // CANVAS 2

	 let flag = false;
	 let calc_flag = false;
	c_2.setup = () =>{
		c_2.createCanvas((c_2.windowWidth/2)*0.3, (c_2.windowWidth/2)*0.3);
		c_2.background(0);
		calc_cost_button = c_2.createButton("DRAW ITERATIONS v/s OVERALL-ERROR");
		calc_cost_button.center();
		cost_plot = new CostPlot()
		calc_cost_button.mousePressed( () => {
			c_2.reset();
			flag = true;
		});
	}

	c_2.draw = () =>{
		calc_cost_button.position(c_2.width/2, c_2.height+30);
		if(flag){
			cost_plot.show(c_2, points);
			flag = false;
			calc_flag = true;
		}
		if(calc_flag){
			cost_plot.cost(c_2, reg_line)

			if(cost_plot.iter > cost_plot.limit){
				c_2.noLoop();
			}

		}
		
	}

	c_2.windowResized = () => {
		c_2.resizeCanvas((c_2.windowWidth/2)*0.3, (c_2.windowWidth/2)*0.3);
		c_2.background(0);
		
	}

	c_2.reset = () => {

		reg_line.m = 0;
		reg_line.c = 0;
		cost_plot.iter = 0;
		c_2.background(0);

	}

}






let canvas_3 = (c_3) => { // CANVAS 3

	 
	c_3.setup = () =>{
		c_3.createCanvas((c_3.windowWidth/2)*0.3, (c_3.windowWidth/2)*0.3);
		c_3.background(0);

	}

	c_3.draw = () =>{

	}

	c_3.windowResized = () => {
		c_3.resizeCanvas((c_3.windowWidth/2)*0.3, (c_3.windowWidth/2)*0.3);
		c_3.background(0);
	}

}






















cnv[0] = new p5(canvas_0, 'cnv_0');
cnv[1] = new p5(canvas_1, 'cnv_1');
cnv[2] = new p5(canvas_2, 'cnv_2');
cnv[3] = new p5(canvas_3, 'cnv_3');


