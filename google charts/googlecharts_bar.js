google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Month", "Temperature", { role: "style" } ],
        ["January", -2.4, "rgb(226, 38, 38)"],
        ["Feburary", 0.4, "rgb(226, 116, 38)"],
        ["March", 5.7, "rgb(227, 230, 49)"],
        ["April", 12.5, "rgb(161, 230, 49)"],
        ["May", 17.8, "rgb(25, 194, 84)"],
        ["June", 22.2, "rgb(24, 224, 171)"],
        ["July", 24.9, "rgb(24, 224, 221)"],
        ["August", 25.7, "rgb(23, 167, 215)"],
        ["September", 21.2, "rgb(23, 97, 215)"],
        ["October", 14.8, "rgb(76, 30, 214)"],
        ["November", 7.2, "rgb(208, 39, 231)"],
        ["December", 0.4, "rgb(231, 39, 112)"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "1981-2010 monthly average of temperature(Seoul)",
        width: 1600,
        height: 600,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(view, options);
  }