var svgWidth = 600;
var svgHeight = 600;
var dataSet = [21, 42, 20, 11, 7];

var pie = d3.layout.pie();

var arc = d3.svg.arc().innerRadius(110).outerRadius(220);

var pieElements = d3.select("#myGraph")
    // .selectAll("g")
    // .data(pie(dataSet))
    // .enter()
    // .append("g")
    // .attr("transform", "translate("+svgWidth/2+", "+svgHeight/2+")")
    .selectAll("path")
    .data(pie(dataSet))

pieElements.enter()
    .append("path")
    .attr("class", "pie")
    .attr("d", arc)
    .attr("transform", "translate("+svgWidth/2+", "+svgHeight/2+")")
    .style("fill", function(d,i){
        return ["rgba(242, 231, 84, 0.5)", "rgba(81, 176, 232, 0.5)","rgba(48, 173, 69, 0.5)","rgba(219, 50, 50, 0.5)","rgba(174, 67, 232, 0.5)"][i];
    })

