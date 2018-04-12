var dataset = [-2.4, 0.4, 5.7, 12.5, 17.8, 22.2, 24.9, 25.7, 21.2, 14.8, 7.2, 0.4];

var svg = d3.select("svg");

svg.selectAll("bar")
    .data(dataset)
    .enter().append("rect")
    .attr("height", function (d, i) { return d })
    .attr("width", 40)
    .attr("x", function (d, i) { return (50 * i) })
    .attr("y", function (d, i) { return (100 - dataset[i]) });

