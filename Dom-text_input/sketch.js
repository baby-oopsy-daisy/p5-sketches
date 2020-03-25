let button;
let text;
let paragraph_element; 
function setup() {
	// createCanvas(windowWidth, windowHeight);
	noCanvas();
	button = select("#submit");
	paragraph_element = select("#par");
	text = createInput(); 

	button.mousePressed(submitted);
}

const submitted = () =>{
	paragraph_element.html(text.value());
}
// function draw() {

// }