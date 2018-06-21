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
    			
    			
    			window.location ='blog.jsp';
    		}    	

    	});
	};
	
});
