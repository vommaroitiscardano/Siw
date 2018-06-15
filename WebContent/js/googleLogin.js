function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();

	var email = profile.getEmail();
	var name = profile.getGivenName();
	var surname = profile.getFamilyName();

	console.log(email);
	console.log(name);
	console.log(surname);

	$.ajax({
		url : 'SocialLogin',
		data : "email=" + email + "&nome=" + name + "&cognome=" + surname + "&tipo=google",
		type : 'POST',
		cache : false,
		error : function() {
			alert('error');
		},
		async : false,
		success : function(response) {
			console.log(response)
			window.location="index.jsp";
	
		
		}
	});
}


//SIGN OUT
function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function() {
		console.log('User signed out.');
	});
}


function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }

function logoutGoogle() {
	signOut();
	console.log("logout");
	$.ajax({
		url : 'SocialLogin',
		data : "",
		type : 'GET',
		cache : false,
		error : function() {
			alert('error');
		},
		async : false,
	}).done(function(risposta){
		window.location.replace("index.jsp");
	});
}