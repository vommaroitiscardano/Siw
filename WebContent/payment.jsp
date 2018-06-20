<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html >
<html>
<head>
<title>Flydown - small price, big savings</title>
<!-- Custom Theme files -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords"
	content="Govihar Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, 
	Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
<meta name="google-signin-client_id" content="36990781665-k6rlilkggjrmckp38t0545pmdfjt6i17.apps.googleusercontent.com">
<link href="css/bootstrap.css" type="text/css" rel="stylesheet" media="all">
<link href="css/style.css" type="text/css" rel="stylesheet" media="all">
<link href="css/flexslider.css" type="text/css" rel="stylesheet" media="screen" />
<link href="css/JFFormStyle-1.css" type="text/css" rel="stylesheet" />
<link rel="icon" href="images/favicon.ico">
<!-- js -->
<script src="js/jquery.min.js"></script>
<script src="js/modernizr.custom.js"></script>
<script src="js/menu_jquery.js"></script>
<script src="js/cartHandler.js"></script>
<script src="js/payment.js"></script>
<script src="js/easyResponsiveTabs.js" type="text/javascript"></script>

<script src="js/googleLogin.js"></script>
<script src="js/fbLogin.js"></script>

<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
<script src="https://apis.google.com/js/api.js"></script>
<script src='http://connect.facebook.net/en_US/all.js'></script>


<script type="application/x-javascript">
	
	
	addEventListener("load", function() {
		setTimeout(hideURLbar, 0);
	}, false);
	function hideURLbar(){
		window.scrollTo(0,1); 
	}


</script>

<script type="text/javascript">
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
												<input type="hidden" value="payment.jsp" name="page">
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
															scope="public_profile,email" onlogin="checkLoginState('payment.jsp');"
															add target="_blank">
														</div>
													</div>
													<div>
														<div class="form-group row justify-content-center" role="button" onclick="getCurrPage('payment.jsp')">
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
										<a onclick="logoutFacebook()" href=""><span>Logout</span></a>
									</c:if>
									<c:if test="${tipo =='google'}">
										<a onclick="logoutGoogle()" href=""><span>Logout</span></a>
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
		<!--  container -->
		<div class="container">
			
			<c:if test="${loggato == null}">
				<div class="login_container">
						<div class="login_content">
							<form class="login_form_content" id="" action="LoginServlet" method="post">
								<div class="">
									<div class="">
										<fieldset>
											<fieldset class="login_email">
												<label for="email">Email Address</label>
												<input type="text" name="userid" id="userid">
											</fieldset>
											<fieldset class="login_password">
												<label for="password">Password</label> 
												<input type="password" name="password" id="password">
											</fieldset>
											<div class="login_form_submit">
												<input  type="submit" id="login" value="Sign in">
												<input type="hidden" value="payment.jsp" name="page">
											</div>
										</fieldset>
										<div class="or-grid">
											<p>OR</p>
										</div>
										<div class="social-sits">
												<div class ="socialBotton">
													<div class = "fbButton">
														<div class="fb-login-button" add target="_blank"
															data-max-rows="1" data-size="medium"
															data-button-type="continue_with" data-show-faces="false"
															data-auto-logout-link="false" data-use-continue-as="false"
															scope="public_profile,email" onlogin="checkLoginState('payment.jsp');"
															add target="_blank">
														</div>
													</div>
													<div>
														<div class="form-group row justify-content-center" role="button" onclick="getCurrPage('payment.jsp')">
															<div class="g-signin2" data-width="200" data-height="27" data-onsuccess="onSignIn" data-theme="dark">
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
			</c:if>
			<c:if test="${loggato != null}">
				<div class="c_sap_tabs">
					<div>
						<div class="pay-tabs">
							  <ul class="c_resp-tabs-list">
								  <li class="c_resp-tab-item b_tab" aria-controls="tab_item-3" role="tab" onclick="paymentTab(this);">
								  <span class="pic_span"><label class="pic2"></label>Debit Card</span></li>
								  <li class="c_resp-tab-item p_tab" aria-controls="tab_item-2" role="tab" onclick="paymentTab(this);">
								  <span class="pic_span"><label class="pic4"></label>PayPal</span></li> 
							  </ul>	
						</div>
						<div class="c_resp-tabs-container">
							<div class="c_tab-1 c_resp-tab-content paypal_tab" aria-labelledby="tab_item-2">
								<div class="payment-info">
									<h3>PayPal</h3>
									<div class="login-tab">
										<div class="user-login">
											<h2>Login</h2>
											<form>
												<input type="text" value="name@email.com" required="">
												<input type="password" value="PASSWORD" required="">
													<div class="user-grids">
														<div class="user-right">
															<input type="submit" value="LOGIN">
														</div>
														<div class="clear"></div>
													</div>
													<div class="remember_card_paypal">
														<label for="checkbox"><input type="checkbox" name="rememberMe" > <i>Remember me</i></label>
													</div>
											</form>
										</div>
									</div>
								</div>
							</div>
							<div class="c_tab-1 c_resp-tab-content bank_tab" aria-labelledby="tab_item-3">	
								<div class="payment-info">
									<h3 class="pay-title">Dedit Card Info</h3>
									<form method="post" action="pay">
										<div class="tab-for">				
											<h5>NAME ON CARD</h5>
												<input id="cardName" type="text" value="" name="card_name" required="">
											<h5>CARD NUMBER</h5>
												<div>													
													<input id="cardNumber" class="pay-logo" type="text" value="" name="card_number" placeholder="0000-0000-0000-0000"  required="" onfocus="$('.autocomplete_card').show();">
												</div>
										</div>
										<div class="autocomplete_card">
											<div class="card_container">
												<ul class="card_list">
												</ul>
											</div>
										</div>	
										<div class="transaction">
											<div class="tab-form-left user-form">
												<h5>EXPIRATION</h5>
													<ul>
														<li>
															<input id="cardMonth" type="number" class="text_box" type="text" name="month_expiration" value="6" min="1" />	
														</li>
														<li>
															<input id="cardYear" type="number" class="text_box" type="text" name="year_expiration" value="2020" min="1" />	
														</li>
														
													</ul>
											</div>
											<div class="tab-form-right user-form-rt">
												<h5>CVV NUMBER</h5>													
												<input id="cardCvv" type="text" value="" name="card_cvv" placeholder="xxx" required="">
											</div>
											<div class="clear"></div>
										</div>
										<input type="submit" value="SUBMIT">
										<div class="remember_card">
											<label for="checkbox"><input type="checkbox" name="checkbox" value="checked" checked> <i>Remember me</i></label>
										</div>
									</form>
								</div>	
							</div>
						</div>	
					</div>
				</div>
			</c:if>
		</div>
		<!-- //container -->
	</div>
	<div class="footer"></div>
	<!-- //banner-bottom -->
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
						<div class="paypalcopiright">								
							<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
								<input type="hidden" name="cmd" value="_s-xclick">
								<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">
								<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
								<img alt="" border="0" src="https://www.paypalobjects.com/it_IT/i/scr/pixel.gif" width="1" height="1">
							</form>
						<p>
							Copyrights © 2018 Flydown - All rights reserved
						</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	<script defer src="js/jquery.flexslider.js"></script>
	<script src="js/easyResponsiveTabs.js" type="text/javascript"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/script.js" type="text/javascript"></script>
</body>
</html>