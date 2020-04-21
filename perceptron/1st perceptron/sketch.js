let p;
let training_set;
let timelimit = 10;
let time = 0;
let start;
let flag = false;
function setup() {
	createCanvas(500,500);
	
	training_set = new DataSet(500);
	p = new Perceptron(2);
	start = createButton("START TRAINING");
	let reset = createButton("RESET");
	// let guess = p.guess(inputs);
	// console.log(guess);
	start.mousePressed(() => {
		flag = true
	});

	reset.mousePressed(() => {
		location.reload();
	})
}


function draw() {
	background(0);

	for(let i  = 0; i < training_set.dataSet.length; i++){
		let x = training_set.dataSet[i][0];
		let  y = training_set.dataSet[i][1];
		let target = training_set.dataSet[i][2];
		
		let guess = p.guess([x,y]);
		
		// console.log("target = " ,target, " guess = ", guess);
		training_set.show(x,y,guess);

	}
	stroke(255);
	strokeWeight(2);
	line(0,height, width,0);
	
	if(flag){

		if(time> timelimit){
			time = 0;
			p.train(training_set.dataSet);
	
		}
		time++;
	}
	
}


