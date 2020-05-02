


function setup() {
    
    const canva = d3.select(".canvas");

    const submit_button = select("#button");
    const input = select("#data");

    const random_data = select("#random_data");
    const random_button = select("#random_set_button")

    const refresh = select("#refresh")
    refresh.mousePressed(() => location.reload())
    
    


    submit_button.mousePressed(() => {

        let temp = input.value().split("\n").join(" ").split(" ").map(x => Number(x));
        createBar(canva, temp, "orange");
    })
    
    
    random_button.mousePressed(() => {
        let temp  = new Array(Number(random_data.value())).fill(0).map( x => floor(random(5,50)) )
        createBar(canva, temp, "orange");
    })

   
    
    // createBar(canva, dataArray, "orange");



}

const createBar = (canvas, arr, color) => {

    let scale = 5;
    let bars = new Array(arr.length) 
    let bar_width = 20;  
    let bar_gap = 2
    let w = arr.length * (bar_width + bar_gap);
    let h = max(arr) * scale;
    
    const svg = canvas.append("svg");
    svg.attr("width", w)
        .attr("height", h)
        // .style("background-color", "red");

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
