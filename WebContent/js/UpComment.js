$(function(){
	
	document.getElementById("commentSend").onsubmit = function(ev) {
		ev.preventDefault();

		  var content = $('.textComment').val();
		  var id = $('.id_post_value').val();
		  
		  
		  //per pulire i campi della form
		  $('.textComment').val('');
		  
		  
		  
		  

    	$.ajax({
    		url : 'UploadComment',
    		dataType : 'json',
    		data : {
    			content : content,
    			id : id
    		},
    		type : 'POST',
    		cache : false,
    		error : function() {
    			alert('error');
    		},
    		success : function(element){
    			$("#mydiv").append(
    					"<div class'comment'>" +
    					
    						"<div class=\"media-left response-text-left\">" +
    							"<img class=\"media-object\"src=\"images/FlydownIco.png\" >" +
    								"<h5>" +
    								
    									"<p>"+ element.utente +"</p>" +
    			
    								"</h5>" +
    						"</div>" +
    						"<div class=\"media-body response-text-right\">" + 
    							"<p id=\"mymsg\">" + element.msg +"</p>" +
    								"<ul>" + 
    									" <li>"+ element.data +"<li>"+
    								"</ul>" +	
    						"</div>" +
    					"</div>");

    			
    		}
    		
    	

    	});
    	
    	
    
	};
	

});
