
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
        data.addColumn('string', 'Number');
        data.addColumn('number', 'temperature');
        data.addRows([
          ['January', -2.4],
          ['Feburary', 0.4],
          ['March', 5.7],
          ['April', 12.5],
          ['May', 17.8],
          ['June', 22.2],
          ['July', 24.9],
          ['August', 25.7],
          ['September', 21.2],
          ['October', 14.8],
          ['November', 7.2],
          ['December', 0.4]
        ]);

        // Set chart options
        var options = {
              width: 900,
              height: 600,
              title: '1981-2010 monthly average of temperature (Seoul)'
          };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }