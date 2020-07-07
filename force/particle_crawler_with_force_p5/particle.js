class PARTICLE{
    constructor(){
        this.val = 3
        this.force = createVector(Number(random(-this.val, this.val).toFixed(2)), Number(random(-this.val, this.val).toFixed(2)))
        this.r = ((this.force.x + this.force.y)/2)*10
        this.location = createVector(random(this.r, width-this.r), random(this.r, height-this.r))

    }

    display(){// SHOW THE PARTICLES
        noStroke()
        fill("#393e4680")
        circle(this.location.x, this.location.y, this.r)
    }

    resetForce(){// RESET THE FORCE AFTER SOME TIME
        this.force.x = Number(random(-this.val, this.val).toFixed(2))
        this.force.y = Number(random(-this.val, this.val).toFixed(2))
    }


}

