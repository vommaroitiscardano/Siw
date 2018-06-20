$(function(){
	
	document.getElementById("post-send").onsubmit = function(ev) {
		ev.preventDefault();

//		var content = document.getElementById("mess1").val();
//		var title = document.getElementById("titolo").value();
//		var img = document.getElementById("img_link1").value();
		
    	alert("SUBMIT");
	
		  var title = $('.miop').val();
		  var content = $('.mioc').val();
		  var img = $('.mioo').val();
		  
		  $('.miop').val('');
		  $('.mioc').val('');
		  $('.mioo').val('');

	
    	$.ajax({
    		url : 'UploadPost',
    		dataType : 'json',
    		data : {
    			"content" : content,
    			"title" : title,
    			"img" : img
    		},
    		type : 'POST',
    		success : function(element){
    			$("#appendPost").append(
    					"<div class=\"blog-left-grid\" id=\"post-body\"" + element.id_post + ">"+
						"<p>" +
							"Posted By <a" + element.utente +"</a> &nbsp;&nbsp;on" + element.data + "&nbsp;&nbsp; <a>Comments (10)</a>"+
						"</p>" +					
						"<a onclick=\"update(" + element.id_post + ")\"> <img id=\"img\"src=\"${" + element.img + "}\" width=\"300px\" height=\"500px\"></a>" +
						"<div class=\"blog-left-right\">" +
							"<a onclick=\"update(${" + element.id_post + "})\">" + element.title + " </a>" + 
							"<p>${" + element.msg + "}</p>" + 						
						"</div>" +
					"</div>"	
    			);
    			window.location ='blog.jsp';
    		}    	

    	});
	};
	
});
