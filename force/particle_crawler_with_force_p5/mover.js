class MOVER{
    constructor(x , y){
        this.range = 2
        this.force = createVector(Number(random(-this.range, this.range).toFixed(2)), Number(random(-this.range, this.range).toFixed(2)))
        this.r = ((Math.abs(this.force.x) + Math.abs(this.force.y)))*5;
        this.closest = null;
        this.location = createVector( x==undefined?random(this.r, width-this.r):x , y==undefined?random(this. r, height-this.r):y);
        this.color = createVector(random(2,224), random(2,224), random(2,224))
    }
    
    display(){ // SHOW THE MOVER
        stroke(0);
        fill(this.color.x, this.color.y, this.color.z, 100);
        circle(this.location.x, this.location.y, this.r);
    }

    findClosest(p, m, count){ //FIND THE CLOSEST POINTS TO MOVER
        count = Math.max(2,count)
        this.closest = [];

        p.forEach(e =>{
            let x1 = this.location.x; 
            let y1 = this.location.y;
            let x2 = e.location.x;
            let y2 = e.location.y;

            let dist = Math.sqrt( (x1-x2)**2 + (y1-y2)**2 )
            this.closest.push({
                data: e,
                dist: dist
            })
        })
        m.forEach(e =>{
            let x1 = this.location.x; 
            let y1 = this.location.y;
            let x2 = e.location.x;
            let y2 = e.location.y;

            let dist = Math.sqrt( (x1-x2)**2 + (y1-y2)**2 )
            this.closest.push({
                data: e,
                dist: dist
            })
        })

        this.closest = this.closest.sort((a,b) => a.dist-b.dist).slice(0, count)
    }

    drawLineToClosest(){// DRAW LINE TO THE CLOSEST  
        noFill()
        stroke("#6a197d30")
        strokeWeight(1)
        this.closest.forEach(e => {
            let x1 = this.location.x; 
            let y1 = this.location.y;
            let x2 = e.data.location.x;
            let y2 = e.data.location.y;
            line(x1,y1,x2,y2)
        })
    }

    move(){// MOVE THE MOVER

        this.check();
        this.location = this.location.add(this.force);
    }

    calculateForce(){ // CALCULATE THE RESULTANT FORCE
        
        this.closest.forEach(e => {
            this.force.add(e.data.force)
        })
        this.force.normalize()
        
    }


    check(){ // CHECK IF THE MOVER LEAVES THE CANVAS
        
        if(this.location.x <this.r || this.location.y <this.r || this.location.x > (width+this.r) || this.location.y>(height+this.r)){
            this.location = createVector(random(this.r, width-this.r), random(this.r, height-this.r))
            this.force.x = Number(random(-this.range, this.range).toFixed(2));
            this.force.y = Number(random(-this.range, this.range).toFixed(2));
        }
    }

    resetForce(){// RESET THE FORCE AFTER SOME TIME
        this.force.x = Number(random(-this.range, this.range).toFixed(2));
        this.force.y = Number(random(-this.range, this.range).toFixed(2));
    }
}