var svgWidth = 900;  //320
var svgHeight = 400;  //240
var offsetX = 30;  //45
var offsetY = 35;  //10
var barElements;
var dataSet = [-2.4, 0.4, 5.7, 12.5, 17.8, 22.2, 24.9, 25.7, 21.2, 14.8, 7.2, 0.4];
var dataMax = 300;  //300
var barWidth = 20;  //20
var barMargin = 50;  //5

barElements = d3.select("#myGraph")
            .selectAll("rect")
            .data(dataSet)

        barElements.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("height", function(d,i){
                return 0;
            })
            .attr("width", barWidth)
            .attr("x", function(d,i){
                return i*(barWidth+barMargin) + offsetX;
            })
            // .attr("y", function(d,i){
            //     return svgHeight-d-offsetY;
            // }) 
            .attr("y", svgHeight-offsetY) 
            
            .on("mouseover", function(){
                d3.select(this)
                .style("fill", "rgb(235,55,85)")
            })
            .on("mouseout", function(){
                d3.select(this)
                .style("fill", "rgba(226, 38, 38, 0.2)")
            })
            
            .transition()
            .duration(1000)
            .delay(function(d,i){
                return i*100;
            })
            .attr("y", function(d,i){
                return svgHeight-d*10-offsetY;
            })
            .attr("height", function(d,i){
                return d*10;
            })
           
        barElements.enter()
            .append("text")
            .attr("class", "barNum")
            .attr("x", function(d,i){
                return i*(barWidth+barMargin) + 10 + offsetX;
            })
            .attr("y", svgHeight-5-offsetY)
            .text(function(d,i){
                return d;
            })

var yScale = d3.scale.linear()
            .domain([0,dataMax])
            .range([dataMax,0])

        d3.select("#myGraph").append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+offsetX+","+((svgHeight-300)-offsetY)+")")
            .call(
                d3.svg.axis()
                .scale(yScale)
                .orient("left")
            )
        d3.select("#myGraph")
            .append("rect")
            .attr("class", "axis_x")
            .attr("width", svgWidth)
            .attr("height", "1")
            .attr("transform", "translate("+offsetX+", "+(svgHeight-offsetY)+")")

        barElements.enter()
            .append("text")
            .attr("class", "barName")
            .attr("x", function(d,i){
                return i*(barWidth+barMargin) + 10 + offsetX;
            })
            .attr("y", svgHeight-offsetY+15)
            .text(function(d,i){
                return ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][i];
            })