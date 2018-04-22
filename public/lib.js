// Grabs user data for given date (mm-dd-yyyy)
function getData(uid,date,field,retarray,func) {
	//console.log(db.collection('users').doc(uid).collection(date).get());
	db.collection('users').doc(uid).collection(date).get().then(function(d){
		console.log(d);
		d.forEach(function(doc) {
			console.log(doc.id, "=>", doc.get(field));
			retarray.push(doc.get(field));
		});
		func();
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
			});
		}
	}
	func();
}
