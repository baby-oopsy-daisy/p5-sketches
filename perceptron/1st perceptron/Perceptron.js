class Perceptron{

    constructor(n){
        this.radius = 5;
        this.weight = []
        // INITIALIZE THE WEIGHTS RANDOMLY
        for(let i = 0; i< n; i++){
            this.weight.push(random(-1,1))
        }
    }

    //GUES THE OUT PUT
    guess(inputs){
        let sum = 0;
        for(let i = 0; i< this.weight.length; i++){
            sum += (inputs[i] * this.weight[i]);
        }
        return  activation_function(sum);
    }

    train(inputs){ // [ [x,y,label] ....]
        let x,y,target;
        let l_rate = 0.03;
        let gradient = new Array(this.weight.length).fill(0)
        
        let temp = 0
        
        for(let i = 0; i< inputs.length; i++){
            
            x = inputs[i][0];
            y = inputs[i][1];
            target = inputs[i][2];
            temp = (this.guess([x,y]) - target)

           


            gradient[0] += (temp*x);
            gradient[1] += (temp*y);
            
        }
        for (let i = 0; i< this.weight.length; i++){
            this.weight[i] -= ((gradient[i] * l_rate)/ inputs.length);
        }
       

    }
    
}

// ACTIVATION FUNCTION
//RETURNS 1 FOR INPUT > 0
//RETURNS -1 FOR INPUT <  0
const activation_function = z => {
    let e = 2.71;
    let g = 1/ (1 + Math.pow(e,-z))
    // console.log(g);
    return g>0.5?1:-1;
}
