// pclass: A proxy for socio-economic status (SES)
// 1st = Upper
// 2nd = Middle
// 3rd = Lower

// age: Age is fractional if less than 1. If the age is estimated, is it in the form of xx.5

// sibsp: The dataset defines family relations in this way...
// Sibling = brother, sister, stepbrother, stepsister
// Spouse = husband, wife (mistresses and fiancés were ignored)

// parch: The dataset defines family relations in this way...
// Parent = mother, father
// Child = daughter, son, stepdaughter, stepson
// Some children travelled only with a nanny, therefore parch=0 for them.




let column = new Map();




async function setup(){

	await prepareData(); // WAIT TILL  DATA IS BEING PREPARED

	
	//  CHARTS
	
	AGE_COUNT(); // AGE PLOT
	CLASS_COUNT(); // PLOT THE CLASS COUNT
	SURVIVAL_COUNT(); // SRVIVED V/S DEAD
	SURVIED_PER_CLASS (); // SURVIVED PER cLASS
	ON_BOARD_DATA();
}





// PLOT AGE
const AGE_COUNT = () => {

	const age = [...column.get("Age")]
	let count = new Map()

	age.forEach( (x) => { // COUNT THE NUMBER OF PEOPLE WITH DIFFERENT AGE'S
		if( count.has(x) ){
			count.set(x, count.get(x) + 1)
		}
		else{
			count.set(x,1);
		}
	});

	let temp = [...count];
	temp.sort((a,b) => a[0]-b[0]);
	count = new Map(temp);

	let graph = document.getElementById('ageCount');
	let chart = new Chart(graph, {
		// The type of chart we want to create
		type: "bar",
	
		// The data for our dataset
		data: {
			labels: [...count.keys()],
			datasets: [{
				label: 'AGE COUNT',
				backgroundColor: '#3e95cd',
				
				data: [...count.values()],

			}]
		},
	
		// Configuration options go here
		options: {
			legend:{
				display: false,
			},
			title:{
				display: true,
				text: 'COUNT OF DIFFERENT AGE GROUP',
				fontSize: 24,
				
				
			},
			scales: {
				yAxes: [{
					ticks: {
						fontSize: 24
					}
				}],
				xAxes: [{
					ticks: {
						fontSize: 24
					}
				}]
			},
			

		}	
	}); 


}



// PLOT CLASS
const CLASS_COUNT = () => {
	const Class = [...column.get("Pclass")]
	let count = new Map()

	Class.forEach( (x) => { // COUNT THE PEOPLE IN DIFFERENT CLASSES
		if( count.has(x) ){
			count.set(x, count.get(x) + 1)
		}
		else{
			count.set(x,1);
		}
	});

	let temp = [...count];
	temp.sort((a,b) => a[0]-b[0]);
	count = new Map(temp);

	let graph = document.getElementById('pClassCount');

	let chart = new Chart(graph, {
		// The type of chart we want to create
		type: "horizontalBar",
	
		// The data for our dataset
		data: {
			labels: ["class 1", "class 2", "class 3"],//...count.keys()],
			datasets: [{
				label: 'CLASS COUNT',
				backgroundColor: ['rgb(255,25,0)',
								'rgb(127, 127,127)',
								'rgb(255, 99, 132)'],
				
				data: [...count.values()]
			}]
		},
	
		// Configuration options go here
		options: {
			title: {
				display: true,
				text: 'PASSANGER COUNT FOR DIFFERENT CLASS',
				fontSize: 24
			},

			legend: {
				display: false,
				
			},
			scales: {
				yAxes: [{
					ticks: {
						fontSize: 24
					}
				}],
				xAxes: [{
					ticks: {
						fontSize: 24
					}
				}]
			}

			}
		
	}); 


}



// PIECHART OF SURVIVED V/S DIED
const SURVIVAL_COUNT = () =>{

	let survived = 0, died = 0;
	column.get("Survived").forEach((x) => x == 1? survived++:died++)
	

	let graph = document.getElementById("survivalCount");
	let chart = new Chart(graph, {
		// The type of chart we want to create
		type: "pie",
	
		// The data for our dataset
		data: {
			labels: ["SURVIVED", "DIED"],
			datasets: [{
				
				backgroundColor: [ "#8e5ea2","#3cba9f"],
				
				data: [survived, died]
			}]
		},
	
		// Configuration options go here
		options: {
			legend:{
				display: true,
				labels: {
						
					fontSize: 15,
					
				},
				position: "top"
				
			},
			title:{
				display: true,
				text: 'SURVIVED v/s DIED',
				fontSize: 24,
				
				
			},

		}
			
	})

}

//SURVIVED OR DEAD IN EACH CLASS
const SURVIED_PER_CLASS = () =>{

	let survival = column.get("Survived");
	let CLASS = column.get("Pclass");

	let count = { 1:{survived:0, died:0, count:0}, 
				  2:{survived:0, died:0, count:0} , 
				  3:{survived:0, died:0, count:0}
				};
	for(let i = 0;i < survival.length;i++){

		let curr_class = CLASS[i]
		switch(curr_class){

			case 1:
				count[1].count++;
				survival[i]?count[1].survived++:count[1].died++;
				break;
			case 2:
				count[2].count++;
				survival[i]?count[2].survived++:count[2].died++;
				break;
			case 3:
				count[3].count++;
				survival[i]?count[3].survived++:count[3].died++;
				break;	
		}
	}	
	
	let graph = document.getElementById("survivalEachClass") 
	let chart = new Chart(graph, {
		// The type of chart we want to create
		type: "bar",
	
		// The data for our dataset
		data: {
			labels: ["CLASS 1", "CLASS 2", "CLASS 3"],
			datasets: [
				{
				label: "PASSANGER COUNT",
				backgroundColor: "#3e95cd",
				
				data: [count[1].count, count[2].count, count[3].count]
				},
				{
					label: 'SURVIVED',
					backgroundColor: "#8e5ea2",
					
					data: [count[1].survived, count[2].survived, count[3].survived]
				},
				{
					label: 'DIED',
					backgroundColor: "#3cba9f",
					
					data: [count[1].died, count[2].died, count[3].died]
				},

		]
		},
	
		// Configuration options go here
		options: {
			legend:{
				display: true,
				labels: {
						
					fontSize: 15,
					
				},
				position: "right"
				
			},
			title:{
				display: true,
				text: 'CLASS WISE SURVIVAL',
				fontSize: 24,
				
			},
			scales: {
				yAxes: [{
					ticks: {
						fontSize: 24
					}
				}],
				xAxes: [{
					ticks: {
						fontSize: 24
					}
				}]
			}
		}	
	})
}

//LOCATION DAAT
const ON_BOARD_DATA = () => {

	let CLASS = column.get("Pclass")
	let survival =  column.get("Survived")
	let location  = column.get("Embarked")

	let count = {	"S" : {"class":{1:0, 2:0, 3:0}, "survival":{"survived":0, "died":0}, "count":0},
					"C" : {"class":{1:0, 2:0, 3:0}, "survival":{"survived":0, "died":0}, "count":0}, 
					"Q" : {"class":{1:0, 2:0, 3:0}, "survival":{"survived":0, "died":0}, "count":0} 
			}

	for(let i = 0; i<location.length; i++){

		let curr = location[i];
		switch(curr){

			case "S" :
				count.S.count++;
				survival[i]?count.S.survival.survived++:count.S.survival.died++;
				count.S.class[CLASS[i]]++;
				break;
				
			case "C" :
				count.C.count++;
				survival[i]?count.C.survival.survived++:count.C.survival.died++;
				count.C.class[CLASS[i]]++;
				break;

			case "Q" :
				count.Q.count++;
				survival[i]?count.Q.survival.survived++:count.Q.survival.died++;
				count.Q.class[CLASS[i]]++;
				break;



		}
	}	
	
	let graph = document.getElementById("embarked");
	let chart = new Chart(graph, {
			// The type of chart we want to create
			type: "horizontalBar",
	
			// The data for our dataset
			data: {
				labels: ["Southampton", "Cherbourg", "Queenstown"],
				datasets: [
					{
					label: "PASSANGER COUNT",
					backgroundColor: "#3e95cd",
					
					data: [count.S.count, count.C.count, count.Q.count]
					},
					{
						label: 'SURVIVED',
						backgroundColor: "rgb(255,165,0)",
						
						data: [count.S.survival.survived, count.C.survival.survived, count.Q.survival.survived]
					},
					{
						label: 'DIED',
						backgroundColor: "#rgb(0,0,0)",//"#3cba9f"
						
						data: [count.S.survival.died, count.C.survival.died, count.Q.survival.died]
					},
					{
						label: 'CLASS_1',
						backgroundColor: "rgb(212,175,55)",
						
						data: [count.S.class[1], count.C.class[1], count.Q.class[1]]
					},
					{
						label: 'CLASS_2',
						backgroundColor: "#C0C0C0",
						
						data: [count.S.class[2], count.C.class[2], count.Q.class[2]]
					},
					{
						label: 'CLASS_3',
						backgroundColor: "rgb(205, 127, 50)",
						
						data: [count.S.class[3], count.C.class[3], count.Q.class[3]]
					},

	
			]
			},
		
			// Configuration options go here
			options: {
				legend:{
					display: true,
					labels: {
						
						fontSize: 15,
						
					},
					position: "right"
					
				},
				title:{
					display: true,
					text: 'LOCATION DATA',
					fontSize: 24
				},
				scales: {
					yAxes: [{
						ticks: {
							fontSize: 24
						}
					}],
					xAxes: [{
						ticks: {
							fontSize: 24
						}
					}],
					

				}
			}	


	})

}













































async function prepareData(){

	await getData();

	async function getData(){

		try {
			// FETCH THE CSV FILE
			const response = await fetch("train.csv");
			const table = await response.text();
			let data = table.split("\n")
	
			// CREAET A MAP TO STORE THE COLUMNS
			
			let lable = data.slice(0,1);// EXTRACT THE COLUMN NAMES
			lable = lable[0].split("\r");
			lable = lable[0].split(",");
			lable = [...lable.slice(1,3), ...lable.slice(4)]
			lable.forEach((x) => column.set(x,[]));
	
			
	
			data = data.slice(1);// REMOVE THE FIRST ROW THAT CONTAIN THE LABLE
			
			//PREPARE THE DATA
			for(let i = 0; i< data.length; i++){
				
				// TAKE EACH ROW AND SPLIT IT IN INDOVIDUAL INFO.
				let temp = data[i].split("\r");
				temp  = temp[0].split(",");// SPLIT THE LABLES
				temp = [...temp.slice(1,3), ...temp.slice(5)];// REMOVE THE INDEX AND NAME COLUMN
				
				//INSERT EACH COLUMN IN THERE RESPECTIVE MAP KEYS
				for(let i = 0; i< lable.length; i++){
					column.set(lable[i], [...column.get(lable[i]),temp[i]]);
				}
				
			}
			convertStringToNumber(); //CONVERT ALL THE COLUMNS WITH STRING AS NUMBER
			fillZeros();
		}
		
		catch (e){
			console.log(e);
		}
	
		
		function convertStringToNumber(){
					
			const index = [0, 1, 3, 4, 5, 7,];
			const label = [...column.keys()];
			// console.log(lable);
			for(let i = 0; i< index.length; i++){
				column.set( (label[index[i]]), [...column.get((label[index[i]]))].map((x) => Number(x)));

			}
		}

		function fillZeros(){

			let age = [...column.get("Age")];
			let fare = [...column.get("Fare")]
			let avg_age = Math.floor(math.mean(age));
			let avg_fare = math.mean(fare)
			
			for(let i = 0; i< age.length; i++){

				if(age[i] == 0){ age[i] = avg_age;}
				if(fare[i] == 0){ fare[i] = avg_fare;}

			}
			column.set("Age", age);
			column.set("Fare", fare);

		}

	}

}




