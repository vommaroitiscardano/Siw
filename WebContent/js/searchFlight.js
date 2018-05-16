
function sendData(){
	var departure = $("#departure").val();
	var destination = $("#destination").val();
	var date = $("#start-date").val();
	
	var values = date.split("/");
	
	var day = values[0]; //il giorno del volo
	var month = values[1];
	var year = values[2];

	$.ajax({
		type: "GET",		
		url: "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/SUF/MXP/years/2018/months/05?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX",		
		success: function(data){
			alert("FRASE DEL GIORNO:\n" + data.body);
		}	
	});	
	
//	 $.ajax({
//		 dataType: "json",
//		 url: "http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/SUF/MXP/years/2018/months/05?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX",
//		 success: function(){
//			 alert("okkkkkkkkk");
//	    }});
//	alert("11");
//	$.getJSON("http://apigateway.ryanair.com/pub/v1/timetable/3/schedules/"+departure+"/"+destination+"/years/"+year+"/months/"+month+"?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX", function(data){
//	    alert(data);
//	});


}

