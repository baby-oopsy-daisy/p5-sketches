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

function preload(){
// 	bg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,0,0,0/600x400?access_token=pk.eyJ1IjoicHJlbWplZXQiLCJhIjoiY2s4YnF5aDcxMGZjbTNlb2Fha254ODg4ciJ9.1ueZ7mTfahwJTJr8V0QGaw");
	bg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/1/600x400?access_token=pk.eyJ1IjoicHJlbWplZXQiLCJhIjoiY2s4YnF5aDcxMGZjbTNlb2Fha254ODg4ciJ9.1ueZ7mTfahwJTJr8V0QGaw");
}

function setup() {
	// createCanvas(windowWidth, windowHeight);
	// noCanvas();
	
	createCanvas(600, 400);
	// bg.resize(width, height);
	curr_position = createVector(0,0);
	prev_position = createVector(0,0);
	background(bg);
}


	

	// setInterval(
		const load = () => {
			loadJSON(url, (data) => {
			latitude = map(data.iss_position.latitude, min_latitude, max_latitude, height, 0);
			longitude = map(data.iss_position.longitude, min_longitude, max_longitude, 0, width);
			flag = true;
			if(first){
				curr_position.x =longitude;
				curr_position.y = latitude;
				prev_position.x = longitude; 
				prev_position.y = latitude;

				first = !first;
			}
			else{

				prev_position.x = curr_position.x;
				prev_position.y = curr_position.y;
				curr_position.x = longitude;
				curr_position.y = latitude;

				if((prev_position.x - curr_position.y) > (width/2)){
					prev_position.x = curr_position.x;
					prev_position.y = curr_position.y;
				}

			}
			// console.log(longitude, latitude);
		});
	
	}
	// , 120000);

	

	
function draw(){
	// background(bg);
	if (count >= 5000){
	load();
	count = 0;
	}

	if(flag){
		stroke(255, 0, 0);
		strokeWeight(3);
		line(prev_position.x, prev_position.y, curr_position.x, curr_position.y);	
		
	}
	count += 1;
}



