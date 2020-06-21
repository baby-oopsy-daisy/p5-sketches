function setup(){
/* YOUR CODE GOES HERE */
noCanvas();
let cluster_button_flag = true;
let data_button_flag = true;

const graph = new CLUSTER()

//INITIAL STEPS
d3.csv("data2.csv")
.then(response => response)
.then(data => {
    graph.addData(data);
    graph.initializeCluster();
    graph.addDataPoints()
    })

const data1_button = d3.select("#data1")
const data2_button = d3.select("#data2")
const data3_button = d3.select("#data3")

let maxIter = 31;

data1_button.on("click", () => {
    
    if(data_button_flag){
        d3.csv("data1.csv")
        .then(response => response)
        .then(data => {
            
            graph.cluster_count = 10;
            graph.addData(data)
            graph.initializeCluster();
            graph.updateDataPoints()
        })
    }

})
data2_button.on("click", () => {
    
    
    if(data_button_flag){
        d3.csv("data2.csv")
        .then(response => response)
        .then(data => {
            
            graph.cluster_count = 7
            graph.addData(data)
            graph.initializeCluster();
            graph.updateDataPoints()
        })
    }

})
data3_button.on("click", () => {
  
    if(data_button_flag){
        d3.csv("data3.csv")
        .then(response => response)
        .then(data => {
            
            graph.cluster_count = 9
            graph.addData(data)
            graph.initializeCluster();
            graph.updateDataPoints()
        })
    }

})




let count = 0;
let Id;
const cluster_button = d3.select(".cluster_button")

cluster_button.on("click",() => {
        if(cluster_button_flag){
            data_button_flag = !data_button_flag
            cluster_button_flag = ! cluster_button_flag
            cluster_button.text("CLUSTERING")
            graph.initializeCluster()
            graph.updateLegend()
        Id = setInterval(() => {

            if(++count == maxIter){
                data_button_flag = !data_button_flag;
                cluster_button_flag = ! cluster_button_flag;
                count = 0;
                clearInterval(Id);
                cluster_button.text("BEGIN CLUSTERING")
                d3.select("#readyornot")
                .text("...Ready for clustering again...")
            }else{
                
                d3.select("#iteration")
                .text(count)
                d3.select("#readyornot")
                .html("..Watch the graph... <br> <p>Press the stop button when colors stops moving</p>")
                
                graph.performClustering()
            }

        }, 1500)
        }
    })

d3.select("#stopbutton")
        .on("click", () => {
            if(!cluster_button_flag){
                clearInterval(Id)
                cluster_button.text("BEGIN CLUSTERING")
                d3.select("#readyornot")
                .text("...Ready for clustering again...")
                data_button_flag = !data_button_flag;
                cluster_button_flag = ! cluster_button_flag;
                count = 0;
            }
        })

}