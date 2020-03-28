let url = "https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json";
let longitude, latitude;
let min_latitude = -90, max_latitude = 90;
let min_longitude = -180, max_longitude = 180;
let curr_position, prev_position;
let flag = false;
let first  =true;
let data;


function setup() {
	// createCanvas(windowWidth, windowHeight);
	// noCanvas();
	createCanvas(400, 400);
	curr_position = createVector(0,0);
	prev_position = createVector(0,0);
	background(0);
}


function draw() {
	

	setInterval(() => {
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
			}
			// console.log(longitude, latitude);
		});
	
	}, 10000);

	if(flag){
		stroke(255);
		line(prev_position.x, prev_position.y, curr_position.x, curr_position.y);
	}


}