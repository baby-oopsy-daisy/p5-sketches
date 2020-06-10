function setup(){
/* YOUR CODE GOES HERE */
noCanvas();
//USE FUL VARIABLES
const svgheight = "90%";
const svgwidth = "90%";


//SELECTING THE BODY ELEMENT
const body = d3.select("body")

//APPENDING THE DIV 
const container = body.append("div").attr("class", "container");


//APPEND SVG TO DIV
let svg = []
for(let i = 0; i<18; i++){
    let temp = container.append("svg").attr("class",`main svg${i}`)
   .attr("width", svgwidth)
   .attr("height", svgheight);
   svg.push(temp)
}

container.append("div").attr("class","info")
.style("width", "90%")
.style("height", "90%")
.text("DATA VIZUALIZATION")
.append("text")
.text("VISUAL LINK BETWEEN YOU AND DATA");


let graph;

//FETCH THE DATA
fetch("text.json")
    .then(response => response.json())
    .then(data => {
        
        
        
        graph = new Graph(data)
       
        graph.barGraph(svg[0], 0)
        
        graph.lineGraph(svg[1], 1)
        
        graph.areaGraph(svg[2], 2)
            
        graph.pieGraph(svg[3], 3)
        
    })
}
