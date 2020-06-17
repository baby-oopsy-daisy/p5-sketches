function setup(){
    /* YOUR CODE GOES HERE */
    noCanvas();

    //USEFUL VARIABLES
    const svgwidth = 1200;
    const svgheight = 1200;
    const margin = {
        top : (svgheight * 0.15),
        right : (svgwidth * 0.15),
        bottom : (svgheight * 0.15),
        left : (svgwidth * 0.15),
    }
    const graphwidth = svgwidth - (margin.left + margin.right);
    const graphheight = svgheight - (margin.top + margin.bottom);

    //SELECTING THE BODY TAG
    const body = d3.select("body");

    //APPENDING DIV TO BODY
    const container = body.append("div").classed("container", true);

    //APPENDING SVG TO DIV
    const svg = container.append("svg").classed("canva", true)
                    .attr("width", svgwidth)
                    .attr("height", svgheight);

    //APPENDING GROUP FOR GRAPH TO SVG
    const graph = svg.append("g").classed("graph", true)
                        .attr("width", graphwidth)
                        .attr("height", graphheight)
                        .attr("transform", `translate( ${margin.left}, ${margin.top})`);

    //SCALES
    //X-SCALE
    const X = d3.scaleLinear()
                    .domain([0,10])
                    .range([0,graphwidth]);
    //Y-SCALE
    const Y = d3.scaleLinear()
                    .domain([0,10])
                    .range([graphheight, 0]);
    //COLOR GENERATOR
    const colorGen = d3.scaleOrdinal()
                        .domain([0,1,2,3,4,5,6,7])
                        .range(d3.schemeCategory10)

    //CREATING DATA SET
    const data_items_count = 500; // NO OF DATA POINTS

    let data = [];
    for(let i =0; i< data_items_count; i++){



        let x = (Math.random()*10)
        let y = (Math.random()*10)
        data.push({
            x : (X(x)),
            y : (Y(y)),
            xVal: x,
            yVal: y,
            cluster: null
        })
    }
    /*DATA FORMAT
    {
        x: Location
        y: Location
        xVal: X VALUE IN [0,1]
        yVal: Y VALUE IN [0,1]
    }*/


    //ADDING DATA POINTS
    const data_points = graph.selectAll("circle").data(data)
    data_points.enter().append("circle").classed("data-points", true)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", "10px")
    .attr("stroke", "black")
    // .attr("fill", "rgb(23, 50, 202)")
    .attr("fill-opacity", 0.8);

    const no_of_cluster = 10;// NO OF CLUSTERS TO FIND

    let cluster = []
    for(let i = 0; i< no_of_cluster; i++){
        let index = Math.floor(Math.random()*data.length)
        cluster.push({ 
            // data: data[index],
            data: {
                xVal: (Math.random()*Math.random()*10),
                yVal: (Math.random()*Math.random()*10)
            },

            color: colorGen(i),
            list : []
        })
    }
 let count = 0;   
 const MaxIter = 100;
 const ID = setInterval(() => {

        console.log("called");
        if(count++ == MaxIter){clearInterval(ID)}
        

        // for(let i = 0; i< MaxIter; i++){
            UpdateCluster(data, cluster);
            d3.selectAll(".data-points").attr("fill", d=> cluster[d.cluster].color)
            clusterMean(data, cluster);
        // }
 },1000)

}










const UpdateCluster = (data, cluster) => {

    const EucleidanDistance = (i,j) => {
        return Math.sqrt(  (data[i].xVal - cluster[j].data.xVal)**2  + (data[i].yVal - cluster[j].data.yVal)**2)
    }

    for(let i = 0; i< cluster.length; i++){
        cluster[i].list = [];
    }
    for(let i = 0; i< data.length; i++){
        
        let temp = [];
        for(let j = 0; j< cluster.length; j++){
                temp.push(EucleidanDistance(i, j))
            }
        let c =  temp.indexOf(d3.min(temp));   
            
        data[i].cluster =  c
        cluster[c].list.push(data[i])
    }
    
}

const clusterMean = (data, cluster) => {
    // console.log(cluster);
    
     for(let i = 0; i < cluster.length; i++){
         let curr = cluster[i].list;
         cluster[i].data.xVal = d3.mean(curr, d => d.xVal)
         cluster[i].data.yVal = d3.mean(curr, d => d.yVal)
     }
    // console.log(cluster);

}