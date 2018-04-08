google.charts.load('current', {packages: ['corechart']});     

function drawChart() {
    // Define the chart to be drawn.
    var data = google.visualization.arrayToDataTable([
       ['Age', 'Male', 'Female'],
       ['0s',  424685, 401302],
       ['10s',  599453, 547056],
       ['20s',  742981, 745963],
       ['30s',  910258, 891984],
       ['40s',  870688, 865091],
       ['50s',  763881, 812455],
       ['60s',  438938, 476794],
       ['70s',  234147, 285892],
       ['80s',  48952, 106184],
       ['90s',  6357, 18331],
       ['100s',  996, 2930]
    ]);

    var options = {title: 'Populations per gender in 2012 Seoul'};  

    // Instantiate and draw the chart.
    var chart = new google.visualization.ColumnChart(document.getElementById('container'));
    chart.draw(data, options);
 }
 google.charts.setOnLoadCallback(drawChart);