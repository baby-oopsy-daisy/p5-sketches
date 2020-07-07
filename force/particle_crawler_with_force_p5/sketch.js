
let particleCount = 200, particles;
let moversCount = 20, movers;
let closeCount = 10;

function setup(){
/* YOUR CODE GOES HERE */
    console.clear();
    createCanvas(600, 600);
    particles = new Array(particleCount).fill(0).map(d => new PARTICLE())
    movers = new Array(moversCount).fill(0).map(d => new MOVER())
    
}

setInterval(() => {
    
    
    particles.forEach(e => {
        e.resetForce();
    })
    movers.forEach(e => {
        e.resetForce()
    })

}, 3000);

function draw(){
    background("#ffeadb80");

    
    movers.forEach(e =>{//FIND AND DRAW LINE TO CLOSEST
        e.findClosest(particles, movers, closeCount);
        e.drawLineToClosest();
        e.calculateForce();
        e.move();
    })

    particles.forEach(e => {
        e.display();    
    });
    movers.forEach(e => {
        e.display();
    })

}