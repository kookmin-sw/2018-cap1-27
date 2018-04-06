
      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['10s', 21],
          ['20s', 42],
          ['30s', 20],
          ['40s', 11],
          ['50s', 7]
        ]);

        // Set chart options
    
        var options = {
              width: 1000,
              height: 700,
              title: 'Percentage of Woman who use instagram',
              colors: ["rgb(242, 231, 84)", "rgb(81, 176, 232)","rgb(48, 173, 69)","rgb(219, 50, 50)","rgb(174, 67, 232)"]
          };
        

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }