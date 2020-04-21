class DataSet{

    constructor(n){
        this.radius = 5;
        this.dataSet = []
        for(let i = 0; i<n ; i++){
            let  y = map(random(height), 0, height,1, 0);
            let x = map(random(width), 0 ,width, 0, 1);
            
            if(y > x){ this.dataSet.push([x,y,1]); }
            else if( y< x){ this.dataSet.push([x,y,-1])}
        }

    }

    show(x,y, target){

        strokeWeight(1);
        
        noFill();
        // this.dataSet.forEach( (curr) => {
            x = map(x, 0, 1, 0, width);
            y = map(y, 0, 1, height, 0);
            if(target == 1){
                stroke(255,255,0);
                rect(x,y,this.radius*2, this.radius*2);
            }
            else{
                stroke(255,0,0);
                ellipse(x,y,this.radius*2);
            }
        // });
    }

}