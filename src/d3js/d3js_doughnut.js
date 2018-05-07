var svgWidth = 600;              
var svgHeight = 600;             
var dataSet = [21, 41, 20, 11, 7];     
       
var pie = d3.layout.pie()       
var arc = d3.svg.arc().innerRadius(100).outerRadius(220);

var pieElements = d3.select("#myGraph")
.selectAll("g")                
.data(pie(dataSet))            
.enter()
.append("g")                
.attr("transform","translate("+svgWidth/2+","+svgHeight/2+")")

pieElements             
.append("path")     
.attr("class","pie") 
.attr("d", arc)   
.style("fill", function(d,i){
        return ["rgba(242, 231, 84, 0.5)", "rgba(81, 176, 232, 0.5)","rgba(48, 173, 69, 0.5)","rgba(219, 50, 50, 0.5)","rgba(174, 67, 232, 0.5)"][i];      //표준 20색중 색을 반환
})
.transition()
.ease("linear")               

var textElements = d3.select("#myGraph")
    .append("text")
    .attr("class", "total")
    .attr("transform", "translate("+(svgWidth/2-35)+","+(svgHeight/2+5)+")")
    .text("합계:" + d3.sum(dataSet))


pieElements
.append("text")        
.attr("class","pieNum")
.attr("transform",function(d,i){
     return "translate("+arc.centroid(d)+")";
})
.text(function(d,i){
     return d.value;   
})
