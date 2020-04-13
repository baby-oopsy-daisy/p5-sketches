class Point{

    constructor(x, y, cnv){
        this.scaling_factor = 0.03; 
        
        x = cnv.map(x, 0, cnv.width, 0, 1);
        y = cnv.map(y, 0, cnv.height, 1, 0);

        this.val = cnv.createVector(x, y);
        // console.log(this.location);
    }

    show(cnv){
        let width = cnv.width * this.scaling_factor;
        cnv.fill(255, 40);
        cnv.stroke(255);
        cnv.strokeWeight(0.8);
        let x = cnv.map(this.val.x, 0, 1, 0, cnv.width);
        let y = cnv.map(this.val.y, 0, 1, cnv.height, 0);
        cnv.ellipse(x, y, width * 2);
        // console.log("executed")
    }


}