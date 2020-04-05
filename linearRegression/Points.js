class Points{
    constructor(x,y){
        
        this.location = createVector(x,y); 
        this.value = createVector(0,0);
       
    
    }

    show(cnv){
        this.value.x = map(this.location.x, 0, cnv.width, 0, 1);
        this.value.y = map(this.location.y, 0, cnv.height, 1, 0);
        cnv.strokeWeight(5);
        cnv.stroke(255);
        cnv.point(this.location.x, this.location.y);

    }

}