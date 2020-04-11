

let cnv;// VARIABLE TO STORE DIFFERENT CANVASES
let point_array = [];
let reg_line_gradient, reg_line_differential;

//FLAGS
let cnv_0_flag = false;

let temp, x, y;
function setup() {
	temp = createCanvas(windowWidth*0.3, windowWidth*0.3);
	 x = (windowWidth - width) / 2;
	 y = (windowHeight - height) / 2;
	temp.position(x, y);

	background(0);
	reg_line_gradient = new RegressionLine("g");
	reg_line_differential = new RegressionLine("d")
	
	cnv= Array(4).fill().map( ()=> createGraphics(width/2, height/2));
	canvas_test();
	
}
	
function draw() {

	if(cnv_0_flag){
		cnv_0();
	}
	

	show_graphics();
}





// NECESSARY FOR RENDERING FO ALL THE CANVASES
const show_graphics = () => {
	image(cnv[0],0, 0);
	image(cnv[1],temp.width/2, 0);
	image(cnv[2],0, temp.height/2);
	image(cnv[3],temp.width/2, temp.height/2);
}

// TEST FUNCTION TO SET THE CANVAS TO DIFFERENT COLOR
// FOR DISTINGUISHING EASILY
const canvas_test = () => {
	
	cnv[0].background(0);
	cnv[1].background(120);
	cnv[2].background(127);
	cnv[3].background(200);
}

// MOUSE PRESSED EVENT
function mousePressed(){
	// IF MOUSE IS PRESSED ON CANVAS_0
	if(mouseX > 0 && mouseX < width/2 && mouseY > 0 && mouseY < height/2){
		let temp = new Points(mouseX, mouseY);
		cnv_0_flag = true;
		point_array.push(temp);
	}
}




// CANVAS_0 LOGIC FOR POINTS AND LINE
const cnv_0 = () => {

	cnv[0].background(0);
	
	// SHOW THE LINE WITH DIFFERENTIAL SOLUTION
	reg_line_differential.show(cnv[0], point_array);
	
	// SHOW THE LINE WITH GRADIENT DESCEND 
	reg_line_gradient.show(cnv[0], point_array);
	
	// SHOW THE POINTS
	point_array.forEach(x => x.show(cnv[0])); 
	
	
}

function windowResized() {
	// Location.reload(true);
	resizeCanvas(windowWidth*0.3, windowWidth*0.3);
	x = (windowWidth - width) / 2;
	y = (windowHeight - height) / 2;
	temp.position(x, y);
	// window.location.relode(true);
	// cnv.forEach((canvas) => {
	// 	canvas.resizeCanvas(width/2,height/2);
	// });
	// // for(let i = 0; i< 4; i++){
	// // 	cnv[i].resiz(temp.width/2, temp.height/2);
	// // }
	console.log("executed");
	location.reload(true);
}

