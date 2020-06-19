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
            .range([graphheight, 0])
const colorGen = d3.scaleSequential()// COLOR GENERATOR
                    .interpolator(d3.interpolateInferno)

      
d3.csv("data.csv")
    .then(response => response)
    .then(data => {
        
        data = data.map(d => {
            return {
                x: Number(d.Age),
                y: Number(d["Annual Income (k$)"]),
                location: {
                    x:0,
                    y:0
                },
                cluster : null,
            }
        })
        
        
        
        
        //SETTING THE DOMAINS FOR SCALES
        X.domain([10, d3.extent(data, d=>d.x)[1]])
        Y.domain([10, d3.extent(data, d=>d.y)[1]])
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
        const xaxis = graph.append("g").call(d3.axisBottom(X))
                            .attr("transform", `translate(0, ${graphheight})`)
        const yaxis = graph.append("g").call(d3.axisLeft(Y))                            
        
        // INITIALIZING CLUSTERS
        const cluster_count = 5;
        colorGen.domain([0, cluster_count]) // SETTING THE COLOR RANGE
        
        let clusters = [];
        for(let i =0 ;i< cluster_count; i++){
            let index = Math.floor(Math.random() * data.length)
            clusters.push({
                x: Math.random()* d3.max(data, d=>d.x),
                y: Math.random()*d3.max(data, d=>d.y),
                // x: data[index].x,
                // y: data[index].y,
                color: colorGen(i),
                items: null
            })
        }
        
        let maxIter = 30;
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
        .duration(1000)
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