function setup() {
	noCanvas();
	const canvas = d3.select(".canva")
	const svg = canvas.append("svg")
						.attr("width", 600)
						.attr("height", 300)
						
	const rect = svg.selectAll("rect")

	fetch("text.json")
		.then(data => data.json())
		.then((data) => {


			const y = d3.scaleLinear()
						.domain([0, d3.max(d => d.height)])
						.range([0, svg.attr("height")])
					console.log(d3.max(d => console.log(d)))
			let min_y = 0;
			
			let max_y = d3.max(data, d => d.height*2) +10
			
			let width = svg.attr("width")/data.length
			let gap = 1.5;
			rect.data(data)
				.enter().append("rect").attr("class", "bar")
				.attr("width", (d) => width-gap)
				.attr("height", (d) => {
					
					let h = map(d.height*2, min_y, max_y, 0, svg.attr("height"))
					
					return h;
				})
				.attr("fill", (d) => d.fill)
				.attr("x", (d,i) => i*(width))
				.attr("y", (d,i,n) => svg.attr("height") - d3.select(n[i]).attr("height") )
				.style("animation_duration", (d,i,n) =>{
						
					
						let temp = ( 2 * map(i,0,data.length,0.5,3) + "s")

					
						d3.select(n[i])
						.style("animation-duration", temp)

						})
				
		})
}
