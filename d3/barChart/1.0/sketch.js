


function setup() {
    
    const canva = d3.select(".canvas");

    const submit_button = select("#button");
    const input = select("#data");

    const random_data = select("#random_data");
    const random_button = select("#random_set_button")

    const refresh = select("#refresh")
    refresh.mousePressed(() => location.reload())
    
    


    submit_button.mousePressed(async () => {
         
        let temp = input.value().split("\n").join(" ").split(" ").map(x => Number(x));
        createBar(canva, temp, "orange");
    })
    
    
    random_button.mousePressed(async () => {
          
        let temp  = new Array(Number(random_data.value())).fill(0).map( x => floor(random(5,50)) )
        createBar(canva, temp, "orange");
    })

   
    
    



}

//FUNCTION TO CREATE BAR CHART
const createBar = (canvas, arr, color) => {

   

    
    let bars = new Array(arr.length) //  
    let bar_width = 20;  
    let bar_gap = 2; // GAP BETWEENW BARS

    let w = arr.length * (bar_width + bar_gap);

    //
    let scale = 2;
    let h = max(arr) * scale;
    
    //CREAT AN SVG ELEMENT
    const svg = canvas.append("svg");
    svg.attr("width", w)
        .attr("height", h)
        
    // const  rect = svg.selectAll("rect")

    // rect.data(arr)
    //     .enter().append("rect")
    //     .attr("width", () => bar_width)
    //     .attr("height", (d) => d*scale)
    //     .attr("x", (d,i) => i*(bar_width+bar_gap))
    //     .attr("y", (d) => h-(d*scale))
    //     .style("fill", color)
    //     .on("mouseover", (d,i,n) => {

    //         d3.select(n[i])
    //             .transition()
    //             .duration(900)
    //             .style("transform", "rotate(180deg)")
    //             // .attr("rx", 100)
    //             // .attr("ry", 500)
        
    //     })
    //     .on("mouseout", (d,i,n) => {

    //         d3.select(n[i])
    //             .transition()
    //             .duration(300)
    //             .attr("rx", 0)
    //             .attr("ry",0)
                
        
    //     })      
    
    


    for(let i = 0; i< arr.length; i++){
        svg.append("rect")
    }

    const rect = svg.selectAll("rect")
    rect.data(arr)
        .attr("width",bar_width)
        .attr("height", (d) => d*scale)
        .attr("x", (d,i) => i*(bar_width+bar_gap))
        .attr("y", (d) => h-(d*scale))
        .style("fill", color)
          
}
