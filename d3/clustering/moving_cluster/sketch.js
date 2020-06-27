function setup(){
    /* YOUR CODE GOES HERE */
    noCanvas()

    //USEFUL VARIABLES
    const svgheight = 600;
    const svgwidth = 600;
    const margin = {
        top: (svgheight * 0.15),
        right: (svgwidth * 0.15),
        bottom: (svgheight * 0.15),
        left: (svgwidth * 0.15),
    }
    const graphheight = svgheight - (margin.top + margin.bottom);
    const graphwidth = svgwidth - (margin.left + margin.right);

    //SCALES 
    const X = d3.scaleLinear()
                .range([0, graphwidth])
    const Y = d3.scaleLinear()
                    .range([graphheight, 0])

    //COLOR GEN
    const colorGen = d3.scaleSequential()
                        .interpolator(d3.interpolatePlasma)

    //SELECTING THE BODY
    const body = d3.select("body")
    //APPENDING DIV
    const container = body.append("div").classed("container", true);
    //APPEND SVG TO DIV
    const svg = container.append("svg").classed("svg", true)
                            .attr("width", svgwidth)
                            .attr("height", svgheight)
    //APPENDING GROUP TO SVG FOR THE MAIN GRAPH AREA
    const graph = svg.append("g").classed("graph", true)
                        .attr("width", graphwidth)
                            .attr("height", graphheight)
                            .attr("transform", `translate(${margin.left}, ${margin.top})`);
    d3.csv("data2.csv")
        .then(response => response)
            .then(data => {
                data  = data.map(d => {
                    return {
                        X: Number(d.X),
                        Y: Number(d.Y),
                        location: {
                            X: null,
                            Y: null
                        },
                        cluster: null
                    }
                })
                //SETTING DOMAINS OF SCALE
                X.domain(d3.extent(data,d => d.X))
                Y.domain(d3.extent(data,d => d.Y))

                const data_points = graph.selectAll(".data-points")
                                            .data(data)
                    data_points.enter().append("circle").classed("data-points", true)
                                .attr("cx", 0)
                                .attr("cy", graphheight)
                                .attr("r", 10)
                                .attr("fill", "lightblue")
                                .transition()
                                .duration((d,i)=> ((i)%10+1) * 300)
                                .attr("cx", d => X(d.X) )
                                .attr("cy", d => Y(d.Y))

                //INITIALIZING CLUSTER
                const cluster_const = 7;
                colorGen.domain([0,cluster_const-1])
                let clusters = []

                for(let i= 0; i< cluster_const; i++){
                    let index = Math.floor(Math.random() * data.length);
                    clusters.push({
                        X: data[index].X,
                        Y: data[index].Y,
                        location:{
                            X: X(data[index].X),
                            Y: Y(data[index].Y),
                        },
                        color: colorGen(i),
                        members : null
                    })
                }    
                
                                
                const maxIter = 15;
                let count = 0
                let ID = setInterval(() => {
                    if(count++ == maxIter){clearInterval(ID)}
                    else{
                        console.log("called");
                    
                        updateDataPointLocation(data, clusters)
                        moveDataPoints(clusters)
                        updateCluster(clusters)
                    }
                }, 3000)
                
            })


    const updateDataPointLocation = (data,clusters) => {
        clusters.forEach(d => d.members = [])
        
        const dist = (x1, y1, x2, y2) => {
            return Math.sqrt( (x1-x2)**2 + (y1-y2)**2)
        }
        
        data.forEach(d => {
            
            let temp = []
            
            clusters.forEach(D => {
                temp.push(dist(d.X, d.Y, D.X, D.Y))
            })
            
            let cluster = temp.indexOf(d3.min(temp));
            d.cluster = cluster;
            d.location.X = clusters[cluster].location.X + random(-25,25);
            d.location.Y = clusters[cluster].location.Y + random(-25,25);
            clusters[cluster].members.push(d)

        })
    }

    const moveDataPoints = (clusters) => {

        d3.selectAll(".data-points")
            .transition()
            .duration((d,i)=> ((i)%10+1) * 300)
            .attr("cx", d => d.location.X)
            .attr("cy", d => d.location.Y)
            .attr("fill", d => clusters[d.cluster].color)
    }

    const updateCluster = (clusters) => {

        clusters.forEach(d => {
            let Xmean = d3.mean(d.members, D => D.X)
            let Ymean = d3.mean(d.members, D => D.Y)
            d.X = Xmean
            d.Y = Ymean
            d.location.X = X(Xmean)
            d.location.Y = Y(Ymean)
        })
    }


}