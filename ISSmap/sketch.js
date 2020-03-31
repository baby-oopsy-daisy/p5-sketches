//URL'S FOR THE APIS IN USE
let url = "https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json";
let background_image = "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,0,0,0/600x400?access_token=pk.eyJ1IjoicHJlbWplZXQiLCJhIjoiY2s4YnF5aDcxMGZjbTNlb2Fha254ODg4ciJ9.1ueZ7mTfahwJTJr8V0QGaw";

// VARIABLES TO STORER THE LATITUDE AND LONGITUDE OF THE ISS
let longitude, latitude;
let min_latitude = -90, max_latitude = 90; // RANGE OF LATITUDE
let min_longitude = -180, max_longitude = 180; // RANGE OF LONGITUDE
let curr_position, prev_position;

let flag = false;// TO INSURE THAT THE CODE INSIDE DRAW DOESN'T START BEFOR THE LOADING OF DATA THUS AVOIDING UNNECCESSARY ERRORS
let first  =true;// FOR THE FIRST API CALL TO LOAD THE ISS POSITION
let ready = false;

let bg;// STORE THE BACKGROUND IMAGE

//MANAGE THE HTML ELEMNTS
let info;//FOR DISPLAYING THE CURRENT LONGITUDE AND LATITUDE 
let par;//FOR MANAGING THE lOWER PARAGRAPH ELEMNT INSIDE THE YELLOW AREA


// MASK IS FOR THE TRANSPARENT CANVAS ON TOP OF THE DEFAULT CANVAS
//THE LINE OF TRACE IS DRAWN ON THE MASK
let mask, cnv;

// THE PRELOAD FUNCTION EXECUTES IN THE BEGINNING AND LOADS THE BACKGROUND IMG
function preload(){
	bg = loadImage(background_image);

}


function setup() {

	//CREATING AND ALLIGING THE CANVAS TO THE CENTER
	cnv = createCanvas(600, 400);
	mask  = createGraphics(600, 400);
	let x = (windowWidth - width) / 2;
	let y = (windowHeight - 500) / 2;
	cnv.position(x, y);
	mask.position(x,y);
	mask.pixelDensity(1);
	

	// MANAGING THE DOM ELEMENTS
	par = select("#div");
	par.position(0,y+425);
	par.size(windowWidth);
	info = select("#info");

	// INITIALIGING THE POSITIONS VECTOR
	curr_position = createVector(0,0);
	prev_position = createVector(0,0);


	background(bg);// THE DEFAULT BACKGROUND OF MAP
	mask.clear();// MAKING THE BACKGROUND OF THE MASK CLEAR
	
	//LOAD THE ISS DATA ONCE AND SET AN INTERVAL TO CALL IT EVERY 30 SECOND
	load();
	setInterval(load, 30000);
}


	

//LOADS THE ISS POSITION DATA FROM THE API
	
		const load = () => {
			loadJSON(url, (data) => {

			
				
			latitude = data.iss_position.latitude;
			longitude = data.iss_position.longitude;
			info.html("THE ISS is currently at : " + latitude + "°N, " + longitude + "°E");
			let x = map(longitude, min_longitude, max_longitude, 0, width);
			let y = map(latitude, min_latitude, max_latitude, height, 0);
			
			if(first){// FOR THE FIRST ITERATION
				//SET THE CURRENT AND PREVIOUS POSITIONS AS SAME
				curr_position.x =x;
				curr_position.y = y;
				prev_position.x = x; 
				prev_position.y = y;
				flag = true;
				first = !first;
			}
			else{// FOR THE ITERATIONS OTHER THAN FIRST
				// SET THE PREV AS CURRENT AND THEN UPDATE THE CURRENT POSITION

				prev_position.x = curr_position.x;
				prev_position.y = curr_position.y;
				curr_position.x = x;
				curr_position.y = y;

				// IF THE LINE CROSSES THE WIDTH
				// THEN UPDATING LIKE THIS PREVENTS A LINE BEING DRAWN ACROSS THE CANVAS
				//AS PREV WILL EQUAL TO WIDTH AND CURR WILL BE CLOSE TO 0 I.E BEGINING OF THE CANVAS
				if((prev_position.x - curr_position.x) > (width/2)){
					prev_position.x = curr_position.x;
					prev_position.y = curr_position.y;
				}

			}
			ready = true;
		});
	
	}
	



	
// THE DRAW FUNCTION EXECUTES FOREVER	
function draw(){
	
	background(bg);
	

	if(flag){
		
		// DRAW A SEMI-TRANSPARENT CIRCLE ATE THE CURRENT POSITION OF ISS
		fill(255, 40);
		stroke(255,50, 50);
		ellipse(curr_position.x, curr_position.y, 80, 80);
		

		// THE READY VARIABLE INSURES THAT 
		// THE LINE IS NOT BEING DRAWN FOR EACH ITERATION OF DRAW
		// BUT ONLY ONCE WHEN THE POSITIONS ARE UPDATED

		if(ready){
			
			mask.stroke(255, 0, 0);
			mask.strokeWeight(3);
			mask.line(prev_position.x, prev_position.y, curr_position.x, curr_position.y);
			ready = !ready;
		}
		
		image(mask, 0, 0);// DISPLAYS THE EXTRA CANVAS ON WHICH LINE IS DRAWN
		}

}





