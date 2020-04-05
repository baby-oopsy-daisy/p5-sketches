let text_area;
let submit_button;
let gif_button;
let pic

let data;
let url = "https://api.giphy.com/v1/stickers/search?api_key=PCs7CvsKJ2wfcU0qPHyUaOOEBAxdn86H&limit=1&offset=0&rating=G&lang=en&q=";
// let url = "https://api.giphy.com/v1/gifs/search?api_key=PCs7CvsKJ2wfcU0qPHyUaOOEBAxdn86H&s=";

let gif_file;
let gif_arr = [];
let reset_button;
let arr;


function setup() {
	// createCanvas(windowWidth, windowHeight);
	text_area = select("#data");
	submit_button = select("#submitButton");
	gif_button = select("#loadGif");
	reset_button = select("#reset");
	pic = select("#pic");

	submit_button.mousePressed(() => { 	// SUBMIT BUTTON
		data = text_area.value();
		console.log(data);
		arr = data.split(" ").join("+");
		// arr = data.split("");
	})

	gif_button.mousePressed(gifify); // GIFIFY BUTTON

	reset_button.mousePressed(() => {	// RESET BUTTON
		gif_arr = [];
		text_area.value("");
		location.reload();
	});
}

const gifify = () => {
	// for(let i =0; i<arr.length; i++){
	// 	load_gif(arr[i]);
	// }
	load_gif(arr);
}

const load_gif = (x) => {
	let temp_url = url + x;
	// loadJSON(temp_url, (loaded_data) => {
	// 	gif_file = loaded_data;
	// 	console.log("loaded");
	// 	show_img();
	// });
	// fetch(temp_url).then((loaded_data) => {
	// 	gif_file = loaded_data;
	// 	console.log("loaded");
	// });


	fetch(temp_url)
		.then(

			response => {
				// console.log(response);
				return response.json();
			}

		)
		.then(

			myJSON => {

				console.log(myJSON);
				temp = createElement("img", "this is a test img");
				pic.child(temp);
				temp.attribute("src", myJSON.data[0].images.original.webp);
				temp.attribute("height", "100");
				temp.attribute("width", "100");

			}

		)
		.catch(
			err => {
				console.log(err);
				console.log(temp_url);
			}
		);

};




