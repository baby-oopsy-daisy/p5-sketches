class Point{

    constructor(x, y, cnv){
        this.scaling_factor = 0.03; 
        this.width = cnv.width * this.scaling_factor;
        x = cnv.map(x, 0, cnv.width, 0, 1);
        y = cnv.map(y, 0, cnv.height, 1, 0);

        this.val = cnv.createVector(x, y);
        // console.log(this.location);
    }

    show(cnv){
        cnv.noStroke();
        cnv.fill(255);
        let x = cnv.map(this.val.x, 0, 1, 0, cnv.width);
        let y = cnv.map(this.val.y, 0, 1, cnv.height, 0);
        cnv.ellipse(x, y, this.width * 2);
        // console.log("executed")
    }

    recalculate_width(cnv){
        this.width = cnv.width * this.scaling_factor;
    }
}