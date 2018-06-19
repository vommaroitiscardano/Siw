<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Flydown - small price, big savings</title>
<!-- Custom Theme files -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<meta name="google-signin-client_id" content="36990781665-k6rlilkggjrmckp38t0545pmdfjt6i17.apps.googleusercontent.com">

<script type="application/x-javascript">
	addEventListener("load", function() { 
		setTimeout(hideURLbar, 0); 
	}, false);
	function hideURLbar(){ 
		window.scrollTo(0,1); 
	}
</script>
<!-- //Custom Theme files -->
<link href="css/bootstrap.css" type="text/css" rel="stylesheet"	media="all">
<link href="css/style.css" type="text/css" rel="stylesheet" media="all">
<link rel="stylesheet" href="css/flexslider.css" type="text/css" media="screen" />
<link type="text/css" rel="stylesheet" href="css/JFFormStyle-1.css" />
<link rel="icon" href="images/favicon.ico">
<!-- js -->
<script src="js/jquery.min.js"></script>
<script src="js/modernizr.custom.js"></script>
<script src="js/signup.js"></script>

<script src="js/googleLogin.js"></script>
<script src="js/fbLogin.js"></script>

<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
<script src="https://apis.google.com/js/api.js"></script>
<script src='http://connect.facebook.net/en_US/all.js'></script>

<!-- //js -->
<script type="text/javascript">
		$(document).ready(function () {
			$('#horizontalTab').easyResponsiveTabs({
				type: 'default', //Types: default, vertical, accordion           
				width: 'auto', //auto or any width like 600px
				fit: true   // 100% fit in a container
			});
		});
	</script>
<!--pop-up-->
<script src="js/menu_jquery.js"></script>
<!--//pop-up-->
</head>
<body>
	<!--header-->
	<div class="header">
		<div class="container">
			<div class="header-grids">
				<div class="logo">
					<h1>
						<a href="index.jsp"><span>Fly</span>down</a> - small price, big savings
					</h1>
				</div>
				<!--navbar-header-->
				<div class="header-dropdown">
					<div class="emergency-grid"></div>
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
			</div>
			<div class="nav-top">
				<div class="top-nav">
					<span class="menu"><img src="images/menu.png" alt="" /></span>
					<ul class="nav1">
						<li class="active">
						<li><a href="index.jsp">Flights</a></li>
						<li><a href="blog.jsp">Blog</a></li>
						<li><a href="about.jsp">About</a></li>
					</ul>
					<div class="clearfix"></div>
				</div>
				<c:if test="${loggato == null}">
					<div class="dropdown-grids">
						<div id="loginContainer">
							<a href="#" id="loginButton"><span>Login</span></a>
							<div id="loginBox">
								<form id="loginForm" action="LoginServlet" method="post">
									<div class="login-grids">
										<div class="login-grid-left">
											<fieldset id="body">
												<fieldset>
													<label for="userid">Email Address</label>
													<input type="text" name="userid" id="userid">
												</fieldset>
												<fieldset>
													<label for="password">Password</label>
													<input type="password" name="password" id="password">
												</fieldset>
												<input type="submit" id="login" value="Sign in"> 
												<input type="hidden" value="user_signup" name="page">
											</fieldset>
											<div class="or-grid">
												<p>OR</p>
											</div>
											<div class="social-sits">
												<div class ="socialBotton">
													<div class = "fbButton">
														<div class="fb-login-button" add target="_blank"
															data-max-rows="1" data-size="large"
															data-button-type="continue_with" data-show-faces="false"
															data-auto-logout-link="false" data-use-continue-as="false"
															scope="public_profile,email" onlogin="checkLoginState('index.jsp');"
															add target="_blank">
														</div>
													</div>
													<div>
														<div class="form-group row justify-content-center" role="button" onclick="getCurrPage('user_signup')">
															<div class="g-signin2" data-width="257" data-height="40" data-onsuccess="onSignIn"
																	data-theme="dark">
															</div>
														</div>	
													</div>
												</div>
													<p>New account? <a href="user_signup">Signup</a></p>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</c:if>
				<c:if test="${loggato != null}">
					<div class="dropdown-grids_after" id="outer_box">
						<div id="afterLoginButton" role="button">
							<span class="after_user_name">${nome}</span>
							<div class="_user_ico"><img src="" height=30px;></div>
						</div>
						<div class="afterLoginUtils" id="inner_box">
							<ul class="list_content_profile">
								<li class="list_content p_list" role="button" onclick="">
									<a class="profile_link_style" href="profile.jsp"><span>Profile</span></a>
								</li>
								<li class="list_content l_list" role="button" onclick="">
									<c:if test="${tipo =='normale'}">
										<a href="LoginServlet"><span>Logout</span></a>
									</c:if>
									<c:if test="${tipo =='facebook'}">
										<a onclick="logoutFacebook();" href=""><span>Logout</span></a>
									</c:if>
									<c:if test="${tipo =='google'}">
										<a onclick="logoutGoogle();" href=""><span>Logout</span></a>
									</c:if>
								</li>
							</ul>
						</div>
					</div>
				</c:if>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<!--//header-->
	<!-- banner-bottom -->
	<div class="banner-bottom">
		<!-- container -->
		<div class="container">
			<div class="faqs-top-grids">
				<div class="book-grids">
					<div class="col-md-6 book-left">
						<div class="book-left-info">
							<h3>
								<center>Create your Flydown account</center>
							</h3>
						</div>
						<div class="book-left-form">
							<form class="cl_form" method="post" action="user_signup">
								<div>
									<span class="spanLeft">First Name</span>
									<span class="error" id="id_error">This field is required!</span>
									<input class="none" type="text" name="name" id="id_name">
								</div>
								<div>
									<span class="spanLeft">Last Name</span>
									<span class="error" id="id_error">This field is required!</span>
									<input class="none" type="text" name="surname" id="id_surname">
								</div>
								<div>
									<span class="spanLeft">Email Address</span>
									<span class="error" id="id_error">This field is required!</span>
									<input class="none" type="text" name="email" id="id_email">
								</div>
								<div>
									<span class="spanLeft">Password</span>
									<span class="error" id="id_error">This field is required!</span>
									<input class="none" type="password" name="password" id="id_password">
								</div>
								<div>
									<span class="spanLeft">Confirm Password</span>
									<span class="error" id="id_error">This field is required!</span>
									<input class="none" type="password" name="check_password" id="id_check_password">
								</div>
								<div id="id_submit">
									<input type="submit" value="Register" name="submit">
								</div>
							</form>
						</div>
					</div>
		
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
		<!-- //container -->
	</div>
	<!-- //banner-bottom -->
	<div class="footer"></div>
		<div class="footer-bottom-grids">
			<!-- container -->
			<div class="container">
				<div class="footer-bottom-top-grids">
					<div class="col-md-4 footer-bottom-left">
						<h4>Download our mobile Apps</h4>
						<div class="d-apps">
							<ul>
								<li><a href="#"><img src="images/app1.png" alt="" /></a></li>
								<li><a href="#"><img src="images/app2.png" alt="" /></a></li>
								
							</ul>
							
						</div>
					</div>
					<div class="col-md-4 footer-bottom-left">
						<h4>We Accept</h4>
						<div class="a-cards">
							<ul>
								<li><a href="#"><img src="images/c1.png" alt="" /></a></li>
								<li><a href="#"><img src="images/c2.png" alt="" /></a></li>
								<li><a href="#"><img src="images/c3.png" alt="" /></a></li>
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
						<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
							<input type="hidden" name="cmd" value="_s-xclick">
							<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
							">
							<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
							<img alt="" border="0" src="https://www.paypalobjects.com/it_IT/i/scr/pixel.gif" width="1" height="1">
						</form>
						<p> Copyrights © 2018 Flydown - All rights reserved </p>
					</div>
				</div>
			</div>
		</div>
	<script defer src="js/jquery.flexslider.js"></script>
	<script src="js/easyResponsiveTabs.js" type="text/javascript"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/script.js"></script>
</body>
</html>