class CostPlot{

    constructor(points, cnv){
        this.prev = points.length;
        this.limit = 1000;
        this.col = cnv.createVector(cnv.random(255), cnv.random(255), cnv.random(255));
        
    }

    show(points, reg_line, cnv){
        this.points = points;
        
        if(points.length > this.prev){
            
            reg_line.iteraions = 0;
            cnv.background(0);
            reg_line.m = 0;
            reg_line.c = 0;
            this.col.x = cnv.random(255);
            this.col.y = cnv.random(255);
            this.col.z = cnv.random(255);
            this.prev = points.length;
        }

        this.calculate_cost(reg_line)
        console.log(this.cost/points.length);

        let x = cnv.map(reg_line.iteraions, 0, this.limit, 5, cnv.width)
        let y = cnv.map(this.cost/points.length, 0, 0.5, cnv.height, 0);

        
        cnv.strokeWeight(cnv.height * 0.03);
        cnv.stroke(this.col.x, this.col.y, this.col.z);
        cnv.point(x, y);

    }

    calculate_cost(reg_line){

        let hypo = 0;
        this.cost = 0;
        let x; let y;
        let m; let c;
        this.points.forEach( data => {
            
            x = data.val.x;
            y = data.val.y;
            m = reg_line.m;
            c = reg_line.c
            hypo = (m*x) + c
            this.cost += Math.pow(hypo - y, 2)

        });



    }


}