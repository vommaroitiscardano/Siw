$(document).ready(function() {
			
	$('#id_name').on('input', function() {
		var input = $(this);
		var regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
		var is_name=regex.test(input.val());
		if(is_name){
			input.addClass("valid");
		} else{
			input.removeClass("valid").addClass("invalid");
		}
	});
	
	$('#id_surname').on('input', function() {
		var input = $(this);
		var regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
		var is_name=regex.test(input.val());
		if(is_name){
			input.addClass("valid");
		} else{
			input.removeClass("valid").addClass("invalid");
		}
	});
	
	$('#id_email').on('input', function() {
		var input=$(this);
		var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var is_email=regex.test(input.val());
		if(is_email){
			input.addClass("valid");
		} else{
			input.removeClass("valid").addClass("invalid");
		}
	});
	
	$('#id_password, #id_check_password').on('input', function() {
		var input = $(this);
		var is_name = input.val().length;
		if(is_name > 4){
			input.addClass("valid");
		} else{
			input.removeClass("valid").addClass("invalid");
		}
	});
	
	
	
	/*
	 * Evento attivato quando viene sottomessa la form
	 */
	$(".cl_form").on("submit", function(event){
		var form_data = $(".cl_form").serializeArray();
		var no_error = true;
		for (var i in form_data){
			var element = $("#id_"+form_data[i]['name']);
			var valid = element.hasClass("valid");
			var error_element = $("#id_error", element.parent());
			if (!valid){
				error_element.removeClass("error").addClass("error_show"); 
				no_error = false;
			} else{
				error_element.removeClass("error_show").addClass("error");
			}
		}
		
		//verifico che la pw coincida in entrambi i casi
		var pw = $("#id_password");
		var c_pw = $("#id_check_password");
		var er_el1 = $("#id_error", pw.parent());
		var er_el2 = $("#id_error", c_pw.parent());
		if(pw.val() !== c_pw.val() || pw.val() === ""){
			er_el1.removeClass("error").addClass("error_show"); 
			er_el2.removeClass("error").addClass("error_show"); 
			no_error = false;
		} else{
			er_el1.removeClass("error_show").addClass("error"); 
			er_el2.removeClass("error_show").addClass("error"); 
		}
		
		if (!no_error){
			event.preventDefault(); //annulla l'evento di submit della form
		}
		else{
			alert('Form will be submitted');
		}
	});
	
});












