
////	url: "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/SUF/MXP/years/2018/months/05?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX",

$(function() {
//	$("#search_form").submit(function(event) {
//		
//		event.preventDefault();
//		//window.location.replace("jsp_pages/searchFlight.jsp");
//		departure = $("#departure").val();
//		destination = $("#destination").val();
//		start_date = $("#start-date").val();
//		end_date = $("#end-date").val();
//		
//		airportName_dep = $('#dep_name').text();
//		airportName_arr = $('#arr_name').text();
//		
//		stopover = "";

//		
//		//verifico che per la tratta ci sia un volo
//		$.ajax({
//			type: 'POST',
//			url: 'checkRoute',
//			data: {
//				'departure': departure,
//				'destination': destination
//			},
//			success: function(data){
//				if(data === "noflights"){
//					showErrorMessage(); //non sono stati trovati voli
//					
//				}
//				else{
//					var json = JSON.parse(data);				
//					parseFlights(json); //voli diretti e con scalo
//				}
//				/*
//				else if(data === "nostopover"){
//					nonStopFlight(); //il volo è diretto
//				}
//				else{
//					stopover = data;
//					stopOverFlight(); //il volo ha uno scalo
//				}*/
//				
//			}
//		});	
		
	//});
});

function parseFlights(flights){
	var one_way = flights.nonstop;
	var stops = flights.stops[0];  //array
	console.log("diretto: " + flights.nonstop);
	console.log("scali: " + flights.stops[0]);
	
	//gestione andata e ritorno
	if(end_date){
		handleOnewayReturn(one_way,stops);
	}
	//gestione solo andata
	else{
		handleOneway(one_way,stops);
	}	
}

function handleOnewayReturn(_oneway,_stops){
	var date = splitDate(start_date);
}

async function handleOneway(oneway_,stops_){
	var date = splitDate(start_date);
	var urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+departure+"/"+destination+"/years/"+date.year+"/months/"+date.month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
	
	var non_stop = "";
	//verifico che ci sia il volo diretto
	if(oneway_){
		$.ajax({
			type: 'GET',
			url: urlString,
			success: function(data){
				non_stop = data;
			}
		});
	}
	//gestione voli con scalo
	var result = new Array();

	for(var j = 0; j < stops_.length; j++){
		//setTimeout(callApi,3000,departure,stops_[j],date,result);
		callApi(departure,stops_[j],date,result);
		await sleep(2000);
	}
	
	console.log(result.length);
		console.log(result+"\n");
	
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

function callApi(from,iata_stop,_date,values){
	
		var urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+from+"/"+iata_stop+"/years/"+_date.year+"/months/"+_date.month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
		$.ajax({
			type:'GET',
			url:urlString,
			async: false,
			success:function(data){
				values.push(data);
			}
		});	
}

function splitDate(dateToSplit){
	var values = dateToSplit.split("/");
	var day = values[0]; //il giorno del volo
	var month = values[1];
	var year = values[2];
	
	var date = {
				day: day,
				month: month,
				year: year
			};
	return date;
}

function nonStopFlight(){
	var values = start_date.split("/");
	var day = values[0]; //il giorno del volo
	var month = values[1];
	var year = values[2];
	var urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+departure+"/"+destination+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
	
	var firstData = "";
	$.ajax({
		type:'GET',
		url: urlString,
		success: function(data){
			firstData = data;
		},
		error: function(error){
			console.log("Resource not found! " + error);
			alert("Resources not found!");
		},
		complete:function(){
			var end_day;
			if(end_date){
				values = end_date.split("/");
				end_day = values[0];
				month = values[1];
				year = values[2];
				urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+destination+"/"+departure+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
				$.ajax({
					type:'GET',
					url: urlString,
					success: function(end_data){
						//console.log(end_data);
						parseData(firstData,end_data,day,end_day);
						
					},
					error: function(error){
						console.log("Resource not found! " + error);
						
					}
				});
				
			}else{
				parseData(firstData,"",day,"");
			}
		}
	});
	
}



function showErrorMessage(){
	alert("Non sono stati trovati voli per la tratta: " + departure + " - " + destination);
}

//function nonStopFlight(){
//	var values = start_date.split("/");
//	var day = values[0]; //il giorno del volo
//	var month = values[1];
//	var year = values[2];
//	var urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+departure+"/"+destination+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
//	
//	var firstData = "";
//	$.ajax({
//		type:'GET',
//		url: urlString,
//		success: function(data){
//			firstData = data;
//		},
//		error: function(error){
//			console.log("Resource not found! " + error);
//			alert("Resources not found!");
//		},
//		complete:function(){
//			var end_day;
//			if(end_date){
//				values = end_date.split("/");
//				end_day = values[0];
//				month = values[1];
//				year = values[2];
//				urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+destination+"/"+departure+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
//				$.ajax({
//					type:'GET',
//					url: urlString,
//					success: function(end_data){
//						//console.log(end_data);
//						parseData(firstData,end_data,day,end_day);
//						
//					},
//					error: function(error){
//						console.log("Resource not found! " + error);
//						
//					}
//				});
//				
//			}else{
//				parseData(firstData,"",day,"");
//			}
//		}
//	});
//	
//}

function stopOverFlight(){

	var values = start_date.split("/");
	var day = values[0]; //il giorno del volo
	var month = values[1];
	var year = values[2];
	var urlString;
	console.log("BREAK: "+stopover);
	//viaggio di sola andata
	
		urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+departure+"/"+stopover+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
		var a_firstRoute = "";
		var a_secondRoute = "";
		var r_firstRoute = "";
		var r_secondRoute = "";
		
		$.ajax({
			type:'GET',
			url: urlString,
			success: function (data){
				a_firstRoute = data;
			},
			complete: function() {
				urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+stopover+"/"+destination+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
				$.ajax({
					type:'GET',
					url: urlString,
					success: function(data_){
						a_secondRoute = data_;
						if(!end_date){
							parseStopoverData(a_firstRoute,a_secondRoute,"","",day,"");
						}
						else{
							values = end_date.split("/");
							end_day = values[0];
							month = values[1];
							year = values[2];
							urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+destination+"/"+stopover+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
							$.ajax({
								type:'GET',
								url: urlString,
								success: function (data_r){
									r_firstRoute = data_r;
								},
								complete: function() {
									urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+stopover+"/"+departure+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
									$.ajax({
										type:'GET',
										url: urlString,
										success: function(data_rr){
											r_secondRoute = data_rr;
											parseStopoverData(a_firstRoute,a_secondRoute,r_firstRoute,r_secondRoute,day,end_day);
										}
									});
								}
							});
						}
					}
				});
			}
			
		});
		
}

function parseData(dep_data,arr_data,start_day,end_day){
	
	var incoming_flights = "";
	var outgoing_flights = "";
	
	for (var i in dep_data.days){
		if(dep_data.days[i].day == start_day){ //match della data selezionata dall'utente con quella presente nella lista di voli
			incoming_flights = JSON.stringify(dep_data.days[i]);
		}
	}
	//console.log("I voli di andata sono: " + JSON.stringify(incoming_flights));
	if(arr_data){
		for (var i in arr_data.days){
			if(arr_data.days[i].day == end_day){ //match della data selezionata dall'utente con quella presente nella lista di voli
				outgoing_flights = JSON.stringify(arr_data.days[i]);
			}
		}
		//console.log("I voli di ritorno sono: " + JSON.stringify(outgoing_flights));
	}
	
	$.ajax({
		type: 'POST',
        url: "search",
        data: {
        	"incoming_flights": incoming_flights,
        	"outgoing_flights": outgoing_flights,
        	"dep": departure,
        	"arr": destination,
        	"startDate": start_date,
        	"endDate": end_date,
        	"dep_name": airportName_dep,
        	"arr_name": airportName_arr
        },
        success: function(data){
            window.location = data;
          } 
    });
	
}

function parseStopoverData(first_route_dep,second_route_dep,first_route_ret,second_route_ret,in_day,out_day){
	//voli di andata
	//se il volo è da A -> B, vengono memorizzati tutti i voli da A -> C && C -> B
	var incoming_flights_fr = "";
	var incoming_flights_sr = "";
	
	//voli di ritorno
	var outgoing_flights_fr = "";
	var outgoing_flights_sr = "";
	
	for (var i in first_route_dep.days){
		if(first_route_dep.days[i].day == in_day){ //match della data selezionata dall'utente con quella presente nella lista di voli
			incoming_flights_fr = JSON.stringify(first_route_dep.days[i]);
		}
	}
	for (var i in second_route_dep.days){
		if(second_route_dep.days[i].day == in_day){ 
			incoming_flights_sr = JSON.stringify(second_route_dep.days[i]);
		}
	}
		

	if(incoming_flights_fr === "" || incoming_flights_sr === ""){
		showErrorMessage();
		return;
	}
	
	//true se è previsto anche il ritorno
	if(out_day){
		for (var i in first_route_dep.days){
			if(first_route_ret.days[i].day == out_day){ 
				outgoing_flights_fr = JSON.stringify(first_route_ret.days[i]);
			}
		}
		for (var i in second_route_ret.days){
			if(second_route_ret.days[i].day == out_day){ 
				outgoing_flights_sr = JSON.stringify(second_route_ret.days[i]);
			}
		}
		
		if(outgoing_flights_fr === "" || outgoing_flights_sr === ""){
			showErrorMessage();
			return;
		}
	}
	
	console.log("A_DAY: " + in_day + "  R_DAY: " + out_day);
	
	console.log("ROUTE 1: " +incoming_flights_fr);
	console.log("ROUTE 2: " +incoming_flights_sr);
	console.log("ROUTE 3: " +outgoing_flights_fr);
	console.log("ROUTE 4: " +outgoing_flights_sr);
	
	$.ajax({
		type: 'POST',
        url: "stopover_search",
        data: {
        	"stopover": stopover,
        	"incoming_flights_fr": incoming_flights_fr,
        	"incoming_flights_sr": incoming_flights_sr,
        	"outgoing_flights_fr": outgoing_flights_fr,
        	"outgoing_flights_sr": outgoing_flights_sr,
        	"dep": departure,
        	"arr": destination,
        	"startDate": start_date,
        	"endDate": end_date,
        	"dep_name": airportName_dep,
        	"arr_name": airportName_arr
        },
        success: function(data){
            window.location = data;
        } 
    });
	
}
