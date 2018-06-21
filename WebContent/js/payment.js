$(function(){
	$.ajax({
		type: 'GET',
		url: 'pay',
		success: function(data){
			if(data.cards === false) return;
			var element = JSON.parse(data);
			element = element.cards;
			if(element.length != 0){
				for(var i = 0; i<element.length; i++){
					$('.card_list').append(''
							+'<li class="card_element" role="button" onclick="autocomplete(this);">'
							+'<span class="card_number">'+element[i].number+'</span>'
							+'<span class="card_hidden">'+i+'</span>'
							+'<input type="hidden" id="selected_card" name="selected_card">'
							+'</li>');
				}
			}
		}
	});
});

function autocomplete(elem){
	var selected = $(elem);
	var value = selected.find('.card_hidden').text();
	
	$.ajax({
		type: 'GET',
		url: 'pay',
		success: function(data){
			var element = JSON.parse(data);
			element = element.cards;
			if(element.length != 0){
				$('.remember_card').remove();
				var current = element[value];
				$('#cardName').val(current.name);
				$('#cardNumber').val(current.number);
				$('#cardCvv').val(current.cvv);
				
				var split = current.date.split("-");
				$('#cardYear').val(split[0]);
				$('#cardMonth').val(split[1]);

				$('#selected_card').val("selected");
				$('.autocomplete_card').hide();
			}
			
		}
	});
}

$(function(){
	$("#booking_form").submit(function(){
		event.preventDefault();
		console.log("submitting form..");
		var $inputs = $('#booking_form :input');
		var cardName = $('#cardName').val();
		var cardNumber = $('#cardNumber').val();
		var cardMonth = $('#cardMonth').val();
		var cardYear = $('#cardYear').val();
		var cardCvv = $('#cardCvv').val();
		var checkBox_id = $('#checkBox_id').val();
		console.log(cardName+" " + cardNumber+" "+ cardMonth+" "+ cardYear+" "+ cardCvv+" "+ checkBox_id);
		$.ajax({
			type:'POST',
			url:'pay',
			data: {
				"card_name":cardName,
				"card_number":cardNumber,
				"month_expiration":cardMonth,
				"year_expiration":cardYear,
				"card_cvv":cardCvv,
				"checkbox":checkBox_id
			},
			complete: function(){
				$('.flight_booked_container').show();
			}
		});
	});
});
