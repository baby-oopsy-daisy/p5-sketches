class Regression{

    constructor(){
        this.m  = 0;
        this.c = 0;
        
        // console.log(this.m, this.c);

    }


    show(cnv, points, method){
        let width = cnv.height * 0.01;

        this.points = points;
        this.calculate_parameters(cnv, method)

        let x_min = 0;
        let x_max = cnv.width;
        let y_min = (x_min * this.m) + this.c
        let y_max = (x_max * this.m) + this.c
        
        x_min = cnv.map(x_min, 0, 1, 0, cnv.width);
        x_max = cnv.map(x_max, 0, 1, 0, cnv.width);
        y_min = cnv.map(y_min, 0, 1, cnv.height, 0);
        y_max = cnv.map(y_max, 0, 1, cnv.height, 0);

        cnv.stroke(255);
        cnv.strokeWeight(width);
        cnv.line(x_min, y_min, x_max, y_max)

    }

    calculate_parameters(cnv, method){
        if(method == "g"){this.gradient(cnv)}
        if(method == "d"){this.differential(cnv)}

    }

    differential(cnv){
        let mean_x = 0;
        let mean_y = 0;
        let mean_xx = 0
        let mean_xy = 0;
        let x = 0;
        let y = 0;
        let den = 0;
        let num = 0;

        for(let i = 0; i< this.points.length; i++){

            x = this.points[i].val.x;
            y = this.points[i].val.y;
            mean_x += x;
            mean_y += y;
            mean_xx += (x*x);
            mean_xy += (x*y);
        }

        mean_x /= this.points.length;
        mean_y /= this.points.length;
        mean_xx /= this.points.length;
        mean_xy /= this.points.length; 

        num = (mean_x * mean_y) - (mean_xy);
        den = (mean_x * mean_x) - (mean_xx);
        
        this.m = num/den;
        this.c = (mean_y) - (this.m * mean_x);
        // console.log(this.m, this.c);


    }

    gradient(cnv){

    }





}