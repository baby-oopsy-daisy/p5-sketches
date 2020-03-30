let url = "https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json";
let longitude, latitude;
let min_latitude = -90, max_latitude = 90;
let min_longitude = -180, max_longitude = 180;
let curr_position, prev_position;
let flag = false;
let first  =true;
let data;
let bg;
let count = 10000;
let info;
let par;
let x, y;


let mask, cnv;

function preload(){
	bg = loadImage("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,0,0,0/600x400?access_token=pk.eyJ1IjoicHJlbWplZXQiLCJhIjoiY2s4YnF5aDcxMGZjbTNlb2Fha254ODg4ciJ9.1ueZ7mTfahwJTJr8V0QGaw");

}

function setup() {

	//ALLIGNS THE CANVAS TO THE CENTER
	cnv = createCanvas(600, 400);
	mask  = createGraphics(600, 400);
	
	par = select("#div");
	x = (windowWidth - width) / 2;
	y = (windowHeight - 500) / 2;
	cnv.position(x, y);
	mask.position(x,y);
	mask.pixelDensity(1);
	


	par.position(0,y+425);
	par.size(windowWidth);
	info = select("#info");
	curr_position = createVector(0,0);
	prev_position = createVector(0,0);
	background(bg);
	mask.clear();
	
}


	

	
		const load = () => {
			loadJSON(url, (data) => {

			info.html("THE ISS is currently at : " + data.iss_position.latitude + "°N, " + data.iss_position.longitude + "°E");
				
			latitude = map(data.iss_position.latitude, min_latitude, max_latitude, height, 0);
			longitude = map(data.iss_position.longitude, min_longitude, max_longitude, 0, width);
			
			if(first){
				curr_position.x =longitude;
				curr_position.y = latitude;
				prev_position.x = longitude; 
				prev_position.y = latitude;
				flag = true;
				first = !first;
			}
			else{

				prev_position.x = curr_position.x;
				prev_position.y = curr_position.y;
				curr_position.x = longitude;
				curr_position.y = latitude;

				if((prev_position.x - curr_position.x) > (width/2)){
					prev_position.x = curr_position.x;
					prev_position.y = curr_position.y;
				}

			}
			
		});
	
	}
	


let currX = 10, currY=100, prevY = 100, prevX =0;
	
function draw(){
	
	background(bg);
	
	if (count >= 5000){
	load();
	count = 0;
	}

	if(flag){

		fill(255, 40);
		stroke(255,50, 50,);
		ellipse(curr_position.x, curr_position.y, 80, 80);

		mask.stroke(255, 0, 0);
		mask.strokeWeight(3);
		mask.line(prev_position.x, prev_position.y, curr_position.x, curr_position.y);
		image(mask, 0, 0);
		
		
	}
	count += 1.5;




	//Extra for testing the create grapics
	// 			fill(255, 40);
	// 	stroke(255,50, 50,);
	// 	ellipse(currX, currY, 45, 45);
	
	// 	mask.stroke(255, 0, 0);
	// 	mask.strokeWeight(3);
	// 	mask.line(prevX, prevY, currX, currY);
	// 	image(mask, 0, 0);

	// prevx =currX;
	
	// currX += 1;



}





