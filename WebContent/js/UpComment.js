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
    			console.log(element);
    			$("#mydiv").append(
    					'<div class="comment' + element.id_commento +'" >' +
    					
    						"<div class=\"media-left response-text-left\">" +
    							"<img class=\"media-object\"src=\"images/FlydownIco.png\" >" + 	
    								"<h5>" +
    								
    									"<p>"+ element.nome_utente +"</p>" +
    			
    								"</h5>" +
    						"</div>" +
    						"<div class=\"media-body response-text-right\">" + 
    						'<div class="divCommento"> <span id= "mymsg" class="spanCommento"> ' + element.msg + '</span> </div>' + '<div class="trashcomment"> <input type="image" onclick="deleteComment(' + element.id_commento + ')"src="images/cart_bin.png" > </div>'+
						'<div class="datacommento">' + 
							" <p>"+ element.data +"</p>"+
						"</div>" +	
    						"</div>" +
    					"</div>");

    			
    		}
    		
    	

    	});
    	
    	
    
	};
	

});
