function show_irmi_chart(ele_id, url) {
	console.log(url);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            new Chart(document.getElementById(ele_id), data);
       	} else {
	       	console.log("error");
       	}
    };
    xhttp.open("GET", url, true);
    xhttp.send(); 
}

// function showData(data) {
    // new Chart(document.getElementById("bar-chart"),{
    //     type: 'bar',
    //     data: {
    //         labels: ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    //         datasets: [{
    //             label: '1981-2010 monthly average of temperature (Seoul)',
    //             data: [-2.4, 0.4, 5.7, 12.5, 17.8, 22.2, 24.9, 25.7, 21.2, 14.8, 7.2, 0.4],
    //             backgroundColor: [
    //                 'rgba(226, 38, 38, 0.2)',
    //                 'rgba(226, 116, 38, 0.2)',
    //                 'rgba(227, 230, 49, 0.2)',
    //                 'rgba(161, 230, 49, 0.2)',
    //                 'rgba(25, 194, 84, 0.2)',
    //                 'rgba(24, 224, 171, 0.2)',
    //                 'rgba(24, 224, 221, 0.2)',
    //                 'rgba(23, 167, 215, 0.2)',
    //                 'rgba(23, 97, 215, 0.2)',
    //                 'rgba(76, 30, 214, 0.2)',
    //                 'rgba(208, 39, 231, 0.2)',
    //                 'rgba(231, 39, 112, 0.2)'
    //             ],
    //             borderColor: [
    //             'rgba(226, 38, 38, 1)',
    //                 'rgba(226, 116, 38, 1)',
    //                 'rgba(227, 230, 49, 1)',
    //                 'rgba(161, 230, 49, 1)',
    //                 'rgba(25, 194, 84, 1)',
    //                 'rgba(24, 224, 171, 1)',
    //                 'rgba(24, 224, 221, 1)',
    //                 'rgba(23, 167, 215, 1)',
    //                 'rgba(23, 97, 215, 1)',
    //                 'rgba(76, 30, 214, 1)',
    //                 'rgba(208, 39, 231, 1)',
    //                 'rgba(231, 39, 112, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero:true
    //                 }
    //             }]
    //         }
    //     }
    // });

    

//     new Chart(document.getElementById("bar-chart"), data);
// }

// function irmi_chartjs() {
//     getData("./irmi_chart_bar.json");
// }

// irmi_chartjs();