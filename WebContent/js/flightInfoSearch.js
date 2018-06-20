$(function(){
	//verifico che nessa session ci sia già un elemento nel carrello; in tal caso lo visualizzo
	$.ajax({
		url:"cart",
		success: function(data){
			if(data !== "emptyCart"){
				$(".default_body_cart").hide();
				$('.flight_body_cart').show();
				
				var content = JSON.parse(data);
				$('.breakdown_list').append(content.htmlContent);
				
				$('.adults_num').text(content.adults);
				$('.children_num').text(content.children);
				$('.item_price').text(content.price);
				$('.tot_price').text(content.price);
				
				var button = $('#flightCart');
				var box = $('#cartBox');
				box.toggle();
				button.toggleClass('active');
			}
		}
	});
});

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
	var siblings = $(element).parent().siblings();  //vengono recuperati i fratelli dell'elemento parametro
	var info;
	var departure;
	var destination; 
	var start_date; 
	var end_date;
	var adults;
	var children;
	
	$.ajax({
		url: 'checkRoute',
		success: function(data){
			var res = JSON.parse(data);
			adults = res.adults;
			children = res.children;
		},
		complete: function(){
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
			
			start_date = convertDate(start_date);
			end_date = convertDate(end_date);

			//console.log(departure +" " + destination + " "+ start_date +" "+ end_date);
			
			var url = 'https://www.ryanair.com/it/it/booking/home/'+departure+'/'+destination+'/'+start_date+'/'+end_date+'/'+adults+'/'+children+'/0/0';
			
			//redirect al sito ryanair
			window.location.replace(url);

		}
	});
}

function addToChart(element, classIndex){
	
	//non è possibile aggiungere più di un volo al carrello
	if($(element).hasClass("localSearchDisabled")){
		return;
	}
	
	//riporta la pagina in alto
	$("html, body").animate({ scrollTop: 0 }, "slow");
	
	//viene nascosto il div cart_free
	$(".default_body_cart").hide();
	
	//contenuto da visualizzare
	var siblings = $(element).parent().siblings();  //vengono recuperati i fratelli dell'elemento parametro
	var info;
	var dep_name = "";
	var arr_name = ""; 
	var start_date = ""; 
	var end_date = "";
	var adults = "";
	var children = "";
	var stop = "";
	var dep_time = "";
	var arr_time = "";
	var dep_time_r = "";
	var arr_time_r = "";
	var dep_time1 = "";
	var arr_time1 = "";
	var dep_time_r1 = "";
	var arr_time_r1 = "";
	
	
	var price = "";
	
	//disabilito tutti i bottoni
	$('.localSearch').addClass("localSearchDisabled");
	
	$.ajax({
		url: 'checkRoute',
		success: function(data){
			var res = JSON.parse(data);
			
			start_date = res.start_date;
			if(res.end_date){
				end_date = res.end_date;
			}
			
			adults = res.adults;
			children = res.children;
			
			dep_name = res.dep_name;
			arr_name = res.arr_name;
		},
		complete: function(){

			/** 1: volo di andata diretto
			 *  2: volo di andata e ritorno diretto
			 *  3: volo di andata con scalo
			 *  4: volo di andata e ritorno con scalo
			 */
			//abilito gli elementi nel carrello
			$('.flight_body_cart').show();
			var pendingElement = "";
			//ora partenza/arrivo, prezzo, scalo
			switch (classIndex) {
			case 1: //andata diretto
				var parent = $(siblings[0]).parent().siblings();
				dep_time = $(parent).find('.start-time').html(); 
				arr_time = $(parent).find('.end-time').html(); 
				price = $(parent).find('.price_oneway').html(); 
				
				pendingElement = ''
					+'	<li class="flight_list_item">  '
					+'		<div class="trip_item">  '
					+'			<div class="trip_item_segment">  '
					+'				<div class="flight_cities">  '
					+'					<span> <strong>'+dep_name+'</strong> to <strong>'+arr_name+'</strong></span>  '
					+'				</div>  '
					+'				<div class="flight_schedule">  '
					+'					<span>'+start_date+'  '+dep_time+' - '+arr_time+'</span>  '
					+'				</div>  '
					+'			</div>  '
					+'		</div>  '
					+'	</li> ' ;
				
				$('.breakdown_list').append(pendingElement);
				
				$('.adults_num').text(adults);
				$('.children_num').text(children);
				$('.item_price').text(price);
				$('.tot_price').text(price);

//				console.log(dep_time + " " + arr_time +" " + price + " " + start_date);
				break;
			case 2: //andata/ritorno diretto
				info = $(siblings[1]);
				dep_time = $(info).find('.dep_time strong').html();
				arr_time = $(info).find('.arr_time strong').html(); 
				info = $(siblings[4]);
				dep_time_r = $(info).find('.dep_time strong').html(); 
				arr_time_r = $(info).find('.arr_time strong').html(); 
				info = $(siblings[6]);
				price = $(info).find('.price_oneway').html(); 
				
				pendingElement = ''
					+'	<li class="flight_list_item">  '
					+'		<div class="trip_item">  '
					+'			<div class="trip_item_segment">  '
					+'				<div class="flight_cities">  '
					+'					<span> <strong>'+dep_name+'</strong> to <strong>'+arr_name+'</strong></span>  '
					+'				</div>  '
					+'				<div class="flight_schedule">  '
					+'					<span>'+start_date+'  '+dep_time+' - '+arr_time+'</span>  '
					+'				</div>  '
					+'			</div>  '
					+'		</div>  '
					+'	</li> '
					+'	<li class="flight_list_item">  '
					+'		<div class="trip_item">  '
					+'			<div class="trip_item_segment">  '
					+'				<div class="flight_cities">  '
					+'					<span> <strong>'+arr_name+'</strong> to <strong>'+dep_name+'</strong></span>  '
					+'				</div>  '
					+'				<div class="flight_schedule">  '
					+'					<span>'+end_date+'  '+dep_time_r+' - '+arr_time_r+'</span>  '
					+'				</div>  '
					+'			</div>  '
					+'		</div>  '
					+'	</li> ';
				
				$('.breakdown_list').append(pendingElement);
					
					$('.adults_num').text(adults);
					$('.children_num').text(children);
					$('.item_price').text(price);
					$('.tot_price').text(price);
				
//				console.log(dep_time + " " + arr_time +" "+dep_time_r+" " +arr_time_r+" " + price );
				break;
			case 3: //andata con scalo
				info = $(siblings[1]);
				stop = $(info).find('.air-stop-name').html(); 
				dep_time = $(info).find('.dep_time strong').html(); 
				arr_time = $(info).find('.arr_time strong').html(); 
				info = $(siblings[2]);
				dep_time_r = $(info).find('.dep_time strong').html(); 
				arr_time_r = $(info).find('.arr_time strong').html(); 
				
				var parent = $(siblings[0]).parent().siblings();
				price = $(parent).find('.price_oneway').html(); 
				
				pendingElement = ''
					+'	<li class="flight_list_item">  '
					+'		<div class="trip_item">  '
					+'			<div class="trip_item_segment">  '
					+'				<div class="flight_cities">  '
					+'					<span> <strong>'+dep_name+'</strong> to '+stop+'</span>  '
					+'				</div>  '
					+'				<div class="flight_schedule">  '
					+'					<span>'+start_date+'  '+dep_time+' - '+arr_time+'</span>  '
					+'				</div>  '
					+'			</div>  '
					+'		</div>  '
					+'	</li> '
					+'	<li class="flight_list_item">  '
					+'		<div class="trip_item">  '
					+'			<div class="trip_item_segment">  '
					+'				<div class="flight_cities">  '
					+'					<span> '+stop+' to <strong>'+arr_name+'</strong></span>  '
					+'				</div>  '
					+'				<div class="flight_schedule">  '
					+'					<span>'+start_date+'  '+dep_time_r+' - '+arr_time_r+'</span>  '
					+'				</div>  '
					+'			</div>  '
					+'		</div>  '
					+'	</li> ';
				
				$('.breakdown_list').append(pendingElement);
					
					$('.adults_num').text(adults);
					$('.children_num').text(children);
					$('.item_price').text(price);
					$('.tot_price').text(price);
				
				
//				console.log(dep_time + " " + arr_time +" " + price + " " + stop);
				
				break;
			case 4://andata/ritorno con scalo
				//departure with stopover
				info = $(siblings[1]);
				dep_time = $(info).find('.dep_time strong').html();
				arr_time = $(info).find('.arr_time strong').html(); 
				stop = $(info).find('.air-stop-name').html();
				info = $(siblings[2]);
				dep_time1 = $(info).find('.dep_time strong').html();
				arr_time1 = $(info).find('.arr_time strong').html(); 
				
				//return with stopover
				info = $(siblings[5]);
				dep_time_r = $(info).find('.dep_time strong').html();
				arr_time_r = $(info).find('.arr_time strong').html(); 
				info = $(siblings[6]);
				dep_time_r1 = $(info).find('.dep_time strong').html();
				arr_time_r1 = $(info).find('.arr_time strong').html(); 

				info = $(siblings[8]);
				price = $(info).find('.price_oneway').html(); 

				pendingElement = ''
					+'	<li class="flight_list_item">  '
					+'		<div class="trip_item">  '
					+'			<div class="trip_item_segment">  '
					+'				<div class="flight_cities">  '
					+'					<span> <strong>'+dep_name+'</strong> to '+stop+'</span>  '
					+'				</div>  '
					+'				<div class="flight_schedule">  '
					+'					<span>'+start_date+'  '+dep_time+' - '+arr_time+'</span>  '
					+'				</div>  '
					+'			</div>  '
					+'		</div>  '
					+'	</li> '
					+'	<li class="flight_list_item">  '
					+'		<div class="trip_item">  '
					+'			<div class="trip_item_segment">  '
					+'				<div class="flight_cities">  '
					+'					<span> '+stop+' to <strong>'+arr_name+'</strong></span>  '
					+'				</div>  '
					+'				<div class="flight_schedule">  '
					+'					<span>'+start_date+'  '+dep_time1+' - '+arr_time1+'</span>  '
					+'				</div>  '
					+'			</div>  '
					+'		</div>  '
					+'	</li> '
					+'	<li class="flight_list_item">  '
					+'		<div class="trip_item">  '
					+'			<div class="trip_item_segment">  '
					+'				<div class="flight_cities">  '
					+'					<span> <strong>'+arr_name+'</strong> to '+stop+'</span>  '
					+'				</div>  '
					+'				<div class="flight_schedule">  '
					+'					<span>'+end_date+'  '+dep_time_r+' - '+arr_time_r+'</span>  '
					+'				</div>  '
					+'			</div>  '
					+'		</div>  '
					+'	</li> '
					+'	<li class="flight_list_item">  '
					+'		<div class="trip_item">  '
					+'			<div class="trip_item_segment">  '
					+'				<div class="flight_cities">  '
					+'					<span> '+stop+' to <strong>'+dep_name+'</strong></span>  '
					+'				</div>  '
					+'				<div class="flight_schedule">  '
					+'					<span>'+end_date+'  '+dep_time_r1+' - '+arr_time_r1+'</span>  '
					+'				</div>  '
					+'			</div>  '
					+'		</div>  '
					+'	</li> ';
				
				$('.breakdown_list').append(pendingElement);
					
					$('.adults_num').text(adults);
					$('.children_num').text(children);
					$('.item_price').text(price);
					$('.tot_price').text(price);
				break;

			default:
				break;
			}
		
			console.log(dep_time + " " + arr_time +" "+dep_time1+" " +arr_time1+" " + stop + " /// " +dep_time_r + " " + arr_time_r +" "+dep_time_r1+" " +arr_time_r1+" "+ price);
			//invio i dati alla servlet
			$.ajax({
				type: 'POST',
				url: 'cart',
				data:{
					"index": classIndex,
					"current_stop": stop,
					"dep_time": dep_time,
					"arr_time": arr_time,
					"dep_time_r": dep_time_r,
					"arr_time_r": arr_time_r,
					"dep_time1": dep_time1,
					"arr_time_1": arr_time1,
					"dep_time_r1": dep_time_r1,
					"arr_time_r1": arr_time_r1,
					"price": price,
					"add": "true",
					"htmlContent": pendingElement
				}
			});
			
			 var button = $('#flightCart');
			 var box = $('#cartBox');
			 box.toggle();
			 button.toggleClass('active');
			
		}//complete
	});
		
}

function emptyCart(){
	$('.flight_list_item').remove();
	$('.localSearch').removeClass("localSearchDisabled");
	$('.flight_body_cart').hide();

	$(".default_body_cart").show();
	
	$.ajax({
		type: 'POST',
		url: 'cart',
		data:{
			"add": "false"
		}
	});
	
}


function convertDate(dateToConvert){
	if(!dateToConvert) return '';
	var parts = dateToConvert.split("/");
	var y = parts[2].concat("-"+parts[1]);
	var t = y.concat("-"+parts[0]);
	return t;
}

