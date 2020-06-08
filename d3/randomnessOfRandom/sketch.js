let test;
function setup(){
/* YOUR CODE GOES HERE */
noCanvas();

//USEFUL VARIABLES
const svgwidth = 600;
const svgheight = 600;

const margin = {
    top: (svgheight*0.20),
    right: (svgwidth*0.10),
    bottom: (svgheight*0.10),
    left: (svgwidth*0.20)
}
const graphheight = svgheight - (margin.top + margin.bottom);
const graphwidth = svgwidth - (margin.left + margin.right);

//SELECTING THE BODY
const body = d3.select("body")

// APPENDING A DIV TO BODY
const conatiner = body.append("div").attr("class", "container");

//  SVG TO DIV
const main = conatiner.append("svg").attr("class", "main")
                .attr("width", svgwidth)
                .attr("height", svgheight);

//APPENING GROUP TO SVG
const graph = main.append("g")
                    .attr("width", graphwidth)
                    .attr("height", svgheight)
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//GENERATING DATA
let dataSize = 1000;
let binSize = 10;
const data = generateData(dataSize)
const frequency = processData(data, binSize)

// CREATING SCALE
// X SCALE
const X = d3.scaleBand()
            .range([0, graphwidth])
            .domain(frequency.map(d => d.x))
            .padding(0.1);
//Y SCALE
const Y = d3.scaleLinear()
            .range([graphheight, 0])
            .domain([0, d3.extent(frequency, d => d.y)[1]]);
//COLOR SCALE
const colorGen = d3.scaleSequential()
                    .domain([0, frequency.length-1])
                    .interpolator(d3.interpolateRainbow);

//CREATING THE BARS
const bar = graph.selectAll("rect").data(frequency);
bar.enter()
    .append("rect")
    .attr("width", X.bandwidth())
    .attr("height", d => graphheight- Y(d.y))
    .attr("x", d => X(d.x))
    .attr("y", d => Y(d.y))
    .attr("fill", (d,i) => colorGen(i));


}


//FUNCTION TO GENERATE DATA
const generateData = (size) => {
    let temp =  new Array(size).fill(0).map( () => Math.random());
    return temp
}

//FUNCTION TO PROCESS DATA
const processData = (data, binsize) => {
    binsize = d3.max([4, binsize])

    const x = d3.scaleBand()
                .range([0,1])
                .domain(new Array(binsize).fill(0).map((d,i) => i));
    let bin  = new Map()
    for(let i = 0; i< binsize; i++){
        bin.set(x(i), 0)
    }
    
    let keys = [...bin.keys()]
    data.forEach(d => {
        
        
        for(let i = keys.length-1; i>-1; i--){
            if(i == 0){
                bin.set(keys[i], bin.get(keys[i])+1)
                break;
            }else if(d > keys[i]){
                bin.set(keys[i], bin.get(keys[i])+1)
                break;
            }
            
        }
    });
    let temp = [];
    bin.forEach((d,i) => temp.push({
        x:i,
        y:d
    }))
    return temp
}