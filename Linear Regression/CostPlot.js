class CostPlot{

  constructor(){
      this.iter = 0;
      this.limit = 200;
      
  }

  show(cnv, points){

    this.points = points;

    }

  cost(cnv, reg_line){
    this.iter++;
    let cost = 0;
    let m = reg_line.m;
    let c = reg_line.c;
    let hypo;
    this.points.forEach(data => {
      hypo = m*data.val.x + c;
      hypo = Math.pow(hypo-data.val.y, 2);
      cost += hypo;
      });
      cost /= (2*this.points.length);

      this.draw_point(cnv, cost)
  }

  draw_point(cnv, cost){
    let x = cnv.map(this.iter, 0, this.limit, cnv.width*0.09, cnv.width);
    let y = cnv.map(cost, 0, 0.1, cnv.height, 0)
    // console.log(cost);
    cnv.stroke(255);
    cnv.strokeWeight(cnv.width*0.009);
    cnv.point(x, y);
    
  }


}

