$(function(){
	$('.sorting-tabs-view__tab').on('click', function() {
		var elem = $(".nav_s").children();
		elem.each(function(){
			var curr = $(this);
			if(curr.hasClass("active"))
				curr.removeClass("active");
		});
		
		var _this = $(this);
		$(_this).addClass("active");
		
		var value = $(_this).find(".sorting-tabs-view__label").text();
		
		handleCheckboxEvents(value);
	});
})


function handleCheckboxEvents(_this){
	//è stato selezionato un elemento della checkbox, quindi verifico quale condizione è attualmente attiva
	if(_this ===""){
		var elem = $(".nav_s").children();
		elem.each(function(){
			var curr = $(this);
			if(curr.hasClass("active"))
				_this = curr.find(".sorting-tabs-view__label").text();
		});
	}
	//se non viene trovato l'elemento, setto _this
	if(_this === "") _this = "nochecked";
	
	
	var checked_time = $( "input.checkDepTime:checked" );
	var checked_stops = $( "input.checkStops:checked" );
	var elements = $(".flight_container").children();
	
	var c_time = checked_time.length;
	var c_stop = checked_stops.length;
	
	//disabilito tutti i voli
	elements.each( function () {
        var current = $(this);
		if(current.hasClass("flight_result")){
			current.hide();
		}
    });
	
	//mostro tutti i voli ed esco dalla funzione
	if(c_time == 0 && c_stop == 0){
		elements.each( function () {
	        var current = $(this);
			if(current.hasClass("flight_result")){
				current.show();
			}
	    });
		
		show(elements);
		findActiveElem(elements,_this);
		return;
	}
	
	if(c_time == 0 && c_stop != 0){
		checked_stops.each(function(){
			var curr_stop = $(this);
			if(curr_stop.hasClass("c_non_stop")){
				$('.flight_oneway').show();
				$('.flight_oneway_return').show();
			}
			else{
				$('.flight_stop_oneway').show();
				$('.flight_stop_oneway_return').show();
			}
		});
		
		show(elements);
		findActiveElem(elements,_this);
		return;
	}
	
	if(c_stop == 0 && c_time != 0){
		checked_time.each(function(){
			var this_checked = $(this);
			//04:00-11:59
			if(this_checked.hasClass("morning")){
				//mostro solo i voli che rientrano nel range
				var t1 = "04:00";
				var t2 = "11:59";
				elements.each( function () {
		            var current = $(this);
					if(current.hasClass("flight_result")){
						var time = current.find(".start_fligth_time").text();
						if(isInRange(time,t1,t2)){
							current.show();
						}
						
					}
		        });
				
			}
			//12:00-17:59
			else if(this_checked.hasClass("afternoon")){
				var t1 = "12:00";
				var t2 = "17:59";
				elements.each( function () {
		            var current = $(this);
					if(current.hasClass("flight_result")){
						var time = current.find(".start_fligth_time").text();
						if(isInRange(time,t1,t2)){
							current.show();
						}
						
					}
		        });
				
			}
			//18:00-23:59
			else{
				var t1 = "18:00";
				var t2 = "23:59";
				elements.each( function () {
		            var current = $(this);
					if(current.hasClass("flight_result")){
						var time = current.find(".start_fligth_time").text();
						if(isInRange(time,t1,t2)){
							current.show();
						}
						
					}
		        });
			}
		});
		
		show(elements);
		findActiveElem(elements,_this);
		return;
	}
	
	
	//ci sono elementi selezionati in entrambe le checkbox
	
	checked_stops.each(function(){
		var curr_s = $(this);
		var makeVisible1 = "";
		var makeVisible2 = "";
		
		if(curr_s.hasClass("c_non_stop")){
			makeVisible1 = "flight_oneway";
			makeVisible2 = "flight_oneway_return";
		}
		else{
			makeVisible1 = "flight_stop_oneway";
			makeVisible2 = "flight_stop_oneway_return";
		}
		
		checked_time.each(function(){
			var this_checked = $(this);
			//04:00-11:59
			if(this_checked.hasClass("morning")){
				//mostro solo i voli che rientrano nel range
				var t1 = "04:00";
				var t2 = "11:59";
				elements.each( function () {
		            var current = $(this);
					if(current.hasClass("flight_result") && current.hasClass(makeVisible1)
							|| current.hasClass("flight_result") && current.hasClass(makeVisible2)){
						var time = current.find(".start_fligth_time").text();
						if(isInRange(time,t1,t2)){
							current.show();
						}
						
					}
		        });
				
			}
			//12:00-17:59
			else if(this_checked.hasClass("afternoon")){
				var t1 = "12:00";
				var t2 = "17:59";
				elements.each( function () {
		            var current = $(this);
		            if(current.hasClass("flight_result") && current.hasClass(makeVisible1)
							|| current.hasClass("flight_result") && current.hasClass(makeVisible2)){
						var time = current.find(".start_fligth_time").text();
						if(isInRange(time,t1,t2)){
							current.show();
						}
						
					}
		        });
				
			}
			//18:00-23:59
			else{
				var t1 = "18:00";
				var t2 = "23:59";
				elements.each( function () {
		            var current = $(this);
		            if(current.hasClass("flight_result") && current.hasClass(makeVisible1)
							|| current.hasClass("flight_result") && current.hasClass(makeVisible2)){
						var time = current.find(".start_fligth_time").text();
						if(isInRange(time,t1,t2)){
							current.show();
						}
						
					}
		        });
			}
		});
		
	});
	
	show(elements);
	findActiveElem(elements,_this);

}

function show(elem){
	//se non ci sono voli, mostro schermata di no-flights
	var found = false;
	elem.each( function () {
		if($(this).hasClass("flight_result") && $(this).is(':visible')){
			found = true;
		}
    });
	
	if(!found){
		$('.no_flights_found').show();
		 $("html, body").animate({ scrollTop: 0 }, "slow");
	} 
	else{
		$('.no_flights_found').hide();
	}
}

function isInRange(toCheck, time_1, time_2){
	var t0 = toCheck.split(":");
	var t1 = time_1.split(":");
	var t2 = time_2.split(":");
	
	var leftDate = new Date();
	leftDate.setHours(t1[0]);
	leftDate.setMinutes(t1[1]);
	leftDate.setSeconds("00");
	
	var rightDate = new Date();
	rightDate.setHours(t2[0]);
	rightDate.setMinutes(t2[1]);
	rightDate.setSeconds("00");
	
	var currentDate = new Date();
	currentDate.setHours(t0[0]);
	currentDate.setMinutes(t0[1]);
	currentDate.setSeconds("00");
	
	if(Date.parse(currentDate) >= Date.parse(leftDate)
			&& Date.parse(currentDate) <= Date.parse(rightDate))
		return true;
	
	return false;
}


function findActiveElem(elements, value){
	if(value === "nochecked") return;
	var currActive = new Array();
	elements.each(function(){
		var current = $(this);
		if(current.hasClass("flight_result") && current.is(':visible')){
			currActive.push(current);
			current.remove();
		}
	});
	
	
	switch(value){
	case "Best": 
		sortByBest(currActive);
		break;
	case "Cheapest":
		sortByCheapest(currActive);
		break;
	case "Fastest":
		sortByFastest(currActive);
		break;
	default: 
		break;
	}
	
}

function sortByBest(elem_array){
	
}

function sortByCheapest(elem_array){
	for(var i = 0; i < elem_array.length; i++){
		for(var j = i+1; j < elem_array.length; j++){
			var c1 = elem_array[i];
			var c2 = elem_array[j];
			
			var classTofind1 = '.flight_price';
			var classTofind2 = '.flight_price';
			if(c1.hasClass('flight_oneway_return')
					|| c1.hasClass('flight_stop_oneway_return')){
				classTofind1 = '.flight_price_subtot';
			}
			if(c2.hasClass('flight_oneway_return')
					|| c2.hasClass('flight_stop_oneway_return')){
				classTofind2 = '.flight_price_subtot';
			}
			
			var value1 = c1.find(classTofind1).text();
			var value2 = c2.find(classTofind2).text();
			if(value1 > value2){
				elem_array[i] = c2;
				elem_array[j] = c1;
            }
        }
	}
	var price = elem_array[0].find(".flight_price").text();
	if(elem_array[0].hasClass('flight_stop_oneway_return') ||
			elem_array[0].hasClass('flight_oneway_return')){
		price = elem_array[0].find(".flight_price_subtot").text();
	}
	
	$('.cheap_price').text(price);
	
	for(var i = 0; i < elem_array.length; i++){
		$('.flight_container').append(elem_array[i]);
	}
}

function sortByFastest(elem_array){
	
	for(var i = 0; i < elem_array.length; i++){
		for(var j = i+1; j < elem_array.length; j++){
			var c1 = elem_array[i];
			var c2 = elem_array[j];
			
			var value1 = c1.find('.flight-header__connection-time-label').text();
			var value2 = c2.find('.flight-header__connection-time-label').text();
			if(convertTime(value1,value2)){
				elem_array[i] = c2;
				elem_array[j] = c1;
            }
        }
	}
	
	var price = elem_array[0].find(".flight_price").text();
	if(elem_array[0].hasClass('flight_stop_oneway_return') ||
			elem_array[0].hasClass('flight_oneway_return')){
		price = elem_array[0].find(".flight_price_subtot").text();
	}
	$('.fast_price').text(price);
	
	for(var i = 0; i < elem_array.length; i++){
		$('.flight_container').append(elem_array[i]);
	}
	
}

function convertTime(t1,t2){
	
	var f_split;
	var s_split;
	
	t1 = t1.replace(" ",'');
	t2 = t2.replace(" ",'');
	
	f_split = t1.split("h");
	s_split = f_split[1].split("min");
	var h1 = parseInt(f_split[0]);
	var m1 = parseInt(s_split[0]);
	
	f_split = t2.split("h");
	s_split = f_split[1].split("min");
	var h2 = parseInt(f_split[0]);
	var m2 = parseInt(s_split[0]);
	
	if(h1 > h2) return true;
	else if(h1 == h2 && m1>m2) return true;
	
	return false;
}




