
let points = []
let closestpoints = []
let count = 1000;
let closecount = 50;
let minx = 0;
let miny = 0;
let maxx = 1;
let maxy = 1;
let dummy = null;
let xspeed = 3;
let yspeed = 3;

function setup(){
/* YOUR CODE GOES HERE */
    console.clear()
    createCanvas(600, 600);
    for(let i = 0; i< count; i++){
        let xval = Number(random(minx, maxx).toFixed(2));
        let yval = Number(random(miny, maxy).toFixed(2));
        
        points.push({
            x: map(xval, minx, maxx, 0, width),
            y: map(yval, miny, maxy, height, 0 ),
            xval: xval,
            yval: yval
        })
    }

    dummy = {
        x: map(0.5, minx, maxx, 0, width),
        y: map(0.5, miny, maxy, height, 0 ),
        xval: 0.5,
        yval: 0.5
    }
    
}

function draw(){
    background(0);
    
    drawPoints();
    findClosestPoints()
    dummyFunctionality();

    dummy.x += xspeed;
    dummy.y += yspeed;
    
    if(dummy.x< 10 || dummy.x >width-10){
        
        xspeed = xspeed<0?random(1,3):-random(1,3);
    }
    if(dummy.y<10 || dummy.y >height-10){
        
        yspeed = yspeed<0?random(1,3):-random(1,3);
    }
}










function drawPoints(){
    noStroke()
    fill("#05dfd7");
    points.forEach(d => {
        circle(d.x,d.y,10);
    })
}

function dummyFunctionality(){
    
    

     //DRAW CONNECTIONS
    noFill()
    stroke("#fa1616")
    strokeWeight(2)
    closestpoints.forEach(d => {
        line(dummy.x, dummy.y, points[d.index].x, points[d.index].y)
    })

      //DRAW DUMMY
      stroke(0);
      fill("#fa1616")
      circle(dummy.x, dummy.y, 20)
}



function findClosestPoints(){

    let temp = []
    points.forEach((d,i) => {
        
        let dist = Number(sqrt((dummy.x - d.x)**2 + (dummy.y - d.y)**2).toFixed(2))
        temp.push({
            dist: dist,
            index: i
        })
        
    })
    temp = temp.sort((a,b )=> a.dist - b.dist)
    
    
    closestpoints = temp.slice(0,closecount);
    
    
}