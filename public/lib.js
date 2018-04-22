// Grabs user data for given date (mm-dd-yyyy)
function getData(uid,date,field,retarray,func,endfunc=null) {
	db.collection('users').doc(uid).collection(date).doc("data").get().then(function(d) {
		console.log(date);
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

// Grabs user data for given dates array
function getAllData(uid,field,retarray,endfunc) {
	var date = new Date();
	function func() {
		getData(uid,dateToStr(date),field,retarray, function() {
			date.setDate(date.getDate() - 1);
			func();
		}, endfunc);
	}
	func();
}

function setTotal(uid,date,value,func=function(){}) {
	db.collection('users').doc(uid).collection(date).doc('data').set({
		total: value
	}).then(func);
}

function addToTotal(uid,date,value,func=function(){}) {
	var rets=[];
	getData(uid,date,'total',rets,function(){
		var nval = 0;
		if (rets.length>0) nval=rets[0];
		setTotal(uid,date,value+nval,function(){
			func();
		});
	});
}

function calcLaundry(day, temp, dry) { // TODO Complete...
	console.log(day.value + " ");
}

function getUid() {
	return firebase.auth().currentUser.uid;
}

function calcDriving(day, miles, mpg) {
	// CO2 emissions per mile * miles = total carbon emissions in grams
	const total =  (0.008887/(mpg.value)) * miles.value;
	// Convert the damn date
	date = new Date(day.value);
	date.setDate(date.getDate()+1);
	day = dateToStr(date);

	uid = getUid();
	addToTotal(uid,day,total,function(){
		// Refresh page
		window.location=window.location;
	});
};

function chooseForm() {
	var forms = [
		'<div class="input-field"><input type="hidden" name="activiy" value="driving"/><label>Activity Type: Driving</label><input type="text" disabled/></div><div class="input-field"><input type="date" id="date"/></div><div class="input-field"><label name="miles">Miles Driven:</label><input id="miles" type="text"/></div><div class="input-field"><label name="mpg">Car\'s MPG:</label><input type="text" id="mpg"></input><button type="button" onclick="calcDriving(date, miles, mpg)">Calculate</button></div>',
		'<div class="input-field"><input type="hidden" name="activiy" value="laundry"/><label>Activity Type: Laundry</label><input type="text" disabled/></div><div class="input-field"><input type="date" id="date"/></div><div class="input-field"><label name="temp">Load Temperature:</label><input id="temp" type="text"/></div><div class="input-field"><label name="dry">Used dryer?:</label><input type="text" id="dry"/><button type="button" onclick="calcLaundry(date, temp, dry)">Calculate</button></div>'
	]

	var i = document.getElementById('activity').value;
	if(forms[i]!=null){
		document.getElementById('activity-form').innerHTML = forms[i];
	} else {
		document.getElementById('activity-form').innerHTML = '';
	}
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
