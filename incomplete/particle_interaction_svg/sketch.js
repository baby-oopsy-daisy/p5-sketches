console.clear()

// HELPER FUNCTIONS
const helper = {
    svgDimension : function(){// calculate svg dimension
                        svgwidth = Math.max(window.innerWidth * 0.95, 300);
                        svgheight = Math.max(window.innerHeight * 0.95, 300);
                        },
    
    graphDimension: function(){// calculate graph dimension
                        margin = {top: (svgheight * 0.10), right: (svgwidth * 0.10), bottom: (svgheight * 0.10), left: (svgwidth * 0.10)}
                        graphwidth = svgwidth - (margin.left + margin.right)
                        graphheight = svgheight - (margin.top + margin.bottom)
                    },

    setSvgGraph: function(){ // set svg and graph dimensions
                    svg.attr("width", svgwidth)
                        .attr("height", svgheight)
                    graph.attr("width", graphwidth)
                        .attr("height", graphheight)
                        .attr("transform", `translate(${margin.left}, ${margin.top})`)    
                    },
    
    resetScale: function(){ //reset the scale to current dimension
                    X.range([0, graphwidth]);
                    Y.range([graphheight, 0]);
                },
    
    resetData: function(){// recalculate dataPoints position when resize
                    data.forEach(d => {
                        d.location.x = X(d.xval)
                        d.location.y = Y(d.yval)
                    })
                },
        
    repositionDataPoints: function(){
                                graph.selectAll(".data-points").data(data)
                                        .transition()
                                            .duration(100)
                                            .attr("cx", d => d.location.x)
                                            .attr("cy", d => d.location.y)
                            },

    resetMover: function(){// reset the mover when resized
                    moverData.forEach(d => {
                        d.location.x = graphwidth/2;
                        d.location.y = graphheight/2;
                    })
                    d3.selectAll(".mover-group")
                        .data(moverData)
                        .each((D,i,n) => {
                            d3.select(n[i]).select(".mover")
                            .transition()
                        .duration(100)
                        .attr("cx", d => d.location.x)
                        .attr("cy", d => d.location.y)
                    })
                        
                }
}

//COLORS
const moverColor = "rgba(23, 41, 180, 0.6)"
const dataPointColor = "#fa26a0"

//USEFUL VARIABLES
let svgwidth, svgheight;
let graphwidth, graphheight;
let margin;

helper.svgDimension()
helper.graphDimension()

//SVG AND GROUP
let svg = d3.select(".svg")
let graph = d3.select(".graph")
helper.setSvgGraph()

//SCALE
const X = d3.scaleLinear()
            .range([0,graphwidth])
            .domain([0,1])
const Y = d3.scaleLinear()
                .range([graphheight, 0])
                .domain([0, 1])


// CREATING DATA
let pointCount = 50;
let data = new Array(pointCount).fill(0).map(d => {
    let xval = Number(Math.random().toFixed(2));
    let yval = Number(Math.random().toFixed(2));
        return{
            xval: xval,
            yval: yval,
            location:{
                x: X(xval),
                y: Y(yval)
            }
        }
    })


//DATA POINTS GROUP -> DRAWING DATA POINTS
const dataGroup = graph.append("g").classed("data-group", true)

let dataPoints = dataGroup.selectAll(".data-points")
dataPoints.data(data)
            .enter().append("circle").classed("data-points", true)
            .attr("fill", dataPointColor)
            .attr("stroke", "black")
            .attr("cx", d => d.location.x)
            .attr("cy", d => d.location.y)
            .attr("r", "1%")

//MOVER
let speed = 5;
const moverCount= 5;
let lineCount = 4; //number of lines per mover

let moverData = new Array(moverCount).fill(0).map(d => {
    
    let x = Math.random()
    let y = Math.random()
    return {
        xspeed: (x*-speed) + ((1-x)*speed),
        yspeed: (y*-speed) + ((1-y)*speed),
        location: {
            x: graphwidth/2,
            y: graphheight/2
        }
    }
}) 

const moverGroup = graph.selectAll(".mover-group")
                        .data(moverData)
                        .enter()
                        .append("g").classed("mover-group", true)
moverGroup.each((D,i,n) => {
    
    
    d3.select(n[i])
            .append("circle").attr("class", "data-points mover")
            .attr("cx", d => d.location.x)
            .attr("cy", d => d.location.y)
            .attr("r", "2%")
            .attr("fill", moverColor)
})      



//INTERVAL SCHEDULE
setInterval(() => {
    // console.log("called");
    
    moverGroup.each((d,i,n) => {

        d.location.x += d.xspeed;
        d.location.y += d.yspeed;

        if(d.location.x < 20 || d.location.x >graphwidth-20){
            let x = Math.random() * speed
            d.xspeed = d.xspeed<0?x:-x; 
        
        }

        if(d.location.y < 20 || d.location.y >graphheight-20){
              let y = Math.random() * speed
            d.yspeed = d.yspeed<0?y:-y;
        }

       d3.select(n[i]).select(".mover")
        .transition()
        .duration(0)
        .attr("cx", d => d.location.x)
        .attr("cy", d => d.location.y)
    })

    

    moverGroup.each((d,i,n) => {// for lines
        let x1 = d.location.x
        let y1 = d.location.y
        let temp = [];
        d3.selectAll(".data-points")
            .each((D,i,n) => {
                
                let x2 = D.location.x
                let y2 = D.location.y
                if((x1 != x2) && (y1 != y2)){
                    let dist = Math.sqrt((x1-x2)**2 + (y1-y2)**2)
                    temp.push({
                        dist: dist,
                        x2: x2,
                        y2: y2
                    })
                }
            temp = temp.sort((a,b) => a.dist-b.dist).slice(0, lineCount)   
            })
        d3.select(n[i]).selectAll(".line")
            .remove()
            d3.select(n[i]).selectAll(".line")
                .data(temp)
                .enter().append("line").classed("line", true)
                .attr("x1", x1)            
                .attr("y1", y1)
                .attr("x2", d => d.x2)
                .attr("y2", d => d.y2)
                .attr("stroke", moverColor)
                .attr("stroke-width", "0.5%")
            
    })

},100)


window.addEventListener("resize", () => {
    
    helper.svgDimension();
    helper.graphDimension();
    helper.resetScale();
    helper.setSvgGraph();
    helper.resetData();
    helper.repositionDataPoints();
    helper.resetMover();
})