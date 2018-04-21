function initGraph(user) {
	var numdays = 6;
	var dates = [];
    var dataList = []

	for(var i=numdays-1;i>=0;i--) {
		day = new Date();
		day.setDate(day.getDate() - i);
		dates.push(dateToStr(day));
	}

    // var user = firebase.auth().currentUser;
    var uid = user.uid;

	getDataDateRange(uid,dates,'total',dataList,function() {
		createGraph(dataList, dates);
	});
}

function createGraph(dataList, dates) {
    console.log("init graph")
    console.log(dataList);
    // console.log(dataList[0])
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
       labels: dates,
       datasets: [{
           fill: false,
           label: 'Metric tons of C02',
           data: dataList, //use data input from firebase here, plug in some sort of measurement system
           backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
               'rgba(255,99,132,1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 5
       }]
    },
    options: {
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero: true
               }
           }]
       }
    }
   });
}

function dateToStr(date) {
    var dateStr = padStr(1 + date.getMonth()) + "-" +
                  padStr(date.getDate()) + "-" +
                  padStr(date.getFullYear());
    return dateStr
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}
