class Graph{ 
    constructor(data){
        this.data = data; 
    }
    barGraph(svg, index){
        // USEFUL VARIABLES
        const svgwidth = Number(svg.style("width").split("p")[0]);
        const svgheight = Number(svg.style("height").split("p")[0])
        const margin = {
            top: (svgheight * 0.15),
            right: (svgwidth * 0.09),
            bottom: (svgheight * 0.12),
            left: (svgwidth * 0.15)
        }
        const graphheight = svgheight - (margin.top + margin.bottom);
        const graphwidth = svgwidth - (margin.right + margin.left);
         
        //DEFINING SCALES
        //X SCALE
        const X = d3.scaleBand()
                    .range([0, graphwidth])
                    .domain(this.data.map((d,i) => i))
                    .padding(0.1)
                    .paddingOuter(1)
        //Y SCALE
        const Y = d3.scaleLinear()
                    .range([graphheight, 0])
                    .domain([0, d3.max(this.data, d=>d.height)]);
        //COLOR MAP
        const colorGen = d3.scaleSequential()
                            .interpolator(d3.interpolatePuOr)
                            .domain([0, this.data.length-1]);
        //APPENDING THE GROUPS
       
        let graph = svg.append("g").attr("class", `graph graph${index}`)
            .attr("height", graphheight)
            .attr("width", graphwidth)
            .attr("transform", `translate( ${margin.left}, ${margin.top})`);
        
        let rect = graph.selectAll("rect").data(this.data);
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
    
    }
    lineGraph(svg, index){

        // USEFUL VARIABLES
        const svgwidth = Number(svg.style("width").split("p")[0]);
        const svgheight = Number(svg.style("height").split("p")[0])
        const margin = {
            top: (svgheight * 0.15),
            right: (svgwidth * 0.09),
            bottom: (svgheight * 0.12),
            left: (svgwidth * 0.15)
        }
        const graphheight = svgheight - (margin.top + margin.bottom);
        const graphwidth = svgwidth - (margin.right + margin.left);
         
        //DEFINING SCALES
        //X SCALE
        const X = d3.scaleBand()
                    .range([0, graphwidth])
                    .domain(this.data.map((d,i) => i))
                    .padding(0.1)
                    .paddingOuter(1)
        //Y SCALE
        const Y = d3.scaleLinear()
                    .range([graphheight, 0])
                    .domain([0, d3.max(this.data, d=>d.height)]);
        
        //LINE GENERATOR
        const lineGen = d3.line()
                        .x((d,i) => X(i))
                        .y(d => Y(d.height))
        
        let graph = svg.append("g").attr("class", `graph graph${index}`)
                        .attr("height", graphheight)
                        .attr("width", graphwidth)
                        .attr("transform", `translate( ${margin.left}, ${margin.top})`);
                    
        
        const path = graph.append("path")
                            .attr("d", lineGen(this.data))
                            .attr("stroke", "white")
                            .attr("fill", "none")
                            .style("stroke-Width", "0.9%");
                        
        const dataPoints = graph.selectAll("circle").data(this.data);
        dataPoints.enter()
                .append("circle")
                .attr("cx", (D,i) => X(i))
                .attr("cy", d => Y(d.height))
                .attr("r", "1%")
                .attr("fill", "black");

        let Xaxis = d3.axisBottom(X)
                    .tickValues(0);
        let Yaxis = d3.axisLeft(Y)
                        .ticks(0)
        graph.append("g")
                .call(Xaxis)
                .attr("transform", `translate(0, ${graphheight})`);
        graph.append("g")
                .call(Yaxis);
    }

    areaGraph(svg, index){

        // USEFUL VARIABLES
        const svgwidth = Number(svg.style("width").split("p")[0]);
        const svgheight = Number(svg.style("height").split("p")[0])
        const margin = {
            top: (svgheight * 0.15),
            right: (svgwidth * 0.09),
            bottom: (svgheight * 0.12),
            left: (svgwidth * 0.15)
        }
        const graphheight = svgheight - (margin.top + margin.bottom);
        const graphwidth = svgwidth - (margin.right + margin.left);
         
        //DEFINING SCALES
        //X SCALE
        const X = d3.scaleBand()
                    .range([0, graphwidth])
                    .domain(this.data.map((d,i) => i))
                    .padding(0.1)
                    .paddingOuter(1)
        //Y SCALE
        const Y = d3.scaleLinear()
                    .range([graphheight, 0])
                    .domain([0, d3.max(this.data, d=>d.height)]);
        
        //LINE GENERATOR
        const areaGen = d3.area()
                        .x((d,i) => X(i))
                        .y0(graphheight)
                        .y1(d => Y(d.height))
                        .curve(d3.curveNatural);
        
        let graph = svg.append("g").attr("class", `graph graph${index}`)
                        .attr("height", graphheight)
                        .attr("width", graphwidth)
                        .attr("transform", `translate( ${margin.left}, ${margin.top})`);
                    
        
        const path = graph.append("path")
                            .attr("d", areaGen(this.data))
                            .attr("stroke", "white")
                            .attr("fill", "orange")
                            .attr("fill-opacity", 0.6)
                            .style("stroke-Width", "0.4%");
                        
        

        let Xaxis = d3.axisBottom(X)
                    .tickValues(0);
        let Yaxis = d3.axisLeft(Y)
                        .ticks(0)
        graph.append("g")
                .call(Xaxis)
                .attr("transform", `translate(0, ${graphheight})`);
        graph.append("g")
                .call(Yaxis);
    }

    pieGraph(svg, index){
        
    }
}