<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
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

<link href="../css/bootstrap.css" type="text/css" rel="stylesheet"
	media="all">
<link href="../css/style.css" type="text/css" rel="stylesheet"
	media="all">
<link href="../css/flexslider.css" type="text/css" rel="stylesheet"
	media="screen" />
<link href="../css/JFFormStyle-1.css" type="text/css" rel="stylesheet" />
<link rel="icon" href="../images/favicon.ico">
<!-- js -->
<script src="../js/jquery.min.js"></script>
<script src="../js/modernizr.custom.js"></script>
<script src="../js/menu_jquery.js"></script>
<script src="../js/flightInfoSearch.js"></script>

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
						<a href="../index.jsp"><span>Fly</span>down</a> - small price, big
						savings
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
					<span class="menu"><img src="../images/menu.png" alt="" /></span>
					<ul class="nav1">
						<li><a href="../index.jsp">Flights</a></li>
						<li><a href="blog.html">Blog</a></li>
						<li><a href="about.html">About</a></li>
					</ul>
					<div class="clearfix"></div>
					<!-- script-for-menu -->
					<script>
						$("span.menu").click(function() {
							$("ul.nav1").slideToggle(300, function() {
								// Animation complete.
							});
						});
					</script>
					<!-- /script-for-menu -->
				</div>
				<div class="dropdown-grids-cart">
					<div id="flightCart">
						<div id="cartButton" role="button">
							<img id="cart_ico" src="../images/flight-cart-ico1.png">
						</div>
						<div id="cartBox">
							<form id="cartForm">
								<div class="cart-grids">
									<div class="cart-grid-left">
										<div class="default_body_cart" style="display: none">
											<div class="body_cart_info_nf">
												<div class="no-flight-ico">
													<img alt="" src="../images/no-flight-ico.png">
												</div>
												<h4 class="no-flights-title">Please pick your flight
													out</h4>
												<span class="no-flights-description">You haven't
													picked a flight yet.</span>
											</div>

										</div>
										<div class="flight_body_cart">
											<!-- contenitore più esterno -->
											<div class="flight_container_edge">
												<div class="basket-header">
													<span>Price Details</span>
													<div role="button" onclick="">
														<span class="reset_cart_img"><img></span>
													</div>
												</div>
												<div class="flight_list_container">
													<div class="flight_heading">
														<span>Flight</span>
													</div>
													<ul class="breakdown_list">
													</ul>
													<div class="sub_item">
														<div class="adults_section">
															<span class="adults_num">1 </span>
															<span>x Adults</span>
														</div>
														<div class="children_section">
															<span class="children_num">0 </span>
															<span>x Children</span>														
														</div>
														<strong class="item_price">£ 125</strong>
													</div>
												</div>
												<div class="footer_cart">
													<div class="footer_content">
														<span class="subtotal_header">Total <span class="tot_price"></span></span></span>
														<div class="submit_cart" role="button" onclick="">
															Continue
														</div>
													</div>												
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="dropdown-grids">
					<div id="loginContainer">
						<a href="#" id="loginButton"><span>Login</span></a>
						<div id="loginBox">
							<form id="loginForm">
								<div class="login-grids">
									<div class="login-grid-left">
										<fieldset id="body">
											<fieldset>
												<label for="email">Email Address</label> <input type="text"
													name="email" id="email">
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
											<div class="facebook-button">
												<a href="#">Connect with Facebook</a>
											</div>
											<div class="chrome-button">
												<a href="#">Connect with Google</a>
											</div>
											<div class="button-bottom">
												<p>
													New account? <a href="signup.html">Signup</a>
												</p>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<!--//header-->
	<!-- banner-bottom -->
	<div class="banner-bottom">
		<!--  container -->
		<div class="container"></div>
		<!-- //container -->
	</div>
	<!-- //banner-bottom -->
	<!-- footer -->
	<div class="footer"></div>
	<!-- //footer -->
	<div class="footer-bottom-grids">
		<!-- container -->
		<div class="container">
			<div class="footer-bottom-top-grids">
				<div class="col-md-4 footer-bottom-left">
					<h4>We Accept</h4>
					<div class="a-cards">
						<ul>
							<li><a href="#"><img src="../images/c1.png" alt="" /></a></li>
							<li><a href="#"><img src="../images/c2.png" alt="" /></a></li>
							<li><a href="#"><img src="../images/c3.png" alt="" /></a></li>
						</ul>
					</div>
				</div>
				<div class="col-md-4 footer-bottom-left footer_bottom">
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
					<p>Copyrights © 2018.</p>
				</div>
			</div>
		</div>
	</div>
	<script defer src="../js/jquery.flexslider.js"></script>
	<script src="../js/easyResponsiveTabs.js" type="text/javascript"></script>
	<script src="../js/jquery-ui.js"></script>
	<script src="../js/script.js" type="text/javascript"></script>
</body>
</html>