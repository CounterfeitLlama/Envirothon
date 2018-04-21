
// Grabs user data for given date (mm-dd-yyyy)
function getData(uid,date,field,retarray,index,func) {
	db.collection('users').doc(uid).collection(date).get().then(function(d){
		d.forEach(function(doc) {
			retarray[index]=doc.get(field);
		}).then(func());
	});
}

