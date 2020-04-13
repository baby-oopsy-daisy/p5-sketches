class Regression{

    constructor(){
        //THESE ARE FOR GRADIENT ALGO TO IMPROVE
        this.m  = 0;
        this.c = 0;
        this.iteraions = 0;
        // THE PARAMETER VALUES FOR THE DIFFERENTIAL ALGO ARE MADE LOCAL
        
        // console.log(this.m, this.c);

    }


    show(cnv, points, method){
        this.width = cnv.height * 0.01;

        this.points = points;
        this.calculate_parameters(cnv, method)



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
        let m = 0; let c =0;

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
        
         m = num/den;
        c = (mean_y) - (m * mean_x);
        // console.log(this.m, this.c);


        this.draw_line(m, c, cnv)

    
        
    }


    gradient(cnv){ // GRADIENT DESCENT ALGO

        
        let hypo = 0; // HYPOTHESIS
        let cost = 0; // COST FUNCTION 
        let curr_x = 0
        let temp_m = 0;
        let temp_c = 0;
        let learing_rate = 0.008; // LEARNING RATE
        this.points.forEach( (data) => {

            curr_x = data.val.x;
            hypo = ( curr_x * this.m ) + this.c;
            cost = hypo - data.val.y;
            temp_c += cost
            temp_m += (cost) * curr_x
            
        });

        this.m -= (learing_rate * temp_m);
        this.c -= (learing_rate * temp_c);
        this.iteraions++;
        this.draw_line(this.m, this.c, cnv)

    }




   
   
    draw_line(m, c, cnv){

        let x_min = 0;
        let x_max = cnv.width;
        let y_min = (x_min * m) + c
        let y_max = (x_max * m) + c
        
        x_min = cnv.map(x_min, 0, 1, 0, cnv.width);
        x_max = cnv.map(x_max, 0, 1, 0, cnv.width);
        y_min = cnv.map(y_min, 0, 1, cnv.height, 0);
        y_max = cnv.map(y_max, 0, 1, cnv.height, 0);

        cnv.stroke(255);
        cnv.strokeWeight(this.width);
        cnv.line(x_min, y_min, x_max, y_max)
    
    }


}