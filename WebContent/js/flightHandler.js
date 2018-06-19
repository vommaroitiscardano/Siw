
/**
 * prendo con una chiamata get alla servlet i dati memorizzati nella session
 */
$(function(){
	$.ajax({
		url : 'checkRoute',
		success: function(data){
			var obj = JSON.parse(data);
			handleResult(obj);
		}
	});
})

var adults_number = 0;
var children_number = 0;
//variabile necessaria per l'attesa delle chiamate ajax all'api ryanair
var pendingCall = null;
var pending_call_time = 2000; //secondi


/*
 * gestione del risultato
 */
function handleResult(object){
	
	adults_number = object.adults;
	children_number = object.children;
	
	if(object.noflights){
		showErrorMessage();
		return;
	}
	
	showAnimation();
	
	if(object.end_date){
		oneway_returnFlights(object);
		oneway_returnStops(object);
	}
	else{
		//solo voli di andata
		onewayFlights(object);
		onewayStops(object);
	}
}

/**  VOLI DIRETTI SENZA SCALO: ANDATA
 * 
 * @param _object  JSON contenente tutte le info dei voli
 */
function onewayFlights(_object) {
	if(_object.flights.nonstop){
		var values = _object.start_date.split("/");
		var day = values[0]; //il giorno del volo
		var month = values[1];
		var year = values[2];
		
		var origin = _object.origin_iata; 
		var destination = _object.destination_iata;
		var origin_name = _object.dep_name;
		var destination_name = _object.arr_name;
		var urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+origin+"/"+destination+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
		
		$.ajax({
			type:'GET',
			url: urlString,
			success: function(data){
				var availableFlights = parseReceivedJson(data,day);
				var tickets = new Array();
				for(var i in availableFlights){
					var n = availableFlights[i].number;
					var dt = availableFlights[i].departureTime;
					var at = availableFlights[i].arrivalTime;
					var t = new Ticket(n,dt,at,origin,destination,origin_name,destination_name,_object.start_date);
					tickets.push(t);
				}
				
				displayOneWayNonstop(tickets);
			}
		});
	}
}


/** VOLI DIRETTI SENZA SCALO: ANDATA / RITORNO
 * 
 * @param _object JSON contenente tutte le info dei voli
 */
function oneway_returnFlights(_object){
//controllo per verificare se è presente il volo di andata: se il volo di andata non è presente, non sono stati trovati voli
	if(_object.flights.nonstop){
		
		var start_date = _object.start_date;
		var end_date = _object.end_date;
		var values = start_date.split("/");
		var day = values[0]; //il giorno del volo
		var month = values[1];
		var year = values[2];
		
		var origin = _object.origin_iata; 
		var destination = _object.destination_iata;
		var origin_name = _object.dep_name;
		var destination_name = _object.arr_name;
		
		
		var oneway = "";
		var _return = "";
		
		var urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+origin+"/"+destination+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";

		$.ajax({
			type:'GET',
			url: urlString,
			success: function(data){
				oneway = data;
			},
			complete: function(){
				values = end_date.split("/");
				var r_day = values[0]; 
				month = values[1];
				year = values[2];
				
				urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+destination+"/"+origin+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
				$.ajax({
					type:'GET',
					url: urlString,
					success: function(_data){
						_return = _data;
					},
					complete: function(){
						var oneway_flights = parseReceivedJson(oneway,day);
						var return_flights = parseReceivedJson(_return,r_day);
						if(oneway_flights === "" || return_flights === "") {
							showFlightNotFoundWindow();
						}
						else{
							var ticket1 = buildTicket(oneway_flights, origin, destination,"", origin_name, destination_name,start_date);
							var ticket2 = buildTicket(return_flights, destination, origin,"", destination_name, origin_name, end_date);
							displayOnewayReturnFligths(ticket1,ticket2);
						}
					}
				});
			}
		});
	}

	
}


/** VOLI SCALO: ANDATA 
 * 
 * @param _object JSON contenente tutte le info dei voli
 */

function onewayStops(_object){
	var values = _object.start_date.split("/");
	var day = values[0]; // il giorno del volo
	var month = values[1];
	var year = values[2];
	
	var origin = _object.origin_iata; 
	var destination = _object.destination_iata;
	var origin_name = _object.dep_name;
	var destination_name = _object.arr_name;
	
	var array_stops = JSON.stringify(_object.flights.stops);
	array_stops = JSON.parse(array_stops);
	
	var array_stops_name = JSON.stringify(_object.stops_name);
	array_stops_name = JSON.parse(array_stops_name);
	
	var ajaxRequest = function(){
		var elem = Math.floor(Math.random()*array_stops.length);
		var stop = array_stops[elem];
		console.log("pivot: " + stop);
		var stop_name = array_stops_name[elem].name;
		
		var urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+origin+"/"+stop+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
		var data_f1 = "";
		var data_f2 = "";
		
		urlString ="";
		
		$.ajax({
			type:'GET',
			url: urlString,
			dataType: "json",
			success: function(data){
				data_f1 = data;
			},
			complete: function(){
				urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+stop+"/"+destination+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
				
				urlString ="";
				
				$.ajax({
					type: 'GET',
					url: urlString,
					dataType: "json",
					success: function(_data){
						data_f2 = _data;
					},
					complete: function() {
						var flights_fs = parseReceivedJson(data_f1,day);
						var flights_ss = parseReceivedJson(data_f2,day);
						pendingCall.procID = null;
						if(flights_fs === "" || flights_ss === "") {
							console.log("NON SONO STATI TROVATI VOLI....");
						}else{
							var ticket1 = buildTicket(flights_fs, origin, destination,stop, origin_name, destination_name, _object.start_date);
							var ticket2 = buildTicket(flights_ss, origin, destination,stop, origin_name, destination_name, _object.start_date);
							
//							displayOneWayStop(ticket1,ticket2,_object,i,stop_name);
							displayOneWayStop(ticket1,ticket2,stop_name);
						}
						
						//ora visualizzare i voli falsi
						for(var i in array_stops){
						//	console.log("tappa: " + array_stops[i]);
							stop = array_stops[i];
							stop_name = array_stops_name[i].name;
							flights_fs = createWrongFlight();
							flights_ss = createWrongFlight();
							ticket1 = buildTicket(flights_fs, origin, destination,stop, origin_name, destination_name, _object.start_date);
							ticket2 = buildTicket(flights_ss, origin, destination,stop, origin_name, destination_name, _object.start_date);
							displayOneWayStop(ticket1,ticket2,stop_name);
						}
						setTimeout(hideAnimation,pending_call_time);
					}
				});
			}
		});
	};
	
	if (pendingCall) {
	    clearTimeout(pendingCall);
	}
	pendingCall =  setTimeout(ajaxRequest, pending_call_time); // tempo di attesa


}


/** VOLI SCALO: ANDATA / RITORNO 
 * 
 * @param _object JSON contenente tutte le info dei voli
 */
function oneway_returnStops(_object){
	
	var start_date = _object.start_date;
	var end_date = _object.end_date;
	var values = start_date.split("/");
	var day = values[0]; // il giorno del volo
	var month = values[1];
	var year = values[2];
	
	var origin = _object.origin_iata; 
	var destination = _object.destination_iata;
	var origin_name = _object.dep_name;
	var destination_name = _object.arr_name;
	
	var array_stops = JSON.stringify(_object.flights.stops);
	array_stops = JSON.parse(array_stops);
	
	var array_stops_name = JSON.stringify(_object.stops_name);
	array_stops_name = JSON.parse(array_stops_name);
	
	var ajaxRequest = function(){
		var elem = Math.floor(Math.random()*array_stops.length);
		var stop = array_stops[elem];
		console.log("pivot: " + stop);
		var stop_name = array_stops_name[elem].name;
		
		var data_f1 = "";
		var data_f2 = "";
		var data_f3 = "";
		var data_f4 = "";
		var urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+origin+"/"+stop+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
		$.ajax({
			type:'GET',
			url: urlString,
			dataType: "json",
			success: function(data){
				data_f1 = data;
			},
			complete: function(){
				urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+stop+"/"+destination+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
				$.ajax({
					type: 'GET',
					url: urlString,
					dataType: "json",
					success: function(_data){
						data_f2 = _data;
					},//ritorno
					complete: function() {
						values = end_date.split("/");
						var r_day = values[0]; 
						month = values[1];
						year = values[2];
						urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+destination+"/"+stop+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
						$.ajax({
							type: 'GET',
							url : urlString,
							success: function(data3){
								data_f3 = data3;
							},
							complete: function(){
								urlString = "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+stop+"/"+origin+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
								$.ajax({
									type: 'GET',
									url : urlString,
									success: function(data4){
										data_f4 = data4;
									},
									complete: function(){
										var flights_fs = parseReceivedJson(data_f1,day);
										var flights_ss = parseReceivedJson(data_f2,day);
										var flights_r_fs = parseReceivedJson(data_f3,r_day);
										var flights_r_ss = parseReceivedJson(data_f4,r_day);
										pendingCall.procID = null;
										if(flights_fs === "" || flights_ss === "" || flights_r_fs === "" || flights_r_ss === "") {
											console.log("No a/r flights with stops....");
										}else{
											var ticket1 = buildTicket(flights_fs, origin, destination,stop, origin_name, destination_name, start_date);
											var ticket2 = buildTicket(flights_ss, origin, destination,stop, origin_name, destination_name, start_date);
											var ticket3 = buildTicket(flights_r_fs, origin, destination,stop, origin_name, destination_name, end_date);
											var ticket4 = buildTicket(flights_r_ss, origin, destination,stop, origin_name, destination_name, end_date);
											
											displayOneWayReturnStop(ticket1,ticket2,ticket3,ticket4,stop_name);
										}
										
//										//ora visualizzare i voli falsi
										for(var i in array_stops){
											stop = array_stops[i];
											stop_name = array_stops_name[i].name;
											flights_fs = createWrongFlight();
											flights_ss = createWrongFlight();
											flights_r_fs = createWrongFlight();
											flights_r_ss = createWrongFlight();
											ticket1 = buildTicket(flights_fs, origin, destination,stop, origin_name, destination_name, _object.start_date);
											ticket2 = buildTicket(flights_ss, origin, destination,stop, origin_name, destination_name, _object.start_date);
											ticket3 = buildTicket(flights_r_fs, origin, destination,stop, origin_name, destination_name, end_date);
											ticket4 = buildTicket(flights_r_ss, origin, destination,stop, origin_name, destination_name, end_date);
											
											displayOneWayReturnStop(ticket1,ticket2,ticket3,ticket4,stop_name);
										}
										
										setTimeout(hideAnimation,pending_call_time);
									}
								});
							}
						});
					}
				});
			}
		});
		


	
	};
	
	if (pendingCall) {
	    clearTimeout(pendingCall);
	}
	pendingCall =  setTimeout(ajaxRequest, pending_call_time); // tempo di attesa



	
}

function buildTicket(toBuild,origin,destination,stop_f,origin_name,dest_name,date){
	var tickets = new Array();
	for(var i in toBuild){
		var n = toBuild[i].number;
		var dt = toBuild[i].departureTime;
		var at = toBuild[i].arrivalTime;
		var t = new Ticket(n,dt,at,origin,destination,origin_name,dest_name,date);
		t.stop = stop_f;
		tickets.push(t);
	}
	return tickets;
}


function parseReceivedJson(receivedJson,chosenDay){
	var element= "";
	for (var i in receivedJson.days){
		if(receivedJson.days[i].day == chosenDay){ 
			element= JSON.stringify(receivedJson.days[i].flights);
			return JSON.parse(element);
		}
	}
	return ""; //in questo caso non è stato trovato un voli con data chosenDay
}

/** DISPLAY: TUTTI I VOLI DIRETTI -> ANDATA
 * 
 * @param t lista dei tickets per il volo di andata
 */
function displayOneWayNonstop(t){
	for(var i in t){
		$(".flight_container").append('<div class="flight_result flight_oneway"> '
					 		+ '<div class="flight-header flight-header__notice" role="button"'
							+'		onclick="showDetails(this);"> '
							+'		<div class="flight-header__flight-basic">  '
							+'			<div class="flight-header__selected-header">  '
							+'				<div class="flight-header__content">  '
							+'					<div class="flight-header__informations">  '
							+'						<div class="meta-row duration">  '
							+'							<div class="flexy">  '
							+'								<div class="direct">Non-stop:</div>  '
							+'								<strong class="flight-header__connection-time-label">' +t[i].flightTime+'</strong>  '
							+'							</div>  '
							+'						</div>  '
							+'						<div class="meta-row time">  '
							+'							<div class="start-time">'+ t[i].dep_time + '</div>  '
							+'							<div class="plane">  '
							+'								<div class="ico_plane"></div>  '
							+'								<hr class="horizontal-line">  ' 
							+'							</div>  '
							+'							<div class="end-time">'+ t[i].arr_time + '</div>  '
							+'						</div>  '
							+'						<div class="flight-number">FR ' + t[i].f_number + '</div>  '
							+'						<div class="cities flight-number-visible">  '
							+'							<span class="cities__departure">'+t[i].dep_airport+'</span>  '
							+'							<div class="cities__destination">  '
							+'								<span class="cities__destination_span">'+t[i].arr_airport+'</span>  '
							+'							</div>  '
							+'						</div>  '
							+'						<div class="meta-row town-flight"></div>  '
							+'					</div>  '
							+'				</div>  '
							+'			</div>  '
							+'			<div class="company_logo">  '
							+'				<img class="ry_logo" src="images/ryanair.png"  '
							+'					title="Ryanair" alt="Ryanair">  '
							+'			</div>  '
							+'			<div class="flight_price">'
							+'				<span>&#163; </span> <span class="price_oneway">'+generateFlightPrice()+' </span>'
							+'			</div>'
							+'		</div>  '
							+'	</div>  '
							+'	<div class="flight_info">  '
							+'		<div class="ItineraryLeg__leg-heading-3fnJz">  '
							+'			<h4 class="ItineraryLeg__leg-title-1CzlX">  '
							+'				Departure <span class="ItineraryLeg__leg-date-JO7rO">'+t[i].date+'</span>  '
							+'			</h4>  '
							+'		</div>  '
							+'		<div>  '
							+'			<div class="segment">  '
							+'				<div class="ItineraryLeg__split-duration-left-3y-Xd">'+t[i].flightTime+'</div>  '
							+'				<div class="ItineraryLeg__segment-details-v3l1P">  '
							+'					<div class="ItineraryLeg__segment-departure-1rTYX">  '
							+'						<div class="ItineraryLeg__segment-time-3IWQh dep_time">  '
							+'							<strong>'+t[i].dep_time+'</strong>  '
							+'						</div>  '
							+'						<div class="ItineraryLeg__segment-route-1ST_W">  '
							+'							<span class="dep_info_iata">'+t[i].dep_airport+'</span> '+t[i].or_name+'  '
							+'						</div>  '
							+'					</div>  '
							+'					<div class="ItineraryLeg__segment-destination-1a1pu">  '
							+'						<div class="ItineraryLeg__segment-time-3IWQh arr_time">  '
							+'							<strong>'+t[i].arr_time+'</strong>  '
							+'						</div>  '
							+'						<div class="ItineraryLeg__segment-route-1ST_W">  '
							+'							<span class="arr_info_iata">'+t[i].arr_airport+'</span> '+t[i].dest_name+'  '
							+'						</div>  '
							+'					</div>  '
							+'				</div>  '
							+'			</div>  '
							+'		</div>  '
							+'		<div class="ItineraryLeg__arrival-info-3rHde">  '
							+'			<span><strong>Arrival time:</strong> <span class="start_info_date">'+t[i].date+'</span></span>  ' 
							+'			<span class="ItineraryLeg__arrival-duration-3teR7">  '
							+'				<strong>Flight time: </strong>'+t[i].flightTime+'  '
							+'			</span>  '
							+'		</div>  '
							+'		<div class="dropdown-grids search_grid" >'
							+'			<div id="searchContainer" class="localSearch" role="button" onclick="addToChart(this,1);">'
							+'				<div class="addToCartButton">'
							+'					<span>Book</span>'
							+'				</div>'
							+'			</div>  '
							+'			<div id="searchContainer" class="ryrSearch" role="button" onclick="redirect(this);">'
							+'				<div class="searchButton">'
							+'					<span>Book on Ryanair</span>'
							+'				</div>'
							+'			</div>  '
							+'		</div>  '
							+'	</div>  '
							+'</div>  ');
	}
}

/** DISPLAY: TUTTI I VOLI DIRETTI  -> ANDATA / RITORNO
 * 
 * @param ticket1 voli di andata
 * @param ticket2 voli di ritorno
 */
function displayOnewayReturnFligths(ticket1,ticket2){
	for (var i in ticket1){
		for (var j in ticket2){
			if(dateMatch(ticket1[i], ticket2[j])){
				continue;
			}
			var oneway_price = generateFlightPrice();
			var return_price = generateFlightPrice();
			$('.flight_container').append(' <div class="flight_result flight_oneway_return">'
					+'		<div class="flight_result_info" role="button"'
					+'			onclick="showDetails(this);">'
					+'			<div class="flight-header flight-header__notice">'
					+'	  			<div class="flight-header__flight-basic">'
					+'					<div class="flight-header__selected-header">'
					+'						<div class="flight-header__content">'
					+'							<div class="flight-header__informations">'
					+'								<div class="meta-row duration">'
					+'									<div class="flexy">'
					+'										<div class="direct">Non-stop:</div>'
					+'										<strong class="flight-header__connection-time-label">'+ticket1[i].flightTime+'</strong>'
					+'									</div>'
					+'								</div>'
					+'								<div class="meta-row time">'
					+'									<div class="start-time start_fligth_time">'+ticket1[i].dep_time+'</div>'
					+'									<div class="plane">'
					+'										<div class="ico_plane"></div>'
					+'										<hr class="horizontal-line">'
					+'									</div>'
					+'									<div class="end-time end_f_time">'+ticket1[i].arr_time+'</div>'
					+'								</div>'
					+'								<div class="flight-number">FR '+ticket1[i].f_number+'</div>'
					+'								<div class="cities flight-number-visible">'
					+'									<span class="cities__departure">'+ticket1[i].dep_airport+'</span>'
					+'									<div class="cities__destination">'
					+'										<span class="cities__destination_span">'+ticket1[i].arr_airport+'</span>'
					+'									</div>'
					+'								</div>'
					+'								<div class="meta-row town-flight"></div>'
					+'							</div>'
					+'						</div>'
					+'					</div>'
					+'					<div class="company_logo">'
					+'						<img class="ry_logo" src="images/ryanair.png"'
					+'							title="Ryanair" alt="Ryanair">'
					+'					</div>'
					+'				    <div class="flight_price">'
					+'					    <span>&#163; </span>'+oneway_price+' </span>'
					+'				    </div>'
					+'				    <div class="flight_price_return">'
					+'					    <span>&#163; </span>'+return_price+' </span>'
					+'				    </div>'
					+'				</div>'
					+'			</div>'
					+'			<div class="flight-header flight-header__notice">'
					+'				<div class="flight-header__flight-basic">'
					+'					<div class="flight-header__selected-header">'
					+'						<div class="flight-header__content">'
					+'							<div class="flight-header__informations">'
					+'								<div class="meta-row duration">'
					+'									<div class="flexy">'
					+'										<div class="direct">Non-stop:</div>'
					+'										<strong class="flight-header__connection-time-label">'+ticket2[j].flightTime+'</strong>'
					+'									</div>'
					+'								</div>'
					+'								<div class="meta-row time">'
					+'									<div class="start-time start_fligth_time">'+ticket2[j].dep_time+'</div>'
					+'									<div class="plane">'
					+'										<div class="ico_plane"></div>'
					+'										<hr class="horizontal-line">'
					+'									</div>'
					+'									<div class="end-time">'+ticket2[j].arr_time+'</div>'
					+'								</div>'
					+'								<div class="flight-number">FR '+ticket2[j].f_number+'</div>'
					+'								<div class="cities flight-number-visible">'
					+'									<span class="cities__departure">'+ticket2[j].dep_airport+'</span>'
					+'									<div class="cities__destination">'
					+'										<span class="cities__destination_span">'+ticket2[j].arr_airport+'</span>'
					+'									</div>'
					+'								</div>'
					+'								<div class="meta-row town-flight"></div>'
					+'							</div>'
					+'						</div>'
					+'					</div>'
					+'				</div>'
					+'			</div>'
					+'		</div>'
					+'		<div class="flight_info">'
					+'			<div class="ItineraryLeg__leg-heading-3fnJz">'
					+'				<h4 class="ItineraryLeg__leg-title-1CzlX">'
					+'					Departure <span class="ItineraryLeg__leg-date-JO7rO"><span class="start_info_date">'+ticket1[i].date+'</span></span>'
					+'				</h4>'
					+'			</div>'
					+'			<div>'
					+'				<div class="segment">'
					+'					<div class="ItineraryLeg__split-duration-left-3y-Xd">'+ticket1[i].flightTime+'</div>'
					+'					<div class="ItineraryLeg__segment-details-v3l1P">'
					+'						<div class="ItineraryLeg__segment-departure-1rTYX">'
					+'							<div class="ItineraryLeg__segment-time-3IWQh dep_time">'
					+'								<strong>'+ticket1[i].dep_time+'</strong>'
					+'							</div>'
					+'							<div class="ItineraryLeg__segment-route-1ST_W">'
					+'								<span class="dep_info_iata">'+ticket1[i].dep_airport+'</span>'
					+'								'+ticket1[i].or_name+'</div>'
					+'						</div>'
					+'						<div class="ItineraryLeg__segment-destination-1a1pu">'
					+'							<div class="ItineraryLeg__segment-time-3IWQh arr_time">'
					+'								<strong>'+ticket1[i].arr_time+'</strong>'
					+'							</div>'
					+'							<div class="ItineraryLeg__segment-route-1ST_W">'
					+'								<span class="arr_info_iata">'+ticket1[i].arr_airport+'</span>'
					+'								'+ticket1[i].dest_name+'</div>'
					+'						</div>'
					+'					</div>'
					+'				</div>'
					+'			</div>'
					+'			<div class="ItineraryLeg__arrival-info-3rHde">'
					+'				<span><strong>Arrival time:</strong> '+ticket1[i].date+'</span> <span'
					+'					class="ItineraryLeg__arrival-duration-3teR7"><strong>Flight'
					+'						time: </strong>'+ticket1[i].flightTime+'</span>'
					+'			</div>'
					+'			<div class="ItineraryLeg__leg-heading-3fnJz">'
					+'				<h4 class="ItineraryLeg__leg-title-1CzlX">'
					+'					Return <span class="ItineraryLeg__leg-date-JO7rO"><span class="end_info_date">'+ticket2[j].date+'</span></span>'
					+'				</h4>'
					+'			</div>'
					+'			<div>'
					+'			<div class="segment">'
					+'					<div class="ItineraryLeg__split-duration-left-3y-Xd">'+ticket2[j].flightTime+'</div>'
					+'					<div class="ItineraryLeg__segment-details-v3l1P">'
					+'						<div class="ItineraryLeg__segment-departure-1rTYX">'
					+'							<div class="ItineraryLeg__segment-time-3IWQh dep_time">'
					+'								<strong>'+ticket2[j].dep_time+'</strong>'
					+'							</div>'
					+'							<div class="ItineraryLeg__segment-route-1ST_W">'+ticket2[j].dep_airport+''
					+'							'+ticket2[j].or_name+'</div>'
					+'						</div>'
					+'						<div class="ItineraryLeg__segment-destination-1a1pu">'
					+'							<div class="ItineraryLeg__segment-time-3IWQh arr_time">'
					+'								<strong>'+ticket2[j].arr_time+'</strong>'
					+'							</div>'
					+'							<div class="ItineraryLeg__segment-route-1ST_W">'+ticket2[j].arr_airport+''
					+'							'+ticket2[j].dest_name+'</div>'
					+'						</div>'
					+'					</div>'
					+'			</div>'
					+'			</div>'
					+'			<div class="ItineraryLeg__arrival-info-3rHde">'
					+'				<span><strong>Arrival time:</strong> '+ticket2[j].date+'</span> <span'
					+'					class="ItineraryLeg__arrival-duration-3teR7"><strong>Flight'
					+'						time: </strong>'+ticket2[j].flightTime+'</span>'
					+'			</div>'
					+'			<div class="dropdown-grids search_grid" >'
					+'				<div id="searchContainer" class="localSearch" role="button" onclick="addToChart(this,2);">'
					+'					<div class="addToCartButton">'
					+'						<span>Book</span>'
					+'					</div>'
					+'				</div>  '
					+'				<div id="searchContainer" class="ryrSearch" role="button" onclick="redirect(this);">'
					+'					<div class="searchButton">'
					+'						<span>Book on Ryanair</span>'
					+'					</div>'
					+'				</div>  '
					+'			</div>  '
					+'			<div class="flight_price_subtot">'
					+'				<span>&#163; </span><span class="price_oneway">'+(oneway_price + return_price)+' </span>'
					+'			</div>'
					+'		</div>'
					+'	</div> ');
		}
	}
	
}

/** DISPLAY: TUTTI I VOLI CON SCALO -> ANDATA
 * 
 * @param t1  voli della prima tratta
 * @param t2  voli della seconda tratta
 * @param obj JSON contenente tutti i dati dei voli  
 * @param index 
 * @param stop_name cod. iata aeroporto dello scalo
 */
function displayOneWayStop(t1,t2,stop_name){
	for (var i in t1){
		for (var j in t2){
			if(dateMatch(t1[i], t2[j])){
//				console.log("data non conforme...");
//				console.log(t1[i].dep_time + " " + t1[i].arr_time);
//				console.log(t2[j].dep_time + " " + t2[j].arr_time);
				continue;
			}
			var ft_withStop = computeFlightTime(t1[i].dep_time,t2[j].arr_time);
			$('.flight_container').append( '<div class="flight_result flight_stop_oneway">'
						+'	<div class="flight_result_info" role="button"'
						+'		onclick="showDetails(this);">'
						+'			<div class="flight-header flight-header__notice">'
						+'			<div class="flight-header__flight-basic">'
						+'				<div class="flight-header__selected-header">'
						+'					<div class="flight-header__content">'
						+'						<div class="flight-header__informations">'
						+'							<div class="meta-row duration">'
						+'								<div class="flexy">'
						+'									<strong class="flight-header__connection-time-label">'+ ft_withStop +'</strong>'
						+'								</div>'
						+'							</div>'
						+'							<div class="meta-row time">'
						+'								<div class="start-time start_fligth_time">'+t1[i].dep_time+'</div>'
						+'								<div class="plane">'
						+'									<div class="ico_plane"></div>'
						+'									<hr class="horizontal-line">'
						+'								</div>'
						+'								<div class="end-time">'+t2[j].arr_time+'</div>'
						+'							</div>'
						+'							<div class="meta-row duration">'
						+'								<div class="flexy">'
						+'									<div class="one_stop">'
						+'										<span class="one_stop_info">1 stop: </span>'
						+'										<span class="one_stop_name_info">'+t1[i].stop+'</span>'
						+'									</div>'
						+'								</div>'
						+'							</div>'
						+'							<div class="cities flight-number-visible">'
						+'								<span class="cities__departure">'+t1[i].dep_airport+'</span>'
						+'								<div class="cities__destination">'
						+'									<span class="cities__destination_span">'+t1[i].arr_airport+'</span>'
						+'								</div>'
						+'							</div>'
						+'							<div class="meta-row town-flight"></div>'
						+'						</div>'
						+'					</div>'
						+'				</div>'
						+'				<div class="company_logo">'
						+'					<img class="ry_logo" src="images/ryanair.png"'
						+'						title="Ryanair" alt="Ryanair">'
						+'				</div>'
						+'				<div class="flight_price">'
						+'					<span>&#163; </span> <span class="price_oneway">'+generateFlightPrice()+' </span>'
						+'				</div>'
						+'			</div>'
						+'		</div>'
						+'	</div>'
						+'	<div class="flight_info">'
						+'		<div class="ItineraryLeg__leg-heading-3fnJz">'
						+'			<h4 class="ItineraryLeg__leg-title-1CzlX">'
						+'				Departure <span class="ItineraryLeg__leg-date-JO7rO"><span class="start_info_date">'+t1[i].date+'</span></span>'
						+'			</h4>'
						+'		</div>'
						+'		<div>'
						+'			<div class="segment">'
						+'				<div class="ItineraryLeg__split-duration-left-3y-Xd">'+t1[i].flightTime +'</div>'
						+'				<div class="ItineraryLeg__segment-details-v3l1P">'
						+'					<div class="ItineraryLeg__segment-departure-1rTYX">'
						+'						<div class="ItineraryLeg__segment-time-3IWQh dep_time">'
						+'							<strong>'+t1[i].dep_time+'</strong>'
						+'						</div>'
						+'						<div class="ItineraryLeg__segment-route-1ST_W">'
						+'							<span class="dep_info_iata">'+t1[i].dep_airport+'</span>'
						+'							'+t1[i].or_name+'</div>'
						+'					</div>'
						+'					<div class="ItineraryLeg__segment-destination-1a1pu">'
						+'						<div class="ItineraryLeg__segment-time-3IWQh arr_time">'
						+'							<strong>'+t1[i].arr_time+'</strong>'
						+'						</div>'
						+'						<div class="ItineraryLeg__segment-route-1ST_W">'
						+'							<span class="arr_info_iata">'+t1[i].stop+'</span>'
						+'							<span class="air-stop-name">'+stop_name+'</span></div>'
						+'					</div>'
						+'				</div>'
						+'			</div>'
						+'		</div>'
						+'		<div>'
						+'			<div class="segment">'
						+'				<div class="ItineraryLeg__split-duration-left-3y-Xd">'+t2[j].flightTime +'</div>'
						+'				<div class="ItineraryLeg__segment-details-v3l1P">'
						+'					<div class="ItineraryLeg__segment-departure-1rTYX">'
						+'						<div class="ItineraryLeg__segment-time-3IWQh dep_time">'
						+'							<strong>'+t2[j].dep_time+'</strong>'
						+'						</div>'
						+'						<div class="ItineraryLeg__segment-route-1ST_W">'
						+'							<span class="dep_info_iata">'+t2[j].stop+'</span>'
						+'							'+stop_name+'</div>'
						+'					</div>'
						+'					<div class="ItineraryLeg__segment-destination-1a1pu">'
						+'						<div class="ItineraryLeg__segment-time-3IWQh arr_time">'
						+'							<strong>'+t2[j].arr_time+'</strong>'
						+'						</div>'
						+'						<div class="ItineraryLeg__segment-route-1ST_W">'
						+'							<span class="arr_info_iata">'+t2[j].arr_airport+'</span>'
						+'							'+t2[j].dest_name+'</div>'
						+'					</div>'
						+'				</div>'
						+'			</div>'
						+'		</div>'
						+'		<div class="ItineraryLeg__arrival-info-3rHde">'
						+'			<span><strong>Arrival time:</strong> '+t2[j].date+'</span> <span'
						+'				class="ItineraryLeg__arrival-duration-3teR7"><strong>Flight'
						+'					time: </strong>'+ft_withStop+'</span>'
						+'		</div>'
						+'		<div class="dropdown-grids search_grid" >'
						+'			<div id="searchContainer" class="localSearch" role="button" onclick="addToChart(this,3);">'
						+'				<div class="addToCartButton">'
						+'					<span>Book</span>'
						+'				</div>'
						+'			</div>  '
						+'			<div id="searchContainer" class="ryrSearch" role="button" onclick="redirect(this);">'
						+'				<div class="searchButton">'
						+'					<span>Book on Ryanair</span>'
						+'				</div>'
						+'			</div>  '
						+'		</div>  '
						+'	</div>  ' 
						+' </div>  ')
		}
	}

//	index = index + 1;
//	onewayStops(obj,index); //callback;
}


function displayOneWayReturnStop(t1,t2,t3,t4,stop_name){
	for (var i in t1){
		for (var j in t2){
			if(dateMatch(t1[i], t2[j])){
				continue;
			}
			for (var x in t3){
				for (var y in t4){
					if(dateMatch(t3[x], t4[y])){
						continue;
					}
					var ft_withStop = computeFlightTime(t1[i].dep_time,t2[j].arr_time);
					var st_withStop = computeFlightTime(t3[x].dep_time,t4[y].arr_time);
					
					var oneway_price = generateFlightPrice();
					var return_price = generateFlightPrice();
					
					$('.flight_container').append( '<div class="flight_result flight_stop_oneway_return">'
								+'	<div class="flight_result_info" role="button"'
								+'		onclick="showDetails(this);">'
								+'			<div class="flight-header flight-header__notice">'
								+'			<div class="flight-header__flight-basic">'
								+'				<div class="flight-header__selected-header">'
								+'					<div class="flight-header__content">'
								+'						<div class="flight-header__informations">'
								+'							<div class="meta-row duration">'
								+'								<div class="flexy">'
								+'									<strong class="flight-header__connection-time-label">'+ ft_withStop +'</strong>'
								+'								</div>'
								+'							</div>'
								+'							<div class="meta-row time">'
								+'								<div class="start-time start_fligth_time">'+t1[i].dep_time+'</div>'
								+'								<div class="plane">'
								+'									<div class="ico_plane"></div>'
								+'									<hr class="horizontal-line">'
								+'								</div>'
								+'								<div class="end-time end_f_time">'+t2[j].arr_time+'</div>'
								+'							</div>'
								+'							<div class="meta-row duration">'
								+'								<div class="flexy">'
								+'									<div class="one_stop">'
								+'										<span class="one_stop_info">1 stop: </span>'
								+'										<span class="one_stop_name_info">'+t1[i].stop+'</span>'
								+'									</div>'
								+'								</div>'
								+'							</div>'
								+'							<div class="cities flight-number-visible">'
								+'								<span class="cities__departure">'+t1[i].dep_airport+'</span>'
								+'								<div class="cities__destination">'
								+'									<span class="cities__destination_span">'+t1[i].arr_airport+'</span>'
								+'								</div>'
								+'							</div>'
								+'							<div class="meta-row town-flight"></div>'
								+'						</div>'
								+'					</div>'
								+'				</div>'
								+'				<div class="company_logo">'
								+'					<img class="ry_logo" src="images/ryanair.png"'
								+'						title="Ryanair" alt="Ryanair">'
								+'				</div>'
								+'				<div class="flight_price">'
								+'					<span>&#163; </span>'+oneway_price+' </span>'
								+'				</div>'
								+'				<div class="flight_price_return">'
								+'					<span>&#163; </span>'+return_price+' </span>'
								+'				</div>'
								+'			</div>'
								+'		</div>'
								+'		<div class="flight-header flight-header__notice">'
								+'			<div class="flight-header__flight-basic">'
								+'				<div class="flight-header__selected-header">'
								+'					<div class="flight-header__content">'
								+'						<div class="flight-header__informations">'
								+'							<div class="meta-row duration">'
								+'								<div class="flexy">'
								+'									<strong class="flight-header__connection-time-label">'+ st_withStop +'</strong>'
								+'								</div>'
								+'							</div>'
								+'							<div class="meta-row time">'
								+'								<div class="start-time">'+t3[x].dep_time+'</div>'
								+'								<div class="plane">'
								+'									<div class="ico_plane"></div>'
								+'									<hr class="horizontal-line">'
								+'								</div>'
								+'								<div class="end-time">'+t4[y].arr_time+'</div>'
								+'							</div>'
								+'							<div class="meta-row duration">'
								+'								<div class="flexy">'
								+'									<div class="one_stop">'
								+'										<span class="one_stop_info">1 stop: </span>'
								+'										<span class="one_stop_name_info">'+t3[x].stop+'</span>'
								+'									</div>'
								+'								</div>'
								+'							</div>'
								+'							<div class="cities flight-number-visible">'
								+'								<span class="cities__departure">'+t3[x].arr_airport+'</span>'
								+'								<div class="cities__destination">'
								+'									<span class="cities__destination_span">'+t3[x].dep_airport+'</span>'
								+'								</div>'
								+'							</div>'
								+'							<div class="meta-row town-flight"></div>'
								+'						</div>'
								+'					</div>'
								+'				</div>'
								+'			</div>'
								+'		</div>'
								+'	</div>'
								+'	<div class="flight_info">'
								+'		<div class="ItineraryLeg__leg-heading-3fnJz">'
								+'			<h4 class="ItineraryLeg__leg-title-1CzlX">'
								+'				Departure <span class="ItineraryLeg__leg-date-JO7rO"><span class="start_info_date">'+t1[i].date+'</span></span>'
								+'			</h4>'
								+'		</div>'
								+'		<div>'
								+'			<div class="segment">'
								+'				<div class="ItineraryLeg__split-duration-left-3y-Xd">'+t1[i].flightTime +'</div>'
								+'				<div class="ItineraryLeg__segment-details-v3l1P">'
								+'					<div class="ItineraryLeg__segment-departure-1rTYX">'
								+'						<div class="ItineraryLeg__segment-time-3IWQh dep_time">'
								+'							<strong>'+t1[i].dep_time+'</strong>'
								+'						</div>'
								+'						<div class="ItineraryLeg__segment-route-1ST_W">'
								+'							<span class="dep_info_iata">'+t1[i].dep_airport+'</span>'
								+'							'+t1[i].or_name+'</div>'
								+'					</div>'
								+'					<div class="ItineraryLeg__segment-destination-1a1pu">'
								+'						<div class="ItineraryLeg__segment-time-3IWQh arr_time">'
								+'							<strong>'+t1[i].arr_time+'</strong>'
								+'						</div>'
								+'						<div class="ItineraryLeg__segment-route-1ST_W">'
								+'							<span class="arr_info_iata">'+t1[i].stop+'</span>'
								+'							<span class="air-stop-name">'+stop_name+'</span></div>'
								+'					</div>'
								+'				</div>'
								+'			</div>'
								+'		</div>'
								+'		<div>'
								+'			<div class="segment">'
								+'				<div class="ItineraryLeg__split-duration-left-3y-Xd">'+t2[j].flightTime +'</div>'
								+'				<div class="ItineraryLeg__segment-details-v3l1P">'
								+'					<div class="ItineraryLeg__segment-departure-1rTYX">'
								+'						<div class="ItineraryLeg__segment-time-3IWQh dep_time">'
								+'							<strong>'+t2[j].dep_time+'</strong>'
								+'						</div>'
								+'						<div class="ItineraryLeg__segment-route-1ST_W">'
								+'							<span class="dep_info_iata">'+t2[j].stop+'</span>'
								+'							'+stop_name+'</div>'
								+'					</div>'
								+'					<div class="ItineraryLeg__segment-destination-1a1pu">'
								+'						<div class="ItineraryLeg__segment-time-3IWQh arr_time">'
								+'							<strong>'+t2[j].arr_time+'</strong>'
								+'						</div>'
								+'						<div class="ItineraryLeg__segment-route-1ST_W">'
								+'							<span class="arr_info_iata">'+t2[j].arr_airport+'</span>'
								+'							'+t2[j].dest_name+'</div>'
								+'					</div>'
								+'				</div>'
								+'			</div>'
								+'		</div>'
								+'		<div class="ItineraryLeg__arrival-info-3rHde">'
								+'			<span><strong>Arrival time:</strong> '+t2[j].date+'</span> <span'
								+'				class="ItineraryLeg__arrival-duration-3teR7"><strong>Flight'
								+'					time: </strong>'+ft_withStop+'</span>'
								+'		</div>'
								+'		<div class="ItineraryLeg__leg-heading-3fnJz">'
								+'			<h4 class="ItineraryLeg__leg-title-1CzlX">'
								+'				Return <span class="ItineraryLeg__leg-date-JO7rO"><span class="start_info_date">'+t3[x].date+'</span></span>'
								+'			</h4>'
								+'		</div>'
								+'		<div>'
								+'			<div class="segment">'
								+'				<div class="ItineraryLeg__split-duration-left-3y-Xd">'+t3[x].flightTime +'</div>'
								+'				<div class="ItineraryLeg__segment-details-v3l1P">'
								+'					<div class="ItineraryLeg__segment-departure-1rTYX">'
								+'						<div class="ItineraryLeg__segment-time-3IWQh dep_time">'
								+'							<strong>'+t3[x].dep_time+'</strong>'
								+'						</div>'
								+'						<div class="ItineraryLeg__segment-route-1ST_W">'
								+'							<span class="dep_info_iata">'+t3[x].dep_airport+'</span>'
								+'							'+t3[x].or_name+'</div>'
								+'					</div>'
								+'					<div class="ItineraryLeg__segment-destination-1a1pu">'
								+'						<div class="ItineraryLeg__segment-time-3IWQh arr_time">'
								+'							<strong>'+t3[x].arr_time+'</strong>'
								+'						</div>'
								+'						<div class="ItineraryLeg__segment-route-1ST_W">'
								+'							<span class="arr_info_iata">'+t3[x].stop+'</span>'
								+'							'+stop_name+'</div>'
								+'					</div>'
								+'				</div>'
								+'			</div>'
								+'		</div>'
								+'		<div>'
								+'			<div class="segment">'
								+'				<div class="ItineraryLeg__split-duration-left-3y-Xd">'+t4[y].flightTime +'</div>'
								+'				<div class="ItineraryLeg__segment-details-v3l1P">'
								+'					<div class="ItineraryLeg__segment-departure-1rTYX">'
								+'						<div class="ItineraryLeg__segment-time-3IWQh dep_time">'
								+'							<strong>'+t4[y].dep_time+'</strong>'
								+'						</div>'
								+'						<div class="ItineraryLeg__segment-route-1ST_W">'
								+'							<span class="dep_info_iata">'+t4[y].stop+'</span>'
								+'							'+stop_name+'</div>'
								+'					</div>'
								+'					<div class="ItineraryLeg__segment-destination-1a1pu">'
								+'						<div class="ItineraryLeg__segment-time-3IWQh arr_time">'
								+'							<strong>'+t4[y].arr_time+'</strong>'
								+'						</div>'
								+'						<div class="ItineraryLeg__segment-route-1ST_W">'
								+'							<span class="arr_info_iata">'+t4[y].arr_airport+'</span>'
								+'							'+t4[y].dest_name+'</div>'
								+'					</div>'
								+'				</div>'
								+'			</div>'
								+'		</div>'
								+'		<div class="ItineraryLeg__arrival-info-3rHde">'
								+'			<span><strong>Arrival time:</strong> '+t4[y].date+'</span> <span'
								+'				class="ItineraryLeg__arrival-duration-3teR7"><strong>Flight'
								+'					time: </strong>'+st_withStop+'</span>'
								+'		</div>'
								+'		<div class="dropdown-grids search_grid" >'
								+'			<div id="searchContainer" class="localSearch" role="button" onclick="addToChart(this,4);">'
								+'				<div class="addToCartButton">'
								+'					<span>Book</span>'
								+'				</div>'
								+'			</div>  '
								+'			<div id="searchContainer" class="ryrSearch" role="button" onclick="redirect(this);">'
								+'				<div class="searchButton">'
								+'					<span>Book on Ryanair</span>'
								+'				</div>'
								+'			</div>  '
								+'		</div>  '
								+'		<div class="flight_price_subtot">'
								+'			<span>&#163; </span><span class="price_oneway">'+(oneway_price + return_price)+' </span>'
								+'		</div>'
								+'	</div>  ' 
								+' </div>  ')
				}
			}
		}
	}
}

function showErrorMessage(){
	//alert("Non sono stati trovati voli per la tratta selezionata!");
}

function showFlightNotFoundWindow(){
	//alert("Non sono stati trovati voli per la tratta selezionata!");
}


function Ticket(f_number,dep_time, arr_time,dep_airport,arr_airport,or_name,dest_name, date){
	this.f_number = f_number;
	this.dep_time = dep_time;
	this.arr_time = arr_time;
	this.dep_airport = dep_airport;
	this.arr_airport = arr_airport;
	this.or_name = or_name;
	this.dest_name = dest_name;
	this.date = date;
	this.flightTime = computeFlightTime(dep_time, arr_time);
	
}


/*
 * 					FUNZIONI DI UTILITA'
 */

function createWrongFlight(){
	var dates = new Array();
	for( var i = 0; i < 3; i++){
		var number = (Math.floor(Math.random() * 5000)) + 3000; //genera un numero tra 5000 e 8000
		var dep_date = buildTime();
		var dep_h = parseInt(dep_date.substring(0,2));
		var diff = 23 - dep_h; //differenza di tempo tra l'ora che ho generato per il primo volo e l'ora massima
		var inc = 0;
		if(diff > 1) {
			diff = diff -2;
			inc = 2;
		}
		
		var arr_date = function(){
			var h = "";
			var hh = (dep_h + Math.floor(Math.random()* diff)) + inc;
			var mm = Math.floor(Math.random()*59);

			if(hh<= 9){
			h = h.concat("0"+hh);
			}
			else h = h.concat(hh);


			if(mm<= 9){
			h = h.concat(":0"+mm);
			}
			else h = h.concat(":"+mm);
			
			return h;
			
		};
		
		var obj = {
				number: number,
				departureTime : dep_date,
				arrivalTime : arr_date()
		}
		
		dates.push(obj);
		
		
	}
	
	return dates;
}

function splitTime(time){
	var tokens = time.split("/");
	var newTime = tokens[2]+"-"+tokens[1]+"-"+tokens[0];
	return newTime;
}

/**
 * 
 * @param t1 l'ora di partenza
 * @param t2 l'ora di arrivo
 * @returns
 */
function computeFlightTime(t1,t2){
	
	var token1 = t1.split(":");	
	var date1 = new Date();
	date1.setHours(token1[0]);
	date1.setMinutes(token1[1]);
	date1.setSeconds("00");
	
	var token2 = t2.split(":");
	var date2 = new Date();
	date2.setHours(token2[0]);
	date2.setMinutes(token2[1]);
	date2.setSeconds("00");

	var time1 = date1.getTime();
	var time2 = date2.getTime();

	var timeDiff = time2 - time1;
	var flightTime = parseInt(timeDiff/3600000) + "h " + parseInt((timeDiff%3600000)/60000) +"min";
	
	return flightTime;
}

function dateMatch(t1, t2){
	
	var d = splitTime(t1.date);
	var date1 = d+" "+t1.arr_time;
	d = splitTime(t2.date);
	var date2 = d+" "+t2.dep_time;
	
	if(Date.parse(date1) > Date.parse(date2)){
		return true;
	}
	return false;
}

function buildTime(){
	var h = "";
	var hh = Math.floor(Math.random()*22);
	var mm = Math.floor(Math.random()*59);

	if(hh<= 9){
	h = h.concat("0"+hh);
	}
	else h = h.concat(hh);


	if(mm<= 9){
	h = h.concat(":0"+mm);
	}
	else h = h.concat(":"+mm);
	
	return h;
}

function generateFlightPrice(){
	var min = 20;
	var max = 290;
	
	var price = min +  Math.floor(Math.random()*(max - min));
	
	price = price * adults_number + (min * children_number) ;
	
	return price;
}


function showAnimation(){
	$('.spinner').show();
}

function hideAnimation(){
	$('.spinner').hide();
	$('.spin_class_amount').hide();
	$('.sorting-tabs-view__amount').text("---");
	$('.sorting-tabs-view__amount').show();
	
	//se il carrello è visibile ( c'è già un volo memorizzato nella session), disabilito i bottoni
	if($('.flight_body_cart').is(':visible')){
		$('.localSearch').addClass("localSearchDisabled");
	}
	
}