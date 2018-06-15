function showDetails(element){
	var siblings = $(element).siblings();
	
	var info = $(siblings[0]);
	if(info.hasClass('flight_info_opened')){
		info.removeClass('flight_info_opened');
	}
	else{
		info.addClass('flight_info_opened');
	}
		
}
/*
 * @element si riferisce all'oggetto che viene clickato per abilitare il redirect
 * */
function redirect(element){
	var siblings = $(element).siblings();  //vengono recuperati i fratelli dell'elemento parametro
	var info;
	var departure;
	var destination; 
	var start_date; 
	var end_date;
	var adults;
	var children;
	//voli solo andata
	if(siblings.length < 4){
		info = $(siblings[1]);
		departure = $(info).find('.dep_info_iata').html();
		destination = $(info).find('.arr_info_iata').html(); 
		info = $(siblings[2]);
		start_date = $(info).find('.start_info_date').html(); 
		end_date = "";
	}//voli andata e ritorno
	else{
		info = $(siblings[0]);
		start_date = $(info).find('.start_info_date').html(); 
		info = $(siblings[1]);
		departure = $(info).find('.dep_info_iata').html();
		destination = $(info).find('.arr_info_iata').html(); 
		info = $(siblings[3]);
		end_date = $(info).find('.end_info_date').html(); 
	}
	
	adults = 1;
	children = 0;
	
	start_date = convertDate(start_date);
	end_date = convertDate(end_date);

	console.log(departure +" " + destination + " "+ start_date +" "+ end_date);
	
	var url = 'https://www.ryanair.com/it/it/booking/home/'+departure+'/'+destination+'/'+start_date+'/'+end_date+'/'+adults+'/'+children+'/0/0';
	
	//redirect al sito ryanair
	window.location.replace(url);
}


function convertDate(dateToConvert){
	if(!dateToConvert) return '';
	console.log("curr: "+ dateToConvert);
	var parts = dateToConvert.split("/");
	var y = parts[2].concat("-"+parts[1]);
	var t = y.concat("-"+parts[0]);
	return t;
}