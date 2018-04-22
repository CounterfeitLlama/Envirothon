function initGraph(uid, numdays) {
	var dates = [];
    var dataList = []

	for(var i=numdays-1;i>=0;i--) {
		day = new Date();
		day.setDate(day.getDate() - i);
		dates.push(dateToStr(day));
	}

	getDataDateRange(uid,dates.reverse(),'total',dataList.reverse(),function() {
		createGraph(dataList, dates);
	});
}

function createGraph(dataList, dates, id="myChart") {
    dates.reverse();
    dataList.reverse();
    if (dataList.length < dates.length) {
        dates = dates.slice(dates.length - dataList.length)
    }
    
    var ctx = document.getElementById(id);
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
           labels: dates,
           datasets: [{
               fill: false,
               label: 'Metric tons of C02',
               data: dataList, //use data input from firebase here, plug in some sort of measurement system
               backgroundColor: ['rgba(255, 99, 132, 0.2)'],
               borderColor: ['rgba(255,99,132,1)'],
               borderWidth: 3
           }]
        },
        options: {
            scales: {
                yAxes: [{
                   ticks: {
                       beginAtZero: true
                   }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

