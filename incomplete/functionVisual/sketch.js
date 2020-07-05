const fun = (d) =>{
    return d**2;
}


console.clear();

//USEFUL VARIABES
let range = [-10,10]
const svgwidth = 600;
const svgheight = 600;
const margin = {
  top: (svgheight * 0.15),
  right: (svgwidth * 0.15),
  bottom: (svgheight * 0.15),
  left: (svgwidth * 0.15),
}
const graphheight = svgheight - (margin.top + margin.bottom);
const graphwidth = svgwidth - (margin.left + margin.right);

//SELECTING THE BODY
const body = d3.select("body");

//APPENDING DIV TO BODY
const container = body.append("div").classed("container", true);

//APPENDING SVG TO DIV
const svg = container.append("svg").classed("svg",true)
svg.attr("height", svgheight)
    .attr("width", svgwidth)

//APPEND GROUP TO SVG
const graph = svg.append("g").classed("graph", true)
                  .attr("width", graphwidth)
                  .attr("height", graphheight)
                  .attr("transform", `translate(${margin.left}, ${margin.top})`)

//BOTTOM AXIS
graph.append("g").call(d3.axisBottom(
    d3.scaleLinear()
    .range([0, graphwidth])
    .domain(range)
).ticks(10))
.attr("transform", `translate(0, ${graphheight/2})`)






graph.append("rect")
        .attr("width", graphwidth)
        .attr("height", graphheight)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("x", 0)
        .attr("y", 0)

const x = d3.scaleLinear()
.range([0, graphwidth])
.domain(range)
.ticks(Math.abs(range[0]) + Math.abs(range[1]))
const y = x.map(d => fun(d));

//SCALE
const X = d3.scaleLinear()
.range([0, graphwidth])
.domain(range)


const Y = d3.scaleLinear()
                .range([graphheight, 0])
                .domain([d3.min(y)-1, d3.max(y)+1])


//Y AXIS
const yaxis = graph.append("g").call(d3.axisLeft(
    d3.scaleLinear()
    .range([graphheight,0])
    .domain([-10,10])
).ticks(10))
.attr("transform", `translate(${graphwidth/2},0)`)


//THE LINE
graph.append("path").classed("path", true)
        .attr("fill", "none")
        .attr("stroke-width", "4")
            .attr("stroke", "white")
                .attr("d", d3.line()
                .x(d => X(d))
                .y(d => graphheight/2)
                (x))
                .transition()
                .duration(3000)
                .delay(800)
                .attr("d", d3.line()
                .x(d => X(d))
                .y(d => Y(fun(d)))
                (x))
                .transition()
                .duration(1)
                .attr("d", d3.line()
                .x(d => X(d))
                .y(d => Y(fun(d)))
                .curve(d3.curveCardinal)
                (x))

//cHANGING Y AXIS
yaxis.transition()
    .duration(4000)
    // .delay(1000)
    .call(d3.axisLeft(
    d3.scaleLinear()
    .range([graphheight,0])
    .domain([d3.min(y)-3, d3.max(y)+3])
).ticks(10))


const button = body.append("button")
                    .text("STOP")
const id = setInterval(()=>{
    
    
    d3.select(".path")
        .remove()


    //THE LINE
graph.append("path").classed("path", true)
.attr("fill", "none")
.attr("stroke-width", "4")
    .attr("stroke", "white")
        .attr("d", d3.line()
        .x(d => X(d))
        .y(d => graphheight/2)
        (x))
        .transition()
        .duration(3000)
        .delay(800)
        .attr("d", d3.line()
        .x(d => X(d))
        .y(d => Y(fun(d)))
        (x))
        .transition()
        .duration(1)
        .attr("d", d3.line()
        .x(d => X(d))
        .y(d => Y(fun(d)))
        .curve(d3.curveCardinal)
        (x))    


},4000)

button.on("click", ()=>{
    clearInterval(id)
})