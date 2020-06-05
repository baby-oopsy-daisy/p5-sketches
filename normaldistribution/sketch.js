let test;
function setup(){
/* YOUR CODE GOES HERE */

noCanvas();

//DEFINING USEFUL VARIABLES
const svgwidth = 800;
const svgheight = 600;

let margin = 0.04;
const graphmargin = {
    top: (svgheight*margin),
    left: (svgwidth*margin),
    bottom: (svgheight*margin),
    right: (svgwidth*margin)
};
const graphwidth = svgwidth - (graphmargin.left + graphmargin.right);
const graphheight = svgheight - (graphmargin.top + graphmargin.bottom);

// SELECTING THE BODY TAG
const body = d3.select("body");

//APPEDING DIV TO BODY 
const constainer = body.append("div").attr("class", "constainer");

//APPENDING SVG TO DIV
const main = constainer.append("svg").attr("class", "main")
                        .attr("width", svgwidth)
                        .attr("height", svgheight);

//APPENDING GROUP TO SVG
//HERE THE GRAPH WILL BE DRAWN
const graph = main.append("g").attr("class", "graph")
                    .attr("width", graphwidth)
                    .attr("height", graphheight)
                    .attr("transform", `translate( ${graphmargin.left}, ${graphmargin.top})`);

//GETTING THE DATA
let max = 20;
let size = 10;
let data = generateData(max,size)

console.log(data);



//DEFINING SCALE
const X = d3.scaleLinear() //TAKESTHE INDEX
            .domain([0, data.length])
            .range([graphmargin.left, graphwidth-graphmargin.right]);
const Y = d3.scaleLinear()// TAKES THE VALUE
            .domain([0,d3.extent(data)[1]])
            .range([graphheight-graphmargin.bottom,graphmargin.top]);
const colorScale = d3.scaleSequential()// COLOR SCALE
                        .domain([0,data.length])
                        .interpolator(d3.interpolatePlasma); 
                    

//CREATING THE NORMAL DISTRIBUTION AREA;
let normalArray = calcNormalDist(data);

const meanScale = d3.scaleLinear()//Y-SCALE FOR NORMAL DISTRIBUTION
                    .domain(d3.extent(normalArray))
                    .range([graphheight-graphmargin.bottom,graphmargin.top]);
const areaGen = d3.area()
                .x((d,i) => X(i))
                .y0(d => meanScale(d))
                .y1(graphheight)
                .curve(d3.curveNatural);

graph.append("path")
        .attr("d", areaGen(normalArray))
        .attr("fill", "white")
        .attr("fill-opacity", 0.1)
        .attr("stroke", "orange")
        .attr("transform", `translate(0, ${-graphmargin.bottom})`);





// DRAWING THE CIRCLES

data.forEach((d,i) => {
   
    while(d){
        graph.append("circle")
        .attr("cx", X(i))
        .attr("cy", Y(d))
        .attr("r", 5)
        .attr("fill", colorScale(i))
        .attr("fill-opacity", 1);
        d--;

    }

})



        
}


const calcMean = (data) => {//FUNCTION TO CALCULATE MEAN
    let mean = 0;
    let count = 0;
    data.forEach((d,i) => {
        mean+=(d*i);
        count += d;
    });
    mean/=count
    return mean
}

const calcNormalDist = (data) => {//CALCULATE THE NORMAL DIST AND RETURN NEW ARRAY WITH POINTS
    
    let mean = calcMean(data);
    let sigma = 0;
    let count = 0;
    const calcParameters = () => {
        
        data.forEach((d,i) => {
            sigma += (d*( (i-mean)**2 ))
            count += d;
        })
        sigma/=count;
        sigma = sqrt(sigma)
    }
    const normalArray = () =>{
        let arr = data.map((d,i) => {
            return Math.exp(-((i-mean)**2) / (2 * (sigma**2)))/(Math.sqrt(2*3.14) * sigma);
        })
        return arr
    }

    calcParameters();
    return normalArray();

}





const generateData = (n, size) => {//GENERATES THE DATA SET
    size = max(10,size)
    let mid = floor(size/2);
    let arr1= new Array(mid).fill(0).map( d => floor( random(0.02, 0.95)* n)).sort((a,b) => a-b)
    let arr2= new Array(mid).fill(0).map( d => floor( random(0.02, 0.95)* n)).sort((a,b) => b-a)
    
    return [...arr1, n , ...arr2];
    
}


