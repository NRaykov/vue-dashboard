const chartOptions = {
    line: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            intersect: false
        },
        hover: {
            intersect: true
        },
        plugins: {
            filler: {
                propagate: false
            }
        },
        scales: {
            xAxes: [{
                reverse: true,
                gridLines: {
                color: "rgba(0,0,0,0.0)"
                }
            }],
            yAxes: [{
                ticks: {
                stepSize: 1000
                },
                display: true,
                borderDash: [3, 3],
                gridLines: {
                    color: "rgba(0,0,0,0.0)"
                }
            }]
        }
    },
    pie: {
        responsive: !window.MSInputMethodContext,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        cutoutPercentage: 75 
    },
    bar: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false
                },
                stacked: false,
                ticks: {
                    stepSize: 20
                }
            }],
            xAxes: [{
                stacked: false,
                gridLines: {
                    color: "transparent"
                }
            }]
        }
    }
}

export { chartOptions }