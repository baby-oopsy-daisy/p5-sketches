let d;




function setup() {
	createCanvas(windowWidth, windowHeight);

}

const loaded = (data) => {
	
	d = data;
	// for(let i = 0; i< data.number; i++){
	// 	fill(255);
	// 	ellipse(random(width), random(height), 16*2);
	// }
}

function draw(){
	background(0);
	loadJSON("http://api.open-notify.org/astros.json", loaded, "JSONP");
	

	randomSeed(60);
	if(d){
		textSize(100);
		fill(255);
		text(d.number, width/2 ,100);
		for(let i = 0; i < d.number; i++){
			let x = random(200, width-200);
			let y =  random(200, height-200);
			fill(255);
			ellipse(x, y, 200);
			show_text(x, y, i);

		}
	}
	
	
}	

const show_text = (x, y, i) => {
	fill(0);
	textSize(40);
	text(d.people[i].craft, x-30, y);
	textSize(16);
	text(d.people[i].name, x-50, y+40);
}