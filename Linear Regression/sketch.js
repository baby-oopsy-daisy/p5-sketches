



let cnv = Array(4).fill();
let points = []



let canvas_0 = (c_0) => { // CANVAS 0

	 
	c_0.setup = () =>{
		c_0.createCanvas((c_0.windowWidth/2)*0.3, (c_0.windowWidth/2)*0.3);
		c_0.background(0);
	}

	c_0.draw = () =>{
		c_0.background(0);
		if(points.length > 0){
			points.forEach( (x) => x.show(c_0));
		}

	}

	c_0.mousePressed = () => {
		if(c_0.mouseX > 0 && c_0.mouseX < c_0.width && c_0.mouseY >0 && c_0.mouseY <c_0.height){
			let temp = new Point(c_0.mouseX, c_0.mouseY, c_0);
			points.push(temp); 
		}


	}

	c_0.windowResized = () => {
		c_0.resizeCanvas((c_0.windowWidth/2)*0.3, (c_0.windowWidth/2)*0.3);
		c_0.background(0);
		points.forEach( (x) => {
			x.recalculate_width(c_0)
			
		});
	}

}



let canvas_1 = (c_1) => { // CANVAS 1

	 
	c_1.setup = () =>{
		c_1.createCanvas((c_1.windowWidth/2)*0.3, (c_1.windowWidth/2)*0.3);
		c_1.background(100);
	}

	c_1.draw = () =>{

	}

	c_1.windowResized = () => {
		c_1.resizeCanvas((c_1.windowWidth/2)*0.3, (c_1.windowWidth/2)*0.3);
		c_1.background(0);
	}

}






let canvas_2 = (c_2) => { // CANVAS 2

	 
	c_2.setup = () =>{
		c_2.createCanvas((c_2.windowWidth/2)*0.3, (c_2.windowWidth/2)*0.3);
		c_2.background(51);
	}

	c_2.draw = () =>{

	}

	c_2.windowResized = () => {
		c_2.resizeCanvas((c_2.windowWidth/2)*0.3, (c_2.windowWidth/2)*0.3);
		c_2.background(0);
	}

}






let canvas_3 = (c_3) => { // CANVAS 3

	 
	c_3.setup = () =>{
		c_3.createCanvas((c_3.windowWidth/2)*0.3, (c_3.windowWidth/2)*0.3);
		c_3.background(200);
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


