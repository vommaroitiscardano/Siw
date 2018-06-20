	var nPost = 5;
	var maxPost = 0;
	var scrollPost = true;
		

function loadPost(){
		 		 
			
		    $.ajax({
		    	url : 'ShowPost',
				dataType : 'json',
				data : {
					npost : nPost,
					maxpost : maxPost
				},
				type : 'GET',
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(list) {
					console.log(list);
						if (list.nopost){
							$('.spinner').hide();
							scrollPost = false;
							$(".noMorePost").append(
									"<h3 align='center'>! No more post !</h3>	"
									
							);
							
							return;
						}
						
						$.each(list, function(i, item) {
							console.log(item.utente_sessione);
							if(item.utente != item.utente_sessione){							
							//console.log(item.img);
							$("#appendPost").append(
									"<div class=\"blog-left-grid\" id=\"post-body" + item.id_post + "\">" +
									"<p>" +
										"Posted By <a href=\"#\">" + item.utente + "</a> &nbsp;&nbsp;on "+ item.data +" <a href=\"#\">Comments (10)</a>" +
									"</p>" +
									'<a onclick="update(' + item.id_post + ')"><img id="img" src="' + item.img + '" width="300px" height="500px"/></a>' +
									'<div class="blog-left-right">'+
										'<a onclick="update(' + item.id_post+  ')">' + item.title + ' </a>'+
										'<p>' + item.msg + '</p>'+
										'<input type="image" onclick="shareOnFacebook(' + item.id_post + ')"src="images/fbshare.png" >'+
								'<input type="image" onclick="shareOnTwitter(' + item.id_post  +')" src="images/twitter.png">'+
									'</div>'+
								'</div>' 
							);
							}
							
							
							else{						
								//console.log(item.img);
								$("#appendPost").append(
										"<div class=\"blog-left-grid\" id=\"post-body" + item.id_post + "\">" +
										"<p>" +
											"Posted By <a href=\"#\">" + item.utente + "</a> &nbsp;&nbsp;on "+ item.data +"&nbsp;&nbsp; <a href=\"#\">Comments (10)</a> " +'<div class="trashome"> <input type="image" onclick="deletePost(' + item.id_post + ')"src="images/cart_bin.png" > </div>' +
										"</p>" +
										'<a onclick="update(' + item.id_post + ')"><img id="img" src="' + item.img + '" width="300px" height="500px"/></a>' +
										'<div class="blog-left-right">'+
											'<a onclick="update(' + item.id_post+  ')">' + item.title + ' </a>'+
											'<p>' + item.msg + '</p>'+
											'<input type="image" onclick="shareOnFacebook(' + item.id_post + ')"src="images/fbshare.png" >'+
									'<input type="image" onclick="shareOnTwitter(' + item.id_post  +')" src="images/twitter.png">'+
										'</div>'+
									'</div>' 
								);
								}
							
							
							
							
							
						});
				
						maxPost = maxPost + nPost;
					
				}
		    });

		    }



$( document ).ready(function() {
	
	    	loadPost();
});


$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
		   if(!scrollPost) return;
		   $('.spinner').show();
	       setTimeout(loadPost,2000);
	   }
	});




