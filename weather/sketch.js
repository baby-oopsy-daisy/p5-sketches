let place;
let submit_button;
let data;
let preview_area;
let circles = [];
let flag = false;

let LOCATION;
let address = "http://api.openweathermap.org/data/2.5/weather?units=metric&q="; 
let key = "&APPID=6241ebfbdd4e8731ae8e6099750d4f33";
let url;


function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(500, 500);

	circles[0] = new Circles(150, 150);
	circles[1] = new Circles(400, 150);
	circles[2] = new Circles(200, 400);
	
	// noCanvas();
	place = select("#location");
	submit_button = select("#submit");
	preview_area = select("#preview_area");


	submit_button.mousePressed(() => {
				LOCATION = place.value();
				

				url = address+LOCATION+key;
				loadJSON(url, (incoming_data) => {
					data = incoming_data;
					flag = true;
					preview_area.html(data.main.temp + "°C");
				});
		// loadJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=6241ebfbdd4e8731ae8e6099750d4f33", data_loaded);
	});


}



function draw() {
	background(0, 100, 0);

	if(data){
		circles[0].show(data.main.humidity, "humidity");
		circles[1].show(data.main.temp_min, "min_temp");
		circles[2].show(data.main.temp_max, "max_temp");
	}

}
