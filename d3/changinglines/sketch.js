console.clear()
//HELPER FUNCTION
let help = {
  generateData : function(size, range){
                    let temp = []
                    let i = 1;
                    while(size--){
                        let l = Math.random()
                        l = (l*range[0]) + ((1-l)*range[1])
                        
                      temp.push({
                        X: i++,
                        Y: l
                      })
                    }
                    return temp;
                  }
}


//USEFUL VARIABES
const svgwidth = 800;
const svgheight = 400;
const margin = {
  top: (svgheight * 0.25),
  right: (svgwidth * 0.10),
  bottom: (svgheight * 0.25),
  left: (svgwidth * 0.10),
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

//THE BORDER
graph.append("line").classed("border",true)
  .attr("x1", graphwidth)
.attr("x2", graphwidth)
 .attr("y1", graphheight/2)
.attr("y2", graphheight/2)
.transition()
.duration(1000)
.attr("y1",0)
.attr("y2", graphheight)


//GENERATING DATA 
let size = 16;
const range = [20,100]
let data1 = help.generateData(size, range);
let data2 = help.generateData(size, range);

//SCALES
const X = d3.scaleLinear()
              .range([0,graphwidth])
              .domain([0, size+2])
const Y = d3.scaleLinear()
            .range([graphheight, 0])
            .domain([0, range[1]+20])

//AXIS
graph.append("g").attr("id", "xaxis")
  .attr("transform", `translate(0, ${graphheight})`)
  .call(d3.axisBottom(X).ticks(size+2).tickFormat((d,i) => String.fromCharCode(i+64)))

graph.append("g").attr("id", "yaxis")
.call(d3.axisLeft(Y).ticks(6).tickFormat(d => d+"k").tickSizeOuter(0))


//HORIZONTAL GRID LINES
  graph.selectAll(".grid")
        .data(d3.scaleLinear().range([graphheight,0]).domain([0,range[1]+20]).ticks(6))
        .enter()
        .append("line").classed("grid", true)
        .attr("x1", graphwidth/2)
        .attr("x2", graphwidth/2)
        .attr("y1", d => Y(d))
        .attr("y2", d => Y(d))
        .style("stroke", "black")
        .style("srtroke-width", "1em")
        .style("opacity", 0.5)
        .transition()
        .duration(1000)
        .attr("x1",0)
        .attr("x2", graphwidth)



//PLOTTING DATA 1
X.domain([0, data1.length+2])
Y.domain([0, d3.max(data1, d=>d.Y)+30])

const data1_line_group = graph.append("g") //FOR LINES (TEAL)
data1_line_group.selectAll(".data1-line").data(data1)
.enter().append("line").classed("data1-line", true)
    .attr("x1", (d, i) => i<size-1?X(d.X):null)
    .attr("x2", (d, i) => i<size-1?X(data1[i+1].X):null)
    .attr("y1", graphheight)
    .attr("y2", graphheight)
    .transition()
    .duration(d => 1500)
    .attr("y1", (d, i) => i<size-1?Y(d.Y):null)
    .attr("y2", (d, i) => i<size-1?Y(data1[i+1].Y):null)

 /*for data points*/ const data1_data_points = data1_line_group.selectAll(".data1-data-points").data(data1)
      data1_data_points.enter().append("circle").classed("data1-data-points data-points", true)
            .attr("cx", d => X(d.X))
            .attr("cy", graphheight)
            .attr("r", "0.75%" )
            .transition()
            .duration(d => 1500)
            .attr("cy", d => Y(d.Y))




//PLOTTING DATA 2
X.domain([0, data2.length+2])
Y.domain([0, d3.max(data2, d=>d.Y)+30])

const data2_line_group = graph.append("g")// FOR LINES (purple)
data2_line_group.selectAll(".data2-line").data(data2)
.enter().append("line").classed("data2-line", true)
    .attr("x1", (d, i) => i<size-1?X(d.X):null)
    .attr("x2", (d, i) => i<size-1?X(data2[i+1].X):null)
    .attr("y1", graphheight)
    .attr("y2", graphheight)
    .transition()
    .duration(d => 1500)
    .attr("y1", (d, i) => i<size-1?Y(d.Y):null)
    .attr("y2", (d, i) => i<size-1?Y(data2[i+1].Y):null)
 /*for data points*/const data2_data_points = data2_line_group.selectAll(".data2-data-points").data(data2)
      data2_data_points.enter().append("circle").classed("data2-data-points data-points", true)
          .attr("cx", d => X(d.X))
          .attr("cy", graphheight)
          .attr("r", "0.75%" )
          .transition()
          .duration(d => 1500)
          .attr("cy", d => Y(d.Y))



//LABELS OF AXIS
const XaxisLabel = graph.append("g")
XaxisLabel.append("text")
    .attr("x", graphwidth/2-100) 
    .attr("y", graphheight+ margin.bottom/2)
    .style("opacity", 1)
    .attr("fill", "black").text("<=== DEPARTMENT ===>")


const yaxisLabel = graph.append("g").style("transform", "rotateZ(-90deg)")
yaxisLabel.append("text")
    .attr("x", -210) 
    .attr("y", -margin.left/2)
    .text("<=== AVERAGE SALARY ===>")
    .attr("fill", "black")








  

//CHANGE DATA BUTTON
const changeButton = container.append("button").attr("id", "change-button").text("CHANGE DATA")
changeButton.style("box-shadow"," 3px 3px 10px  black, -3px -3px 10px  white,0px 0px 5px inset rgb(69, 212, 112)")                        
                        
changeButton.on("click", () => {
    
  changeButton.style("box-shadow"," 3px 3px 10px inset black, -3px -3px 10px inset white,0px 0px 5px  rgb(69, 212, 112)")                        
  setTimeout(() => {
    changeButton.style("box-shadow"," 3px 3px 10px  black, -3px -3px 10px  white,0px 0px 5px inset rgb(69, 212, 112)")
  }, 100)  
  
  //GENERATE NEW DATA
    data1 = help.generateData(size, range);
    data2 = help.generateData(size, range);

    
    //CHANGE THE SCALES
    // Y.domain([0, d3.max(data2, d=>d.Y)+30])

    
    /*change data 2 lines*/data2_line_group.selectAll(".data2-line").data(data2)
      .transition()
      .duration(d => d.X*200)
      .attr("y1", (d, i) => i<size-1?Y(d.Y):null)
      .attr("y2", (d, i) => i<size-1?Y(data2[i+1].Y):null)
    
    /*change data 2 points*/data2_line_group.selectAll(".data2-data-points").data(data2)
      .transition()
      .duration(d => d.X*200)
      .attr("cy", (d, i) => Y(d.Y))

    /*change data 1 lines*/data1_line_group.selectAll(".data1-line").data(data1)
      .transition()
      .duration(d => d.X*200)
      .attr("y1", (d, i) => i<size-1?Y(d.Y):null)
      .attr("y2", (d, i) => i<size-1?Y(data1[i+1].Y):null)
    
    /*change data 1 points*/data1_line_group.selectAll(".data1-data-points").data(data1)
      .transition()
      .duration(d => d.X*200)
      .attr("cy", (d, i) => Y(d.Y))

 
    
  })

  //TOOLTIP
  const tooltip_group = graph.append("g").classed("tooltip-group",true).attr("opacity", 0)
  const tooltip = tooltip_group.append("rect").classed("tooltip", true)
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("width", "18%")
                                .attr("height",  "10%")
                                .attr("fill", "black")
  /*for teal circle on tooltip*/const info1 = tooltip_group.append("circle")
          .attr("cx", "3%")
          .attr("cy", "3%")
          .attr("r", "0.8%")
          .attr("fill-opacity", 1)
          .attr("fill", "teal")
          .attr("stroke", "white")
          .attr("stroke-Weight")
  /*for purple circle on tooltip*/const info2 = tooltip_group.append("circle")
      .attr("cx", "3%")
      .attr("cy", "7%")
      .attr("r", "0.8%")
      .attr("fill-opacity", 1)
      .attr("fill", "purple")
      .attr("stroke", "white")
      .attr("stroke-Weight")
/*info related to teal circle*/const info1_text = tooltip_group.append("text").attr("stroke", "yellow").attr("stroke-width", "0.6px")
                              .style("font-size", "12px")
                              .attr("x", "6%")
                              .attr("y", "3.5%")
                              .attr("fill", "white")
/*info related to purple circle*/const info2_text = tooltip_group.append("text").attr("stroke", "yellow").attr("stroke-width", "0.6px")
                              .style("font-size", "12px")
                              .attr("x", "6%")
                              .attr("y", "7.5%")
                              .attr("fill", "white")








//FOR DASHED LINES
//MAKE TRANSPARENT RECT AND WHEN ON ANY DRAW THE LINE
const Width = (X(1) - X(0))
          

graph.selectAll(".trap").data(new Array(size).fill(0).map((d,i) => i))
.enter().append("rect").classed("trap", true)
      .attr("width", Width)
      .attr("height", graphheight)
      .attr("x", d => X(d+0.5))
      .attr("y", 0)
      .attr("fill", "none")
      .attr("stroke", "none")


const dash_line_group = graph.append("g").append("line").classed("dash",true)
  .attr("y1", 0)
  .attr("y2", graphheight)
  .attr("x1", graphwidth/2)
  .attr("x2", graphwidth/2)
  .style("opacity", 0)

graph.selectAll(".trap")
      .on("mouseover", (d,i,n) => {

        if(i == size){return}
        info1_text.text(data1[i].Y.toFixed(2) + " k")
        info2_text.text(data2[i].Y.toFixed(2) + " k")        
        
         dash_line_group.style("opacity", 1)/*make visible*/
        dash_line_group/*smooth movement*/
            .transition()
            .duration(100)
            .attr("x1", X(d+1)).attr("x2",X(d+1))
        

            
        d3.selectAll(".data-points")
        .each((D,j,n) => {
          if(j == i || j == i+size){
            
              let x  = X(D.X)
              let y  = Y(D.Y)
              /*move tooaltip*/tooltip_group.attr("transform", "translate("+ x +"," +y +")" )
              /*make it visible*/tooltip_group.attr("opacity", 0.7)
              /*subtle scaling of the data points*/  d3.select(n[j])
                    .attr("transform", `translate(${x} ${y}) scale(1.4) translate(-${x} -${y})`)

            }
        })
      })
      .on("mouseout", (d,i,n) => {
        dash_line_group.style("opacity", 0)
        tooltip_group.attr("opacity", 0)
         
        d3.selectAll(".data-points")
        .each((D,j,n) => {
          if(j == i || j == i+size){
            
            
              let x  = X(D.X)
              let y  = Y(D.Y)
                d3.select(n[j])
                  .attr("transform", `translate(${x} ${y}) scale(1) translate(-${x} -${y})`)
                  
                
          }
        })
      })



