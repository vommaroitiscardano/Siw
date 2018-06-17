function update(x) {

	// with this two line I switch the 2 div
	$("#blog").css("display", "none");
	$("#post").css("display", "block");

	var content = $("#post-body" + x + " div p").text();
	var title = $("#post-body" + x + " div a").text();
	var img = $("#post-body" + x + " img").attr('src');

	var id_user = $("#post-body" + x + " p a").text();

	$("#id_post").text(x);
	$("#msg").text(content);
	$("#myh1").text(title);
	$("#img").attr("src", img);
	$("#user").text(id_user);
	$(".id_post_value").val(x);

	$.ajax({
		url : 'ShowComment',
		dataType : 'json',
		data : {
			npost : x
		},
		type : 'POST',
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(list) {
			$.each(list, function(i, item) {
				
				$("#mydiv").append(
					"<div class'comment'>" +
					
						"<div class=\"media-left response-text-left\">" +
							"<img class=\"media-object\"src=\"images/FlydownIco.png\" >" +
								"<h5>" +
								
									"<p>"+ item.utente +"</p>" +
			
								"</h5>" +
						"</div>" +
						"<div class=\"media-body response-text-right\">" + 
							"<p id=\"mymsg\">" + item.msg +"</p>" +
								"<ul>" + 
									" <li>"+ item.data +"<li>"+
								"</ul>" +	
						"</div>" +
					"</div>");	

			});

		}
	});

}