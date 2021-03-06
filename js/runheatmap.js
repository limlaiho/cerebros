var date;
var timeStartJSON;
var timeEndJSON;
var startHour;
var endHour;
var result;
var filterResult;
var uuid;
var individualMode;

var dateSet;
var hourSet;
var minuteSet;

var heatmapInstance;

var beacon34;
var beacon24;
var beacon22;
var beacon35;
var beacon23;
var beacon36;
var beacon37;

$(document).ready(function() {
	initBeacon();

	//dateSet = false;
	//hourSet = false;
	//minuteSet = false;

	// Setup display
	$("#visitorname").hide();
	$("#resultable").hide();

	$('.btn-primary').on('click', function(){
		if ($(this).find('input').attr('id') === "individual") {
			individualMode = true;
			$("#visitorname").show();
			$("#resultable").hide();
		} else {
			individualMode = false;
			$("#visitorname").hide();
			$("#resultable").show();
		}
	});

	$('#selectedVisitor').change(function(){
		uuid = $('#selectedVisitor :selected').val();
		console.log(uuid);
	});

	// Initialise datepicker
    $("#datepicker").datepicker({
    	autoclose: true,
    	format: 'yyyy/mm/dd'
    });

	$('#ex1').slider({
		formatter: function(value) {
			return 'Selected Time: ' + $('#ex1').val() + ":00";
		}
	});

	$('#ex1').change(function(){
		minuteSet = true;
		filterByMinutes($('#ex1').val());
		/*
		if(individualMode) {
			getIndividualRequest() 
		} else {
			getRequest();
		}
		*/

		// if(hourSet && dateSet) {
			generateHeatmap();
		// }
		
	});

	$('#datepicker').change(function(){
		dateSet = true;
		date = $('#datepicker').data('datepicker').getFormattedDate('yyyy-mm-dd');
		if(individualMode) {
			getIndividualRequest() 
		} else {
			getRequest();
		}
		// if(hourSet && minuteSet) {
			generateHeatmap();
		// }
	});

	$('#selectedHour').change(function(){
		hourSet = true;
		hour = $('#selectedHour :selected').val();

		if(hour < 10) {
			startHour = "0" + hour + ":00";
			if(hour == 9) {
				endHour = "10:00";
			} else {
				hour++;
				endHour = "0" + hour + ":00";
			}
		} else {
			startHour = hour + ":00";
			hour++;
			endHour = hour + ":00"; 
		}

		$("#startTimeLabel").text(startHour);
		$("#endTimeLabel").text(endHour);

		if(individualMode) {
			getIndividualRequest() 
		} else {
			getRequest();
		}
		// if(minuteSet && dateSet) {
			generateHeatmap();
		// }
	});
});

// Initiate beacon's coordinates
function initBeacon() {

	// Create configuration object
	var config = {
	  container: document.getElementById('heatmapContainer'),
	  radius: 200,
	  maxOpacity: 0.6,
	  minOpacity: 0,
	  blur: .75,
	};

	heatmapInstance = h337.create(config);

	beacon22 = {
		id: 22,
		y: 500,
		x: 75,
		value: 0
	};
	
	beacon23 = {
		id: 23,
		y: 500,
		x: 345,
		value: 0
	};
	beacon24 = {
		id: 24,
		y: 500,
		x: 540,
		value: 0
	};
	beacon34 = {
		id: 34,
		y: 500,
		x: 760,
		value: 0
	};
	beacon35 = {
		id: 35,
		y: 500,
		x: 985,
		value: 0
	};
	beacon36 = {
		id: 36,
		y: 280,
		x: 875,
		value: 0
	};
	beacon37 = {
		id: 37,
		y: 280,
		x: 1060,
		value: 0
	};
}

// Reset beacon's value to zero
function resetValue() {

	beacon34.value = 0;
	beacon24.value = 0;
	beacon22.value = 0;
	beacon35.value = 0;
	beacon23.value = 0;
	beacon36.value = 0;
	beacon37.value = 0;
}

// Filter result by minutes
function filterByMinutes(value) {
	
	filterResult = [];
	for (var i in result) {
		for (var j in result[i]) {
			if(result[i].minute == value && filterResult.indexOf(result[i]) == -1) {
				filterResult.push(result[i]);
			}
		}
	}
}

// Generate heatmap
function generateHeatmap() {

	for (var i in filterResult) {
		if(filterResult[i].beacon_id == "iot34") {
			beacon34.value = filterResult[i].count * 2;
			console.log(beacon34.value);
		} else if (filterResult[i].beacon_id == "iot24") {
			beacon24.value = filterResult[i].count * 2;
			console.log(beacon24.value);
		} else if (filterResult[i].beacon_id == "iot22") {
			beacon22.value = filterResult[i].count * 2;
		} else if (filterResult[i].beacon_id == "iot35") {
			beacon35.value = filterResult[i].count * 2;
		} else if (filterResult[i].beacon_id == "iot23") {
			beacon23.value = filterResult[i].count * 2;
		} else if (filterResult[i].beacon_id == "iot36") {
			beacon36.value = filterResult[i].count * 2;
		} else if (filterResult[i].beacon_id == "iot37") {
			beacon37.value = filterResult[i].count * 2;
		}
	}

	var beacons = [beacon34, beacon24, beacon22, beacon35, beacon23, beacon36, beacon37];
	
	var dataValue = {
		min: 0,
		max: 10,
  		data: beacons
	};

	heatmapInstance.setData(dataValue);
	heatmapInstance.addData(beacons);
	heatmapInstance.repaint();

	generateResultTable(beacons);

	resetValue();
}

function generateResultTable(beacons) {

	for (var i in beacons) {
		if(beacons[i].id == 34) {
			//console.log(beacons[i].value);
			$("#result34").text(beacons[i].value);
		} else if(beacons[i].id == 24) {
			//console.log(beacons[i].value);
			$("#result24").text(beacons[i].value);
		} else if(beacons[i].id == 22) {
			//console.log(beacons[i].value);
			$("#result22").text(beacons[i].value);
		} else if(beacons[i].id == 35) {
			//console.log(beacons[i].value);
			$("#result35").text(beacons[i].value);
		} else if(beacons[i].id == 23) {
			//console.log(beacons[i].value);
			$("#result23").text(beacons[i].value);
		} else if(beacons[i].id == 36) {
			//console.log(beacons[i].value);
			$("#result36").text(beacons[i].value);
		} else if(beacons[i].id == 37) {
			//console.log(beacons[i].value);
			$("#result37").text(beacons[i].value);
		}
	}

	//console.log(beacons);
}

// Get request with timeStart and timeEnd - All visitors mode
function getRequest() {

	timeStartJSON = date + " " + startHour;
	timeEndJSON = date + " " + endHour;

	console.log("Start time: " + timeStartJSON);
	console.log("End time: " + timeEndJSON);

	getData = {"timeStart": timeStartJSON, "timeEnd": timeEndJSON};

	var settings = {
	  "async": false,
	  "crossDomain": true,
	  "url": "https://derrickgoh.me:8443/IoTWebService/iotServlet",
	  "method": "GET",
	  "headers": {
		    "timestart": timeStartJSON,
		    "timeend": timeEndJSON,
		    "cache-control": "no-cache",
		    "postman-token": "064a582d-88f5-398c-0c55-ade10d7746e9"
	  	}
	}

	$.ajax(settings).done(function (response) {
  		console.log("Array size: " + response.length);
  		result = response;
	});
}

// Get request with timeStart and timeEnd - All visitors mode
function getIndividualRequest() {

	timeStartJSON = date + " " + startHour;
	timeEndJSON = date + " " + endHour;

	console.log("Start time: " + timeStartJSON);
	console.log("End time: " + timeEndJSON);
	console.log("uuid: " + uuid);

	getData = {"timeStart": timeStartJSON, "timeEnd": timeEndJSON, "uuid": uuid};

	var settings = {
	  "async": false,
	  "crossDomain": true,
	  "url": "https://derrickgoh.me:8443/IoTWebService/uuidServlet",
	  "method": "GET",
	  "headers": {
		    "timestart": timeStartJSON,
		    "timeend": timeEndJSON,
		    "uuid" : uuid,
		    "cache-control": "no-cache",
		    "postman-token": "064a582d-88f5-398c-0c55-ade10d7746e9"
	  	}
	}

	$.ajax(settings).done(function (response) {
  		console.log("Array size: " + response.length);
  		result = response;
	});
}
