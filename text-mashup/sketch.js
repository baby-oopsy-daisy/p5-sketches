let text; 
let message;
let preview_array;
let preview_area;
let clear_preview;

function setup() {
	// createCanvas(windowWidth, windowHeight);
	noCanvas();
	createFileInput(fileSelected);// FILE INPUT AREA

	message  = select("#message");// THE MESSAGE FOR FILE SELECTION
	preview_area = select("#preview_area"); // SELECTING THE AREA TO PREVIEW THE TEXT

	//DOM BUTTON ELEMENT SELECT
	preview_array = select("#preview");// PREVIEW BUTTON
	clear_preview = select("#Clear");// CLEAR PREVIEW BUTTON

	

	clear_preview.mousePressed(clear_Preview); // CLEAR PREVIEW BUTTON LOGIC
	preview_array.mousePressed(preview); // PREVIEW BUTTON LOGIC
	

}

const preview = () => { // PREVIEW THE TEXT
	preview_area.html(text.join(" "));
	
}

const clear_Preview = () => { // CLEAR THE PREVIEW AREA
	preview_area.html("");
}


const fileSelected = (file) => { // FILE SELECTION LOGIC
	text = file.data;
	
	if(file.type != "text" ){ // IF THE TYPE OF FILE IS TXT
		message.html("Please select a text file");	
	}
	else{ // IF FILE IS NOT TXT
		message.html("File uploaded");
		let delimiter = " !?@[].{}(),;:/-"
		
		
		text = splitTokens(text, delimiter);
			
	}
}

// function draw() {

// }