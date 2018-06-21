function deleteComment(x){
	
	 $.ajax({
	    	url : 'DeleteComment',
			data : {
				ncomment : x,	
				},
			type : 'GET',
			cache : false,
			error : function() {
				alert('error');
			},
			success : function() {
				$('.comment'+ x).remove();
				}	
			});
	
	
}