var result_list = JSON.parse(document.getElementById("myVar").value);
console.log(result_list);
var lineChartData = {
  labels: result_list.labels,
  // labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
  datasets: [
    {
      yAxisID: "y-axis-1",
      label: "Student1",
      data: result_list.info,
      borderColor: window.chartColors.red,
      backgroundColor: window.chartColors.red,
      fill: false
    }
  ]
};
//   var scatterChartData = {
//     // labels: result_list.labels,
//     labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
//     datasets: [
//       {
//         label: "Student1",
//         xAxisID: "x",
//         yAxisID: "y",
//         borderColor: window.chartColors.red,
//         backgroundColor: window.chartColors.red,
//         data: result_list.points,
//         fill: false
//       }
//     ]
//   };

window.onload = function() {
  var ctx = document.getElementById("canvas").getContext("2d");
  // var ctx2 = document.getElementById("myPieChart").getContext("2d");
  // window.myDoughnut = new Chart(ctx2, config);
  // // window.myLine = new Chart(ctx, {
  // //   type: "scatter",
  // //   data: scatterChartData,
  // //   options: {
  // //     responsive: true,
  // //     hoverMode: "nearest",
  // //     intersect: true,
  // //     title: {
  // //       display: true,
  // //       text: "Attention Span Time vs. Score"
  // //     },
  // //     scales: {
  // //       x: {
  // //         position: "bottom"
  // //       },
  // //       y: {
  // //         type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
  // //         display: true,
  // //         position: "left"
  // //       }
  // //     }
  // //   }
  // // });
  window.myLine = Chart.Line(ctx, {
    data: lineChartData,
    options: {
      legend: {
        display: true,
        labels: {
          fontColor: "rgb(255, 99, 132)"
        }
      },
      responsive: true,
      hoverMode: "index",
      stacked: false,
      title: {
        display: true,
        text: "Attention Span Time vs. Score"
      },
      scales: {
        //   xAxes: [
        //     {
        //       type: "linear",
        //       id: "x-axis-m"
        //       //   ticks: {
        //       //     max: 8,
        //       //     min: 0,
        //       //     stepSize: 1
        //       //   }
        //     }
        //   ],

        yAxes: [
          {
            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: "left",
            id: "y-axis-1"
          }
          //  ,
          // {
          //   type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          //   display: true,
          //   position: "right",
          //   id: "y-axis-2",

          //   // grid line settings
          //   gridLines: {
          //     drawOnChartArea: false // only want the grid lines for one axis to show up
          //   }
          // }
        ]
      }
    }
  });
};

var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

var config = {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
        backgroundColor: [
          window.chartColors.red,
          window.chartColors.orange,
          window.chartColors.yellow,
          window.chartColors.green,
          window.chartColors.blue
        ],
        label: "Dataset 1"
      }
    ],
    labels: ["Red", "Orange", "Yellow", "Green", "Blue"]
  },
  options: {
    responsive: true,
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Chart.js Doughnut Chart"
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
};

const speech_data = JSON.parse(document.getElementById("speech_data").value);
google.charts.load("current", { packages: ["timeline"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var container = document.getElementById("example5.1");
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();
  const rowsData = speech_data.map(data => {
    return [
      data.value,
      "Student 1",
      new Date(0, 0, 0, 0, 0, data.start),
      new Date(0, 0, 0, 0, 0, data.end)
    ];
  });
  dataTable.addColumn({ type: "string", id: "Word" });
  dataTable.addColumn({ type: "string", id: "Student Name" });
  dataTable.addColumn({ type: "date", id: "Start Time" });
  dataTable.addColumn({ type: "date", id: "End Time" });
  dataTable.addRows(rowsData);
  //   dataTable.addRows([
  //     [
  //       "Magnolia Room",
  //       "Beginning JavaScript",
  //       new Date(0, 0, 0, 12, 0, 0),
  //       new Date(0, 0, 0, 13, 30, 0)
  //     ],
  //     [
  //       "Magnolia Room",
  //       "Intermediate JavaScript",
  //       new Date(0, 0, 0, 14, 0, 0),
  //       new Date(0, 0, 0, 15, 30, 0)
  //     ],
  //     [
  //       "Magnolia Room",
  //       "Advanced JavaScript",
  //       new Date(0, 0, 0, 16, 0, 0),
  //       new Date(0, 0, 0, 17, 30, 0)
  //     ],
  //     [
  //       "Willow Room",
  //       "Beginning Google Charts",
  //       new Date(0, 0, 0, 12, 30, 0),
  //       new Date(0, 0, 0, 14, 0, 0)
  //     ],
  //     [
  //       "Willow Room",
  //       "Intermediate Google Charts",
  //       new Date(0, 0, 0, 14, 30, 0),
  //       new Date(0, 0, 0, 16, 0, 0)
  //     ],
  //     [
  //       "Willow Room",
  //       "Advanced Google Charts",
  //       new Date(0, 0, 0, 16, 30, 0),
  //       new Date(0, 0, 0, 18, 0, 0)
  //     ]
  //   ]);
  var options = {
    timeline: { colorByRowLabel: true }
  };
  chart.draw(dataTable, options);
}
