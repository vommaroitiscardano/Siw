function deletePost(x){
	
	 $.ajax({
	    	url : 'DeletePost',
			data : {
				npost : x,
				},
			type : 'GET',
			cache : false,
			error : function() {
				alert('error');
			},
			success : function() {
				window.location='blog.jsp';
				}	
			});
	
	
}