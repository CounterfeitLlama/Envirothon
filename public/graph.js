function initGraph(user) {
    var day5 = new Date();
    var day4 = new Date();
    day4.setDate(day5.getDate() - 1);
    var day3 = new Date();
    day3.setDate(day4.getDate() - 1);
    var day2 = new Date();
    day2.setDate(day3.getDate() - 1);
    var day1 = new Date();
    day1.setDate(day2.getDate() - 1);

    var dataList = []
    // var user = firebase.auth().currentUser;
    var uid = user.uid;
    db.collection("users").doc(uid).collection(dateToStr(day5)).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.get("total"));
                dataList.push(doc.get("total"));
            });
        }).then(db.collection("users").doc(uid).collection(dateToStr(day4)).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.get("total"));
                    dataList.push(doc.get("total"));
                });
        })).then(db.collection("users").doc(uid).collection(dateToStr(day3)).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.get("total"));
                    dataList.push(doc.get("total"));
                });
        })).then(db.collection("users").doc(uid).collection(dateToStr(day2)).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.get("total"));
                    dataList.push(doc.get("total"));
                });
        })).then(function() {
            createGraph(dataList);
        })
}

function createGraph(dataList) {

    console.log("init graph")
   console.log(dataList);
   // console.log(dataList[0])
   var ctx = document.getElementById("myChart");
   var myChart = new Chart(ctx, {
       type: 'line',
       data: {
           labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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