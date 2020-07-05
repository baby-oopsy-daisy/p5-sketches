let col, row;
let scale = 10;
let zoff = 0;
let time = 0.006;


let increment = 0.1;

let w = window.innerWidth
let h = window.innerHeight
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
