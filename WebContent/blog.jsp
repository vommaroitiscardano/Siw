<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">



<jsp:include page="/ShowPost" />



<html>
<head>
<!-- to call servlet "showPost" e diplay the posts -->

<title>Flydown - small price, big savings</title>
<!-- Custom Theme files -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="google-signin-client_id"
	content="36990781665-k6rlilkggjrmckp38t0545pmdfjt6i17.apps.googleusercontent.com">

<meta name="keywords"
	content="Govihar Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, 
	Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
<!-- //Custom Theme files -->
<link href="css/bootstrap.css" type="text/css" rel="stylesheet"
	media="all">
<link href="css/style.css" type="text/css" rel="stylesheet" media="all">
<link rel="stylesheet" href="css/flexslider.css" type="text/css"
	media="screen" />
<link type="text/css" rel="stylesheet" href="css/JFFormStyle-1.css" />
<!-- <link type="text/css" rel="stylesheet" href="css/jquery-ui.css" /> -->
<link href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
	rel="stylesheet">
<!-- js -->
<script src="js/jquery.min.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/modernizr.custom.js"></script>
<script src="js/menu_jquery.js"></script>
<script src="js/jquery.autocomplete.min.js"></script>
<script src="js/flightAutocomplete.js"></script>
<script src="js/fbLogin.js"></script>
<script src="js/showPostInOtherPage.js"></script>

<script src="js/googleLogin.js"></script>

<script src="https://apis.google.com/js/platform.js?onload=onLoad" async
	defer></script>
<script src="https://apis.google.com/js/api.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src='http://connect.facebook.net/en_US/all.js'></script>

<script src="js/SharePost.js"></script>
<script src="js/upload.js"></script>

<!-- //js -->
<script type="application/x-javascript">
	

	addEventListener("load", function() {
		setTimeout(hideURLbar, 0); 
	}, false);
	function hideURLbar(){
		window.scrollTo(0,1); 
	} 

</script>


<script>
	$(document).ready(function() {
		$('#horizontalTab').easyResponsiveTabs({
			type : 'default', //Types: default, vertical, accordion           
			width : 'auto', //auto or any width like 600px
			fit : true
		// 100% fit in a container
		});
	});
</script>
</head>


<body>

	<!--header-->
	<div class="header" id="header">
		<div class="container">
			<div class="header-grids">
				<div class="logo">
					<h1>
						<a href="index.html"><span>Fly</span>down</a> - small price, big
						savings
					</h1>
				</div>
			</div>
			<div class="nav-top">
				<div class="top-nav">
					<span class="menu"><img src="images/menu.png" alt="" /></span>
					<ul class="nav1">
						<li class="active">
						<li><a href="index.jsp">Flights</a></li>
						<li><a href="blog.html">Blog</a></li>
						<li><a href="about.html">About</a></li>
					</ul>
					<div class="clearfix"></div>
					<!-- script-for-menu  ANIMAZIONE Img vicino form voli -->
					<script>
						$("span.menu").click(function() {
							$("ul.nav1").slideToggle(300, function() {
								// Animation complete.
							});
						});
					</script>
					<!-- /script-for-menu -->
				</div>


				<!-- se l'utente non si è ancora loggato allora gli mostro la login form -->
				<c:if test="${loggato != null}">
					<p>benvenuto ${nome} ${email }
					<p>
						<c:if test="${tipo=='normale'}">
							<li class="nav-item mx-0 mx-lg-1"><a href="LoginServlet">
									<img id="logout" class="img-fluid" src="images/logout2.png"
									alt="" style="padding-top: 20%">
							</a></li>
						</c:if>
						<c:if test="${tipo=='facebook'}">
							<li class="nav-item mx-0 mx-lg-1"><a
								onclick="logoutFacebook()" href=""><img id="logout"
									class="img-fluid" src="images/logout2.png" alt=""
									style="padding-top: 20%"></a></li>
						</c:if>
						<c:if test="${tipo=='google'}">
							<li class="nav-item mx-0 mx-lg-1"><a
								onclick="logoutGoogle()" href=""><img id="logout"
									class="img-fluid" src="images/logout2.png" alt=""
									style="padding-top: 20%"></a></li>
						</c:if>
				</c:if>
				<c:if test="${loggato== null}">
					<div class="dropdown-grids">
						<div id="loginContainer">
							<a href="#" id="loginButton"><span>Login</span></a>
							<div id="loginBox">
								<form id="loginForm" action="LoginServlet" method="post">
									<div class="login-grids">
										<div class="login-grid-left">
											<fieldset id="body">
												<fieldset>
													<label for="userid">Email Address</label> <input
														type="text" name="userid" id="userid">
												</fieldset>
												<fieldset>
													<label for="password">Password</label> <input
														type="password" name="password" id="password">
												</fieldset>
												<input type="submit" id="login" value="Sign in"> <label
													for="checkbox"><input type="checkbox" id="checkbox">
													<i>Remember me</i></label>
											</fieldset>
											<span><a href="#">Forgot your password?</a></span>
											<div class="or-grid">
												<p>OR</p>
											</div>
											<div class="social-sits">
												<div class="fb-login-button" add target="_blank"
													data-max-rows="1" data-size="large"
													data-button-type="continue_with" data-show-faces="false"
													data-auto-logout-link="false" data-use-continue-as="false"
													scope="public_profile,email" onlogin="checkLoginState();"
													add target="_blank"></div>
												<div id="status">

													<div class="form-group row justify-content-center">
														<div class="g-signin2" data-onsuccess="onSignIn"
															data-theme="dark"></div>
													</div>
	

												</div>
												<div class="button-bottom">
													<p>
														New account? <a href="user_signup">Signup</a>
													</p>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</c:if>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>


	<!--//header-->
	<!-- banner -->
	<!-- banner-bottom -->
	<div class="banner-bottom">
		<!-- container -->
		<!-- container of the complete post -->
		
		<div class="containerup" id="post">
			<div class="faqs-top-grids">
				<div class="blog-grids">
					<div class="col-md-8 blog-left">
						<div class="blog-left-grid single-left-grid">
						
							<p>
								Posted By <a id = "user" href="#"></a> &nbsp;&nbsp; on June 2, 2015
								&nbsp;&nbsp; <a href="#"> Comments (10)</a>
							</p>
							<h2 id="myh1"></h2>
							<img id="img" src="" alt="" width="500px" height="600px">
							<div class="blog-left-right">
								<p id="msg"></p>
							</div>
							<div class="response">
							<p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
								<h3>Responses</h3>


								<div id="mydiv" class="media response-info">
									

								<div class="clearfix"></div>
								</div>
							</div>
							<div class="opinion">
								<h3>Leave your comment</h3>
								<form action="UploadComment" method="post">
									<textarea placeholder="Message" name="mess" required=""></textarea>
								
										<input type ="text" id="id_post" name="idPost" style="visibility:hidden;" class="id_post_value">
									
									<input type="submit" value="SEND">
								</form>
							</div>
						</div>
					</div>
					<div class="col-md-4 blog-right"></div>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>




		<div class="container" id="blog">
			<div class="about-info">
				<h2>Flydown Blog</h2>
			</div>
			<div class="opinion">
				<h3>Take a post</h3>
				<form method="post" action="UploadPost">
					<input type="text" name="title" placeholder="Title" required="">
					<textarea placeholder="Message" name="mess" required=""></textarea>
					<input type="file" name="file" accept="image/*" required="">
					<input class="img_link_post" id="img_link" name="link_image" type="text" value="">
					<input id="form_post_u"  type="submit" value="SEND">
				</form>
			</div>


			<div class="faqs-top-grids ">
				<div class="blog-grids blog_post_view">
					<div class="col-md-8 blog-left">

						<c:forEach items="${allPosts}" var="p">
							<div class="blog-left-grid" id="post-body${p.idPost}">
								<p>
									Posted By <a href="#">${p.utente}</a> &nbsp;&nbsp;on ${p.data}&nbsp;&nbsp; <a href="#">Comments (10)</a>
								</p>
								
								<a onclick="update(${p.idPost})"><img id="img"
									src="${p.imgname}" alt="" width="300px" height="500px"></a>
								<div class="blog-left-right">
									<a onclick="update(${p.idPost})">${p.title} </a>
									<p>${p.messaggio}</p>
									<input type="image" onclick="shareOnFacebook(${p.idPost})"src="images/fbshare.png" >
							<input type="image" onclick="shareOnTwitter(${p.idPost})" src="images/twitter.png">
								</div>
							</div>
						</c:forEach>


						<nav>
						<ul class="pagination">
							<li><a href="#" aria-label="Previous"> <span
									aria-hidden="true">«</span>
							</a></li>
							<li><a href="#">1</a></li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">5</a></li>
							<li><a href="#" aria-label="Next"> <span
									aria-hidden="true">»</span>
							</a></li>
						</ul>
						</nav>
					</div>

					<div class="clearfix"></div>
				</div>
			</div>
		</div>

		<!-- //container -->
	</div>
	<!-- //banner-bottom -->
	<!-- footer -->
	<div class="footer">
		<!-- container -->
		<div class="container">
			<div class="footer-top-grids">
				<div class="footer-grids">
					<div class="col-md-3 footer-grid">

						<div class="clearfix"></div>
					</div>
					<!-- news-letter -->
					<div class="news-letter">
						<div class="news-letter-grids">
							<div class="col-md-4 news-letter-grid">
								<p>
									Toll Free No : <span>1234-5678-901</span>
								</p>
							</div>
							<div class="col-md-4 news-letter-grid">
								<p class="mail">
									Email : <a href="mailto:info@example.com">mail@example.com</a>
								</p>
							</div>
							<div class="col-md-4 news-letter-grid">
								<form>
									<input type="text" value="Email" onfocus="this.value = '';"
										onblur="if (this.value == '') {this.value = 'Email';}"
										required=""> <input type="submit" value="Subscribe">
								</form>
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
					<!-- //news-letter -->
				</div>
			</div>
			<!-- //container -->
		</div>
		<!-- //footer -->
		<div class="footer-bottom-grids">
			<!-- container -->
			<div class="container">
				<div class="footer-bottom-top-grids">
					<div class="col-md-4 footer-bottom-left">
						<h4>Download our mobile Apps</h4>
						<div class="d-apps">
							<ul>
								<li><a href="#"><img src="images/app1.png" alt="" /></a></li>
								<li><a href="#"><img src="images/app2.png" alt="" /></a></a></li>
								<li><a href="#"><img src="images/app3.png" alt="" /></a></a></li>
							</ul>
						</div>
					</div>
					<div class="col-md-4 footer-bottom-left">
						<h4>We Accept</h4>
						<div class="a-cards">
							<ul>
								<li><a href="#"><img src="images/c1.png" alt="" /></a></li>
								<li><a href="#"><img src="images/c2.png" alt="" /></a></a></li>
								<li><a href="#"><img src="images/c3.png" alt="" /></a></a></li>
							</ul>
						</div>
					</div>
					<div class="col-md-4 footer-bottom-left">
						<h4>Follow Us</h4>
						<div class="social">
							<ul>
								<li><a href="#" class="facebook"> </a></li>
								<li><a href="#" class="facebook twitter"> </a></li>
								<li><a href="#" class="facebook chrome"> </a></li>
								<li><a href="#" class="facebook dribbble"> </a></li>
							</ul>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="copyright">
						<p>
							Copyrights © 2015 Govihar . Design by <a
								href="http://w3layouts.com/">W3layouts</a>
						</p>
					</div>
				</div>
			</div>
		</div>
		<script defer src="js/jquery.flexslider.js"></script>
		<script src="js/easyResponsiveTabs.js" type="text/javascript"></script>
		<script src="js/jquery-ui.js"></script>
		<script type="text/javascript" src="js/script.js"></script>
</body>
</html>