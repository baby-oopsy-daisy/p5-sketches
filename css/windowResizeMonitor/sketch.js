const infoArea = d3.select(".svg")

const w = d3.select("#width")
      w.text(window.innerWidth)

const h = d3.select("#height")
      h.text(window.innerHeight)

const t = d3.select("#info-space")
t.attr("x", window.innerWidth*0.4)
.attr("y", window.innerHeight/2)

window.addEventListener("resize", myFunction);
function myFunction() {
  infoArea.style("opacity", 0.5)
    w.text(window.innerWidth)
    h.text(window.innerHeight)
  
    t.attr("x", window.innerWidth*0.4)
      .attr("y", window.innerHeight/2)
    setTimeout(() => {
      infoArea.style("opacity", 0)
    },1000)
    

}