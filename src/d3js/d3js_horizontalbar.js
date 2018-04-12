var dataSet = [300, 130, 5, 60, 240, 120, 140, 50, 10, 200, 150, 80];
// var dataSet = [-2.4, 0.4, 5.7, 12.5, 17.8, 22.2, 24.9, 25.7, 21.2, 14.8, 7.2, 0.4];

d3.select("#myGraph")
    .selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr("x", 30)
    .attr("y", function(d,i){
        return i*35;
    })
    .attr("width", function(d,i){
        return d+"px";
    })
    .attr("height", "30px")

var xScale = d3.scale.linear()
    .domain([0,300])
    .range([0,300])

    d3.select('#myGraph')
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(30, "+((9+dataSet.length)*20+5)+")")
        .call(d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
    )
