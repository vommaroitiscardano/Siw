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