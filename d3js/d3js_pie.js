var svgWidth = 320;
var svgHeight = 240;
var dataSet = [21, 42, 20, 11, 7];

var pie = d3.layout.pie();

var arc = d3.svg.arc().innerRadius(0).outerRadius(100);

var pieElements = d3.select("#myGraph")
    .selectAll("path")
    .data(pie(dataSet))

pieElements.enter()
    .append("path")
    .attr("class", "pie")
    .attr("d", arc)
    .attr("transform", "translate("+svgWidth/2+", "+svgHeight/2+")")
    .style("fill", function(d,i){
        return ["red", "orange", "yellow", "cyan", "#3f3"][i];
    })