function retrieveFlights(){
	var result = null;
	$.ajax({
		url: 'TicketResult',
		success: function(data){
			result = JSON.parse(data);
		},
		complete: function(){
			result = result.tickets;
			for(var i = 0; i<result.length; i++){
				var index = result[i].index;
				
				var dep_date = result[i].dep_date;
				var ret_date = result[i].ret_date;
				var dep_name = result[i].dep_name;
				var arr_name = result[i].arr_name;
				var stop = result[i].stop;
				var dep_time = result[i].dep_time;
				var arr_time = result[i].arr_time;
				var dep_time_r = result[i].dep_time_r;
				var arr_time_r = result[i].arr_time_r;
				var price = result[i].price;
				console.log(index + " -- " + dep_name + " " + arr_name);
				switch(index){
				case "1":{
					$('.list_ticket_user').append(''
						+'	<li class="list_ticket_item t_o_u">'
						+'	<div class="list_content_ticket">'
						+'		<span class="ticket_route">'
						+'		<span class="ticket_dep"><strong>Route: </strong>'+dep_name+'</span> - <span class="ticket_arr">'+arr_name+'</span>'
						+'		</span>'
						+'		<span class="ticket_date"><strong>Departure: </strong>'+ dep_date +'</span>'
						+'		<span class="ticket_time"><strong>Time: </strong>'+dep_time +' - '+ arr_time+'</span>'
						+'		<span class="ticket_price"><strong>Price: </strong><span>&#163; </span>'+price+'</span>  '
						+'	</div>  '
						+'</li>  '
						+'	');
					
					break;
				}
				case "2":{
					$('.list_ticket_user').append(''
					   +'		<li class="list_ticket_item">'
					   +'	<div class="list_content_ticket">'
					   +'		<span class="ticket_route">'
					   +'			<span class="ticket_dep"><strong>Route: </strong>'+dep_name+'</span> - <span class="ticket_arr">'+arr_name+'</span>'
					   +'		</span>'
					   +'		<span class="ticket_date"><strong>Departure: </strong>'+dep_date+'</span>'
					   +'		<span class="ticket_time"><strong>Time: </strong>'+dep_time+' - '+arr_time+'</span>'
					   +'		<div class="ticket_return_container">'
					   +'			<span class="ticket_route">'
					   +'				<span class="ticket_dep"><strong>Route: </strong>Gran Bretagna</span> - <span class="ticket_arr">London</span>'
					   +'			</span>'
					   +'			<span class="ticket_date"><strong>Return: </strong>'+ret_date+'</span>'
					   +'			<span class="ticket_time"><strong>Time: </strong>'+dep_time_r+' - '+arr_time_r+'</span>'
					   +'			<span class="ticket_price"><strong>Price: </strong><span>&#163; </span>'+price+'</span>'
					   +'		</div>'
					   +'	</div>'
					   +' </li>'
					   +'');
					break;
				}
				case "3":{
					$('.list_ticket_user').append(''
						+'	<li class="list_ticket_item t_o_u">'
						+'	<div class="list_content_ticket">'
						+'		<span class="ticket_route">'
						+'			<span class="ticket_dep"><strong>Route: </strong>'+ dep_name +'</span> - <span class="ticket_arr">'+ arr_name +'</span>'
						+'		</span>'
						+'		<span class="ticket_date"><strong>Departure: </strong>'+ dep_date +'</span>'
						+'		<span class="ticket_time"><strong>Time: </strong>'+dep_time+' - '+arr_time_r+'</span>'
						+'		<span class="ticket_price"><strong>Price: </strong><span>&#163; </span>'+price+'</span>'
						+'		<span class="ticket_stop"><strong>Stop: </strong><span class="ticket_stop_info">'+stop+'</span></span>'
						+'	</div>'
						+' </li>'
						+'');
					break;
				}
				case "4" :{
					$('.list_ticket_user').append(''		
							+'		<li class="list_ticket_item">'
							+'	<div class="list_content_ticket">'
							+'			<div class="list_content_ticket">'
							+'				<span class="ticket_route">'
							+'					<span class="ticket_dep"><strong>Route: </strong>'+dep_name+'</span> - <span class="ticket_arr">'+arr_name+'</span>'
							+'				</span>'
							+'				<span class="ticket_date"><strong>Departure: </strong>'+dep_date+'</span>'
							+'				<span class="ticket_time"><strong>Time: </strong>'+dep_time+' - '+arr_time+'</span>'
							+'				<span class="ticket_stop"><strong>Stop: </strong><span class="ticket_stop_info">'+stop+'</span></span>'
							+'			</div>'
							+'			<div class="ticket_return_container">'
							+'				<div class="list_content_ticket">'
							+'					<span class="ticket_route">'
							+'						<span class="ticket_dep"><strong>Route: </strong>'+arr_name+'</span> - <span class="ticket_arr">'+dep_name+'</span>'
							+'					</span>'
							+'					<span class="ticket_date"><strong>Return: </strong>'+ret_date+'</span>'
							+'					<span class="ticket_time"><strong>Time: </strong>'+dep_time_r+' - '+arr_time_r+'</span>'
							+'					<span class="ticket_price"><strong>Tot. Price: </strong><span>&#163; </span>'+price+'</span>'
							+'					<span class="ticket_stop"><strong>Stop: </strong><span class="ticket_stop_info">'+stop+'</span></span>'
							+'				</div>'
							+'			</div>'
							+'		</div>'
							+'	</li>'
							+'');
					
					break;
				}
				default: 
					break;
				}
			}
			$('.profile_info_container').show();
		}
		
	});
}