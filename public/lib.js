// Grabs user data for given date (mm-dd-yyyy)
function getData(uid,date,field,retarray,func,endfunc=null) {
	//console.log(db.collection('users').doc(uid).collection(date).get());
	db.collection('users').doc(uid).collection(date).doc("data").get().then(function(d){
		var retval = d.data();
		if (retval == undefined || retval[field] == undefined) {
			endfunc();
		}
		else {
			retarray.push(retval[field]);
			func();
		}
	});
}

// Grabs user data for given dates array
function getDataDateRange(uid,dates,field,retarray,endfunc) {
	var range=dates.length;
	index=0;
	function func() {
		console.log("Index: ", index);
		if(index<range) {
			getData(uid,dates[index],field,retarray, function() {
				index++;
				if(index==range){
					endfunc();
				} else {
					func();
				}
			}, endfunc);
		}
	}
	func();
}

// function getAllData(uid, field, retarray, endfunc) {
// 	function func() {
// 		if
// 	}
// 	func();
// }
