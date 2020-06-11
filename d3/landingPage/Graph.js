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
                .attr("width", X.bandwidth())
                .attr("x", (d,i) => X(i))
                .attr("fill", (d,i) => "#69b6a1")
                .attr("y", graphheight)
                .transition()
                .duration((d,i) => (i+2)*500)
                .attr("y", d => Y(d.height))
                .attr("height", d => graphheight - Y(d.height))
        
                
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
            .attr("fill", "none")
            .attr("stroke", "none")
            .style("stroke-Width", "0.9%")
            .transition()
            .duration(10000)
            .attr("stroke", "white")

        const dataPoints = graph.selectAll("circle").data(this.data);
        dataPoints.enter()
                .append("circle")
                .attr("r", "1%")
                .attr("fill", "black")
                .attr("cx", (d,i) => i%2!=0?graphwidth:0)
                .transition()
                .duration((d,i) => (i+1)*500)
                .attr("cx", (d,i) => X(i))
                .attr("cy", d => Y(d.height))
        


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
                            .attr("fill-opacity", 0)
                            .style("stroke-Width", "0.4%")
                            .transition()
                            .duration(3000)
                            .ease(d3.easeLinear)
                            .attr("fill-opacity", 0.6)
                            
                        
        

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
            
            // USEFUL VARIABLES
            const svgwidth = Number(svg.style("width").split("p")[0]);
            const svgheight = Number(svg.style("height").split("p")[0])
            const margin = {
                top: (svgheight * 0.15),
                right: (svgwidth * 0.15),
                bottom: (svgheight * 0.15),
                left: (svgwidth * 0.15)
            }
            const graphheight = svgheight - (margin.top + margin.bottom);
            const graphwidth = svgwidth - (margin.right + margin.left);
            //COLOR GENERATOR
            const colorGen = d3.scaleOrdinal()
                                .domain([0, this.data.length-1])
                                .range(d3.schemeAccent);    

            //PIE GENERATOR -> GENERATES THE ANGLES
            const pieGen = d3.pie()
                                .sort(null)
                                .value(d => d.height)
                                .padAngle(0.09);

                            
           const angles = pieGen(this.data);
           //ARC GENERATOR
           const arcGen = d3.arc()
                            .innerRadius(graphheight/4)
                            .outerRadius(graphheight/2);

           
           
            
            let graph = svg.append("g").attr("class", `graph graph${index}`)
                            .attr("height", graphheight)
                            .attr("width", graphwidth)
                            .attr("transform", `translate( ${svgwidth/2}, ${svgheight/2})`);
                        
            
            const path = graph.selectAll("path").data(angles);
            path.enter().append("path")
                                .attr("d", d => arcGen(d))
                                .attr("stroke", "black")
                                .attr("stroke-width", 0)
                                .attr("fill", (d,i) => colorGen(i))
                                .attr("fill-opacity", 0)
                                .transition()
                                .duration((d,i) => (i+1) *700)
                                .attr("fill-opacity", 1)
                                .attr("stroke-width", 1)
                                
                                
                                
    }

    lolipopGraph(svg, index){
        // USEFUL VARIABLES
        const data = this.data.map(d =>{
            let temp = {height: d.height};
            return temp  
        }).sort((a,b) => a.height - b.height)

        
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
        const Y = d3.scaleBand()
                    .range([graphheight, 0])
                    .domain(data.map((d,i) => i))
                    .padding(0.1)
                    .paddingOuter(1)
        //Y SCALE
        const X = d3.scaleLinear()
                    .range([0, graphwidth])
                    .domain([0, d3.max(data, d=>d.height)]);
        
                

        
        let graph = svg.append("g").attr("class", `graph graph${index}`)
                        .attr("height", graphheight)
                        .attr("width", graphwidth)
                        .attr("transform", `translate( ${margin.left}, ${margin.top})`);
        
        let line = graph.selectAll("line").data(data);
        line.enter().append("line").attr("class", "line")
                    .attr("x1", 0)
                    .attr("y1", (d,i) => Y(i))
                    .attr("x2", 0)
                    .attr("y2", (d,i) => Y(i))
                    .attr("stroke", "red")
                    .attr("stroke-width", "1%")
                    .transition()
                    .duration((d,i) => (i+2)*500)
                    .attr("x2", (d, i) => X(d.height))

    
    
    const dataPoints = graph.selectAll("circle").data(data);
    dataPoints.enter()
            .append("circle")
            .attr("r", "1.2%")
            .attr("fill", "green")
            .attr("cy", graphheight)
            .attr("cx", 0)
            .transition()
            .duration((d,i) => (i+1)*500)
            .attr("cx", (d,i) => X(d.height))
            .attr("cy", (d,i) => Y(i))


                
                
                
        let Xaxis = d3.axisBottom(X)
                    .ticks(0);
        let Yaxis = d3.axisLeft(Y)
                        .tickValues(0)
        graph.append("g")
                .call(Xaxis)
                .attr("transform", `translate(0, ${graphheight})`);
        graph.append("g")
                .call(Yaxis);
    }
}