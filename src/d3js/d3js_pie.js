var svgWidth = 600;              
var svgHeight = 600;             
var dataSet = [21, 41, 20, 11, 7];     
       
var pie = d3.layout.pie()       
var arc = d3.svg.arc().innerRadius(0).outerRadius(220);

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
.attrTween("d",function(d,i){   
     var interpolate = d3.interpolate(
        //각 부분의 시작 각도
        {startAngle : d.startAngle, endAngle : d.startAngle},
        //각 부분의 종료 각도
        {startAngle : d.startAngle, endAngle : d.endAngle}
    );
     return function(t){
         return arc(interpolate(t));   
     }
})

pieElements
.append("text")        
.attr("class","pieNum")
.attr("transform",function(d,i){
     return "translate("+arc.centroid(d)+")";
})
.text(function(d,i){
     return d.value;   
})
