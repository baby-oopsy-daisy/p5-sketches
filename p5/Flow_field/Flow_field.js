let col, row;
let scale = 10;
let zoff = 0;
let time = 0.006;


let increment = 0.15;

let w = window.innerWidth*0.80
let h = window.innerHeight*0.80
function setup() {
  createCanvas(w,h);

  col = floor(w/scale);
  row = floor(h/ scale);
}

function draw() {
  background(255);
  let yoff = 0;

  for (let y = 0; y < row; y++) {
    let xoff = 0;
    for (let x = 0; x <col; x++) {
      let angle = noise(xoff, yoff, zoff)*TWO_PI;

      push();

      translate(x*scale, y*scale);
      rotate(angle);
      line(0, 0, 0, scale);
      pop();

      xoff += increment;
    }
    yoff += increment;
  }
  zoff += time;


  
}

function resetSpeed(){
  let slider = document.getElementById("slider")
  
  let div = (width+height)/10
  time = slider.value/div
  
  
  
}