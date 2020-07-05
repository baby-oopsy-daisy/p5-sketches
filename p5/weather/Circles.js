class Circles{
    constructor(x, y){
        this.r = 100; 
        this.x = x;
        this.y = y;
          
    }

    show(data, msg){
        fill(255);
        ellipse(this.x, this.y, this.r);
        // translate(this.x, this.y);
        strokeWeight(3);
        fill(0);
        text(msg , this.x-30, this.y);
        fill(255,0,0);
        text(data , this.x-10, this.y+20);
    }
}