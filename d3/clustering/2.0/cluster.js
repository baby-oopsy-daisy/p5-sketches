class CLUSTER{
    constructor(){
        //USEFUL VARIABLES
        this.svgheight = 600;
        this.svgwidth = 600;
        this.margin = {
            top: (this.svgheight * 0.15),
            right: (this.svgwidth * 0.15),
            bottom: (this.svgheight * 0.15),
            left: (this.svgwidth * 0.15)
        };
        this.graphwidth = this.svgwidth - (this.margin.left + this.margin.right);
        this.graphheight = this.svgheight - (this.margin.top + this.margin.bottom);
        
        //SVG
        this.svg = d3.select(".canvas_area").append("svg").classed("canvas", true)
                        .attr("width", this.svgwidth)
                        .attr("height", this.svgheight);
        //GRAPH
        this.graph = this.svg.append("g").classed("graph", true)
                                .attr("width", this.graphwidth)
                                .attr("height", this.graphheight)
                                .attr("transform", `translate( ${this.margin.left}, ${this.margin.top})`)
        // X SCALE
        this.X = d3.scaleLinear()
                    .range([0, this.graphwidth])
        // Y SCALE                    
        this.Y = d3.scaleLinear()
                    .range([this.graphheight, 0])
        //COLOR GEN            
        this.colorGen = d3.scaleOrdinal()
                            .range(d3.schemeCategory10)
                            .domain(new Array(10).fill(0).map((d,i) => d.i))
        // AXIS
        this.xAxis = this.graph.append("g").attr("transform", `translate(${0}, ${this.graphheight})`)
        this.yAxis = this.graph.append("g")                                          

        this.cluster_count = 7;
        this.cluster = null;
        
        // DATA POINTS
        this.data_points = this.graph.selectAll(".data-points")


        //FOR LEGEND
        this.legendheight = 70;
        this.legendwidth = 150;
        this.scale_legend = d3.scaleBand()
                                .range([0, this.legendheight])
                                .padding(0.1)
                                .paddingOuter(1)
        this.legend = this.svg.append("g")
                                .attr("width", this.legendwidth)
                                .attr("height", this.legendheight)
                                .attr("transform", `translate(${this.svgwidth-this.legendwidth-20}, 25)`)
        
        this.label = this.legend.append("text")
        .style("opacity", "0")
        .text("LEGEND")
        
        
         
    }

    addData(data){
        //PROCESS DATA
        this.data = data.map(d => {
            return {
                x: Number(d.X),
                y: Number(d.Y),
                cluster: null
            }
        })
        //BIND DATA TO SCALE
        this.X.domain(d3.extent(this.data, d => d.x))
        this.Y.domain(d3.extent(this.data, d => d.y))

        //DRAWING AXIS
        this.xAxis
        .transition()
        .duration(2000)
        .call(d3.axisBottom(this.X).ticks(6))
        this.yAxis
        .transition()
        .duration(2000)
        .call(d3.axisLeft(this.Y).ticks(6))

    }

    initializeCluster(){
        this.cluster = [];
        for(let i =0; i< this.cluster_count; i++){
            let index = Math.floor(Math.random()* this.data.length)
            this.cluster.push({
                x: this.data[index].x,
                y: this.data[index].y,
                color: this.colorGen(i),
                list: null
            })
        }

    
        

    }

    addDataPoints(){
        
             this.data_points.data(this.data, d=>d).enter().append("circle").classed("data-points", true)
                        .attr("cx", 0)
                        .attr("cy", this.graphheight)
                        .attr("r", "1%")
                        .style("stroke", "black")
                        .style("fill-opacity", 0.5)
                        .style("fill", d => "#ff6361")
                        .transition()
                        .duration((d,i)=> ((i)%10+1) * 300)
                        .attr("cx", d => this.X(d.x))
                        .attr("cy", d => (this.Y(d.y)))
                        

    }

    updateDataPoints(){
        d3.select(".graph").selectAll(".data-points").data(this.data,d=>d)
        .exit()
        .transition()
        .duration((d,i)=> 2000)
        .attr("cx", this.graphwidth/2)
        .attr("cy", this.graphheight/2)
        .remove()
        

        d3.select(".graph").selectAll(".data-points").data(this.data, d=>d)
        .enter().append("circle").classed("data-points", true)
        .attr("r", "1%")
        .attr("cx", 0)
        .attr("cy", this.graphheight)
        .style("stroke", "black")
        .style("fill-opacity", 0.5)
        .style("fill", d => "#ff6361")
        .transition()
        .duration((d,i)=> ((i)%10+1) * 300)
        .attr("cx", d => this.X(d.x))
        .attr("cy", d => (this.Y(d.y)))

        
    }

    performClustering(){
        this.updateCluster()    
        this.updateColor()
        this.updateMean()
    }

    updateLegend(){
        
        this.scale_legend.domain(new Array(this.cluster_count).fill(0).map((d,i) => i))
        
        this.label
        .transition()
        .duration(1000)
        .style("opacity", 1)


        this.legend.selectAll(".legend-items")
                    .data([], d => d)
                    .exit()
                    .transition()
                    .delay(1000)
                    .style("fill-opacity", 0)
                    .remove()

        this.legend.selectAll(".legend-items")
                    .data(this.cluster, d => d)
                    .enter()
                    .append("rect").classed("legend-items", true)
                    .attr("x", 0)
                    .attr("y", (d,i) => this.scale_legend(i))
                    .attr("height", this.scale_legend.bandwidth)
                    .style("fill-opacity", 0)
                    .attr("width", 0)
                    .style("fill" , (d) => d.color)
                    .transition()
                    .delay(1000)
                    .style("fill-opacity", 1)
                    .attr("width", this.legendwidth)
    }


    updateCluster = () => {
            this.cluster.forEach(d => {
                d.list = [];
            })
            this.data.forEach((d,i) => {
                
                let temp = []
                for(let i = 0; i< this.cluster.length; i++){
                    
                    let dist = Math.sqrt( ((d.x) - (this.cluster[i].x))**2 +  ((d.y) - (this.cluster[i].y))**2  )
                    
                    
                    temp.push(dist)

                }
                // console.log(temp);
                
                d.cluster = temp.indexOf(d3.min(temp))
                this.cluster[temp.indexOf(d3.min(temp))].list.push(d)

            })
    }

    updateColor = () => {
        d3.selectAll(".data-points")
            .transition()
            .duration(1000)
            .style("fill", d=>this.cluster[d.cluster].color)
    }

    updateMean = () => {
        this.cluster.forEach(d => {
            d.x = d3.mean(d.list, c => c.x)
            d.y = d3.mean(d.list, c => c.y)
        })
    }

    
}