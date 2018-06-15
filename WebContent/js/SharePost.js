window.fbAsyncInit = function() {
    FB.init({
      appId      : '199531254023805',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.0'
    });      
  };

  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "https://connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));
  
  function shareOnFacebook(x){
	  var title = $("#post-body"+x+" div a").text();
	  var content = $("#post-body"+x+" div p").text();
	  var text = title+ "\r\n" +"\r\n"+  "\r\n"+content;
	  var img =  $("#post-body"+x+" img").attr('src');
	  console.log(img);
	    FB.ui({
	      method: 'share',
	      display: 'popup',
	      href: img,
	      quote: text,
	    }, function(response){});
	  }
  

function shareOnTwitter(x){
	 var title = $("#post-body"+x+" div a").text();
	  var content = $("#post-body"+x+" div p").text();
	  var text = title+ "\r\n" +"\r\n"+  "\r\n"+content;
	  
	  var url = "https://twitter.com/intent/tweet";
	  var via = "userName";
	  window.open(url+"?text="+text,"","width=500,height=300");
}