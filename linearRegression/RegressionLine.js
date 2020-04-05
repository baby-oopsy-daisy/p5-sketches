class RegressionLine{

    constructor(temp){
        this.flag = temp
        this.m = 0;
        this.c = 0;
        this.learningRate = 0.05;
        this.line_width = 0;
        this.set_color_width();
        // this.test = select("#test");
    }


    set_color_width(){
        if(this.flag == "d"){
            this.col = createVector(255, 255, 0);
            this.line_width = 6;
        }
        if(this.flag == "g"){
            this.col = createVector(255, 10, 100);
            this.line_width = 4;
        }
    }





    show(cnv, temp){ // TAKES THE CANVAS AND POINT ARRAY AS INPUT AND DRAWS THE FUNCTION

        // Console.log(cnv);
        this.point_arr = temp;

        if(this.flag == "d"){
            this.calculate_regression_differential();
        }
        if(this.flag == "g"){
            this.calculate_regression_gradientDescend();

        }

        let x_min = 0;
        let y_min = (this.m * x_min) + this.c;
        let x_max = 1;
        let y_max = (this.m * x_max) + this.c;

        x_min = map(x_min, 0, 1, 0, cnv.width);
        x_max = map(x_max, 0, 1, 0, cnv.width);
        y_min = map(y_min, 0, 1, cnv.height, 0);
        y_max = map(y_max, 0, 1, cnv.height, 0);
        
        // this.test.html(y_max);
        cnv.strokeWeight(this.line_width);
        cnv.stroke(this.col.x, this.col.y, this.col.z);
        cnv.line(x_min, y_min, x_max, y_max);

    }





    calculate_regression_differential(){
        let size = this.point_arr.length; 
        let mean_x = 0;
        let mean_y = 0;
        let mean_xx = 0;
        let mean_xy = 0;
        let x,y;
        for(let i = 0; i< size; i++){
            x = this.point_arr[i].value.x;
            y = this.point_arr[i].value.y;
            mean_x += x;
            mean_y += y;
            mean_xx += (x*x);
            mean_xy += (x*y);
        }

        mean_x /= size;
        mean_y /= size;
        mean_xx /= size;
        mean_xy /= size;

        let num = (mean_x * mean_y) - mean_xy;
        let den = (mean_x * mean_x) - mean_xx;

        this.m = num/den;
        this.c = mean_y - (mean_x * this.m); 
        // console.log(this.m, this.c);
    }

    calculate_regression_gradientDescend(){
        let size = this.point_arr.length; 
        let temp = 0;
        let temp_m = 0;
        let temp_c = 0;

        for(let i = 0; i< size; i++){
            
            temp = ((this.point_arr[i].value.x * this.m) + this.c) - this.point_arr[i].value.y;
            let x = this.point_arr[i].value.x;
            temp_m += (temp)*x;
            temp_c += temp;
        }

        temp_m /= size;
        temp_c /= size;

        this.m -= (this.learningRate * temp_m);
        this.c -= (this.learningRate * temp_c);


    }



}