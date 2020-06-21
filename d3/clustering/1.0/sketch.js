function setup(){
/* YOUR CODE GOES HERE */
noCanvas();

//USEFUL VARIABLES
const svgwidth = 800;
const svgheight = 800;
const margin = {
    top: (svgheight * 0.15),
    right: (svgwidth * 0.15),
    bottom: (svgheight * 0.15),
    left: (svgwidth * 0.15),
}
const graphwidth = svgwidth - (margin.right + margin.left)
const graphheight = svgheight - (margin.top + margin.bottom)

//SELECTING THE BODY
const body = d3.select("body")
//APPENDING DIV TO BODY
const container = body.append("div").classed("container", true)
//APPENDING SVG TO DIV
const svg = container.append("svg").classed("svg", true)
                            .attr("width", svgwidth)
                            .attr("height", svgheight)
//APPENDING GROUP TO SVG
const graph = svg.append("g").classed("graph", true)
                    .attr("width", graphwidth)
                    .attr("height", graphheight)
                    .attr("transform", `translate( ${margin.left}, ${margin.top})`)
//DEFINING SCALES
const X = d3.scaleLinear() // X SCALE
            .range([0, graphwidth])
const Y = d3.scaleLinear() // Y SCALE
            .range([0, graphheight])
const colorGen = d3.scaleSequential()// COLOR GENERATOR
                    .interpolator(d3.interpolateInferno)

      
d3.csv("data3.csv")
    .then(response => response)
    .then(data => {
        
        data = data.map(d => {
            return {
                x: Number(d.X),
                y: Number(d.Y),
                location: {
                    x:0,
                    y:0
                },
                cluster : null,
            }
        })
        
        
        
        
        //SETTING THE DOMAINS FOR SCALES
        X.domain(d3.extent(data, d=>d.x))
        Y.domain(d3.extent(data, d=>d.y))
        colorGen.domain([0, data.length])
        
        const data_points = graph.selectAll(".data_points").data(data)
        data_points.enter().append("circle").classed("data_points", true)
                    .attr("cx", 0)
                    .attr("cy", graphheight)
                    .attr("r", "1%")
                    .attr("fill-opacity", 0.6)
                    .style("fill", (d,i) => colorGen(i))
                    .attr("stroke", "black")
                    .transition()
                    .delay(1000)
                    .duration((d,i)=> ((i)%10+1) * 500)
                    .attr("cx", d => X(d.x))
                    .attr("cy", d => Y(d.y))

        //ADDING AXIS
        const xaxis = graph.append("g").call(d3.axisBottom(X).ticks(4))
                            .attr("transform", `translate(0, ${graphheight})`)
        const yaxis = graph.append("g").call(d3.axisLeft(Y).ticks(4))                            
        
        // INITIALIZING CLUSTERS
        const cluster_count = 7;
        const clusterColorGen = d3.scaleOrdinal()
                                    .range(d3.schemeCategory10) // SETTING THE COLOR RANGE
                                    .domain(new Array(cluster_count), (d,i) => i)
        let clusters = [];
        for(let i =0 ;i< cluster_count; i++){
            let index = Math.floor(Math.random() * data.length)
            clusters.push({
                x: Math.random() * d3.min(data, d=>d.x),
                y: Math.random() * d3.max(data, d=>d.y),
                // x: data[index].x,
                // y: data[index].y,
                color: clusterColorGen(i),
                items: null
            })
        }

        //SCALE FOR LEGEND
        const ylegend = d3.scaleBand()
                            .range([0, 100])
                            .domain(clusters.map((d, i) => i ))
                            .padding(0.3)
                            .paddingOuter(1)
        
        setTimeout(() => {
                    //ADDING LEGENDS
                    const legend  = svg.append("g").classed("legend", true)
                    .attr("width", 100)
                    .attr("transform", `translate(${svgwidth-150}, ${50})`)
                    

                    
                    legend.append("text")
                    .style("font-size", "0px")
                    .text("CLUSTERS")
                    .transition()
                    .duration(1000)
                    .style("font-size", "20px")
                    

                    legend.selectAll("rect")
                    .data(clusters)
                    .enter()
                    .append("rect").classed("legend_items", true)
                    .attr("width", 100)
                    .attr("x", 0)
                    .attr("y", (d,i) => ylegend(i))
                    .style("fill-opacity", "0")
                    .transition()
                    .duration(1000)
                    .style("fill-opacity", 1)
                    .style("fill", d => d.color)
                    .attr("height", ylegend.bandwidth())

                    
        }, 5400)
        
        let maxIter = 100;
        let count = 0;
        setTimeout( () => {let ID = setInterval(() => {
        console.log("called");
        
        if(count++ == maxIter){clearInterval(ID)} //TERMINATE AFTER SOME ITERATIONS

        updateClustersOfData(data, clusters);
            
        updateColor(clusters);

        findNewClustersPoints(clusters);

        }, 1000)}, 5400)

    })


}


const updateClustersOfData = (data, clusters) => {

    //EMPTY THE CLUSTER LIST
    clusters.forEach(d => {
        d.items = [];
    })
    
    
    
    //UPDATE CLUSTERS OF DATA AND ADD THEM TO THE ITEMS OF CLUSTERS
    data.forEach(d => {
        let temp = []
        for(let i = 0; i< clusters.length; i++){
            
            temp.push( Math.sqrt( (d.x - clusters[i].x)**2 + (d.y - clusters[i].y)**2 ) )
        }
        let cluster = d3.min(temp);
        
         d.cluster = temp.indexOf(cluster);
        clusters[temp.indexOf(cluster)].items.push(d);
    })


}

const updateColor = (clusters) => {
    d3.selectAll(".data_points")
        .transition()
        .duration(2000)
        .style("fill", d => clusters[d.cluster].color)
        
}

const findNewClustersPoints = (clusters) => {

    for(let i = 0;i < clusters.length; i++){
        let Xmean = d3.mean(clusters[i].items, d=> d.x)
        let Ymean = d3.mean(clusters[i].items, d=> d.y)
        clusters[i].x = Xmean
        clusters[i].y = Ymean
    }
}