function setup(){
/* YOUR CODE GOES HERE */
noCanvas();
//USE FUL VARIABLES
const svgheight = 128;
const svgwidth = 200;
const margin = {
    top: (svgheight * 0.15),
    right: (svgwidth * 0.09),
    bottom: (svgheight * 0.12),
    left: (svgwidth * 0.15)
}
const graphheight = svgheight - (margin.top + margin.bottom);
const graphwidth = svgwidth - (margin.right + margin.left);

//SELECTING THE BODY ELEMENT
const body = d3.select("body")

//APPENDING THE DIV 
const container = body.append("div").attr("class", "container");


//APPEND SVG TO DIV
let svg = []
for(let i = 0; i<14; i++){
     let temp = container.append("svg").attr("class",`main svg${i}`)
    .attr("width", "100%")
    .attr("height", "100%");
    svg.push(temp)
    
}

container.append("div").attr("class","info")
.style("width", "100%")
.style("height", "100%")
.text("DATA VIZUALIZATION: THE ART OF VIZUALIZING DATA");

for(let i = 15; i<=28; i++){
     let temp = container.append("svg").attr("class",`main svg${15}`)
    .attr("width", "100%")
    .attr("height", "100%");
    svg.push(temp)
}



//FETCH THE DATA
fetch("text.json")
    .then(response => response.json())
    .then(data => {
        //DEFINING SCALES
        //X SCALE
        const X = d3.scaleBand()
                    .range([0, graphwidth])
                    .domain(data.map((d,i) => i))
                    .padding(0.1);
        //Y SCALE
        const Y = d3.scaleLinear()
                    .range([graphheight, 0])
                    .domain([0, d3.max(data, d=>d.height)]);
        //COLOR MAP
        const colorGen = d3.scaleSequential()
                            .interpolator(d3.interpolatePuOr)
                            .domain([0, data.length-1]);
        //APPENDING THE GROUPS
        svg.forEach( (d,index) => {
            let graph = d.append("g").attr("class", `graph graph${index}`)
                .attr("height", graphheight)
                .attr("width", graphwidth)
                .attr("transform", `translate( ${margin.left}, ${margin.top})`);
            
            let rect = graph.selectAll("rect").data(data);
            rect.enter().append("rect").attr("class", "bar")
                    .attr("height", d => graphheight - Y(d.height))
                    .attr("width", X.bandwidth())
                    .attr("x", (d,i) => X(i))
                    .attr("y", d => Y(d.height))
                    .attr("fill", (d,i) => "#69b6a1");
            let Xaxis = d3.axisBottom(X)
                            .tickValues(0);
            let Yaxis = d3.axisLeft(Y)
                            .ticks(0)
            graph.append("g")
                    .call(Xaxis)
                    .attr("transform", `translate(0, ${graphheight})`);
            graph.append("g")
                    .call(Yaxis);
        })
        
        
 
            
        
        
    })
}