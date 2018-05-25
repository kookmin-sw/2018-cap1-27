"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chart_js_1 = require("chart.js");
// alternative:
// import chartjs = require('chart.js');
// => chartjs.Chart
var chart = new chart_js_1.Chart(new CanvasRenderingContext2D(), {
    type: 'bar',
    data: {
        labels: ['group 1'],
        datasets: [
            {
                backgroundColor: '#000000',
                borderWidth: 1,
                label: 'test',
                data: [1]
            }
        ]
    },
    options: {
        hover: {
            intersect: true
        },
        onHover: function (ev, points) {
            return;
        },
        title: {
            text: ["foo", "bar"]
        },
        tooltips: {
            filter: function (data) { return Number(data.yLabel) > 0; },
            intersect: true,
            itemSort: function (a, b) { return Math.random() - 0.5; },
            position: "average",
            caretPadding: 2,
            displayColors: true,
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 1,
        },
        scales: {
            xAxes: [{
                    ticks: {
                        callback: Math.floor
                    },
                    gridLines: {
                        display: false,
                        borderDash: [5, 15],
                        borderDashOffset: 2,
                        zeroLineBorderDash: [5, 15],
                        zeroLineBorderDashOffset: 2
                    }
                }]
        },
        legend: {
            display: true,
            labels: {
                usePointStyle: true,
                padding: 40
            }
        },
        devicePixelRatio: 2,
    }
});
chart.update();
console.log(chart.ctx && chart.ctx.font);
console.log(chart.canvas && chart.canvas.tagName);
if (chart.chartArea) {
    console.log(chart.chartArea.top);
    console.log(chart.chartArea.right);
    console.log(chart.chartArea.bottom);
    console.log(chart.chartArea.left);
}
// http://www.chartjs.org/docs/latest/configuration/tooltip.html#position-modes
chart_js_1.Chart.Tooltip.positioners.custom = function (elements, eventPosition) {
    return {
        x: eventPosition.x,
        y: eventPosition.y + 10
    };
};
