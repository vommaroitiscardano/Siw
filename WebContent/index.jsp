<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

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

<!-- //Custom Theme files -->
<link href="css/bootstrap.css" type="text/css" rel="stylesheet" media="all">
<link href="css/style.css" type="text/css" rel="stylesheet" media="all">
<link rel="stylesheet" href="css/flexslider.css" type="text/css" media="screen" />
<link type="text/css" rel="stylesheet" href="css/JFFormStyle-1.css" />
<link href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet">
<link rel="icon" href="images/favicon.ico">
<!-- js -->
<script src="js/jquery.min.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/modernizr.custom.js"></script>
<script src="js/menu_jquery.js"></script>
<script src="js/jquery.autocomplete.min.js"></script>
<script src="js/flightAutocomplete.js"></script>
<script src="js/animations.js"></script>

<script src="js/googleLogin.js"></script>
<script src="js/fbLogin.js"></script>

<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
<script src="https://apis.google.com/js/api.js"></script>
<script src='http://connect.facebook.net/en_US/all.js'></script>

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
												<input type="hidden" value="index.jsp" name="page">
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
														<div class="form-group row justify-content-center" role="button" onclick="getCurrPage('index.jsp')">
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
								<li class="list_content p_list" role="button">
									<a class="profile_link_style" href="profile.jsp"><span>Profile</span></a>
								</li>
								<li class="list_content l_list" role="button">
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
	<!-- banner -->
	<div class="banner banner_util">
		<!-- container -->
		<div class="container">
			<div class="col-md-4 banner-left">
				<section class="slider2">
					<div class="flexslider">
						<ul class="slides">
							<li>
								<div class="slider-info">
									<img src="images/1.jpg" alt="">
								</div>
							</li>
							<li>
								<div class="slider-info">
									<img src="images/2.jpg" alt="">
								</div>
							</li>
							<li>
								<div class="slider-info">
									<img src="images/3.jpg" alt="">
								</div>
							</li>
							<li>
								<div class="slider-info">
									<img src="images/4.jpg" alt="">
								</div>
							</li>
							<li>
								<div class="slider-info">
									<img src="images/2.jpg" alt="">
								</div>
							</li>
						</ul>
					</div>
				</section>
				<!--FlexSlider-->
			</div>
			<div class="col-md-8 banner-right">
				<div class="sap_tabs">
					<div class="booking-info">
						<h2>Book Domestic & International Flight Tickets</h2>
					</div>
					<div id="horizontalTab"
						style="display: block; width: 100%; margin: 0px;">
						<ul class="resp-tabs-list">
							<li class="resp-tab-item" aria-controls="tab_item-0" role="tab">
								<span>Return</span>
							</li>
							<li class="resp-tab-item" aria-controls="tab_item-1" role="tab">
								<span>One way</span>
							</li>
						</ul>
						<!---->
						<div class="resp-tabs-container">
							<div class="tab-1 resp-tab-content" aria-labelledby="tab_item-0">
								<div class="facts">
									<div class="booking-form">
										<div class="online_reservation">
											<div class="b_room">
												<div class="booking_room">
													<!-- Flight search container -->
													<div class="twidget-container reservation" id="twidget">
														<div class="clearfix"></div>
														<form id="search_form" method="post" action="checkRoute">
															<ul class="twidget-form-list clearfix">
																<!-- Origin Input -->
																<li class="span1_of_1 twidget-origin">
																	<div class="twidget-input-box">
																		<label for="twidget-origin">Flying from</label>
																		<div class="book_date">
																			<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
																			 <input type="text" id="twidget-origin" placeholder="Type Departure City" class="typeahead1 input-md form-control tt-input" required>
																			 <input type="hidden" name="origin_iata" id="departure">
																			<div class="twidget-pseudo-input">
																				<span class="twidget-pseudo-name" id="dep_name"></span>
																				<input type="hidden" name="dep_name">
																				 <span class="twidget-pseudo-country-name"></span>
																			</div>
																			<div class="twidget-origin-iata"></div>
																			<div class="twidget-auto-fill-wrapper" data-type="avia">
																				<ul></ul>
																			</div>
																		</div>
																	</div>
																</li>
																<!-- Destination Input -->
																<li class="span1_of_1 twidget-destination">
																	<div class="twidget-input-box">
																		<label for="twidget-origin">Flying to</label>
																		<div class="book_date">
																			<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
																			<input class="typeahead1 input-md form-control tt-input" type="text" id="twidget-destination" placeholder="Destination" required>
																			<input type="hidden" name="destination_iata" id="destination">
																			<div class="twidget-pseudo-input">
																				<span class="twidget-pseudo-name" id="arr_name"></span>
																				<input type="hidden" name="arr_name">
																				<span class="twidget-pseudo-country-name"></span>
																			</div>
																			<div class="twidget-destination-iata"></div>
																			<div class="twidget-auto-fill-wrapper"
																				data-type="avia">
																				<ul></ul>
																			</div>
																		</div>
																	</div>
																</li>
															</ul>
															<ul>
																<li class="span1_of_1">
																	<h5>Departure</h5>
																	<div class="book_date">
																		<span class="glyphicon glyphicon-calendar"
																			aria-hidden="true"></span> <input type="text"
																			id="start-date" name="start-date"
																			placeholder="Departure" required>

																	</div>
																</li>
																<li class="span1_of_1 ret_date">
																	<h5>Return</h5>
																	<div class="book_date">
																		<span class="glyphicon glyphicon-calendar"
																			aria-hidden="true"></span> <input type="text"
																			id="end-date" name="end-date" placeholder="Return"
																			required>
																	</div>
																</li>
																<li class="span1_of_1 left adult">
																	<h5>Adults (18+)</h5>
																	<div class="section_room">
																		<select onchange="$('#ad-hidden-val').val($(this).val());" class="frm-field required">
																			<option selected="selected" value="1">1</option>
																			<option value="2">2</option>
																			<option value="3">3</option>
																			<option value="4">4</option>
																			<option value="5">5</option>
																			<option value="6">6</option>
																		</select>
																	</div>
																	<input id="ad-hidden-val" type="hidden" name="adults" value="1">
																</li>
																<li class="span1_of_1 left children">
																	<h5>Children (0-17)</h5>
																	<div class="section_room">
																		<select onchange="$('#ch-hidden-val').val($(this).val());" class="frm-field required">
																			<option selected="selected" value="0">0</option>
																			<option value="1">1</option>
																			<option value="2">2</option>
																			<option value="3">3</option>
																			<option value="4">4</option>
																			<option value="5">5</option>
																			<option value="6">6</option>
																		</select>
																	</div>
																	<input id="ch-hidden-val" type="hidden" name="children" value="0">
																</li>
																<li class="span1_of_1 economy">
																	<h5>Class</h5>
																	<div class="section_room">
																		<select onchange="" class="frm-field required">
																			<option selected="selected" value="economy">Economy</option>
																			<option value="business">Business</option>
																		</select>
																		<input type="hidden" name="class" value="economy">
																	</div>
																</li>
																<li class="span1_of_3">
																	<div class="date_btn">
																		<input type="submit" value="Search" onclick="waitingAnimation()"> <!-- id="submit"  /> -->

																	</div>
																</li>
															</ul>
														</form>
													</div>
													<script>
														$('#twidget')
																.twidget(
																		{
																			locale : 'en',
																			default_origin : 'SUF',
																			default_destination : 'PSA'
																		});
													</script>
												</div>
											</div>
										</div>
										<!---->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<!-- //container -->
	</div>
	<!-- //banner -->
	<div class="move-text">
		<div class="marquee">
			Book with us your next flight! You are going to save more than 50%.
			Sign up now <a href="user_signup">HERE</a>
		</div>
		<script type="text/javascript" src="js/jquery.marquee.min.js"></script>
		<script>
			$('.marquee').marquee({
				pauseOnHover : true
			});
			//@ sourceURL=pen.js
		</script>
	</div>
	<!-- banner-bottom -->
	<div class="banner-bottom">
		<!-- container -->
		<div class="container">
			<div class="banner-bottom-grids">
				<div class="col-md-4 banner-bottom-grid">
					<div class="banner-bottom-middle">
						<a href="products.html"> <img src="images/a2.jpg" alt="" />
							<div class="destinations-grid-info tours">
								<h5>Book your next Malaysia holiday!</h5>
								<p>Integer eget aliquam nibh. Donec blandit volutpat libero
									id lacinia</p>
								<p class="b-period">Book Period: Now - 7 September 2015 |
									Travel Period: Now - 31 October 2015</p>
							</div>
						</a>
					</div>
				</div>
				<div class="col-md-4 banner-bottom-grid">
					<div class="banner-bottom-right">
						<a href="products.html"> <img src="images/a3.jpg" alt="" />
							<div class="destinations-grid-info tours">
								<h5>New Hotel Experiences at Your Favourite Destinations</h5>
								<p>Integer eget aliquam nibh. Donec blandit volutpat libero
									id lacinia</p>
								<p class="b-period">Book Period: Now - 7 September 2015 |
									Travel Period: Now - 31 October 2015</p>
							</div>
						</a>
					</div>
				</div>
				<div class="col-md-4 banner-bottom-grid">
					<div class="news-grids">
						<div class="news-grids-bottom">
							<!-- date -->
							<div id="design" class="date">
								<div id="cycler">
									<div class="date-text">
										<a href="single.html">July 08,2015</a>
										<p>Nullam non turpis sit amet metus tristique egestas et
											et orci.</p>
									</div>
									<div class="date-text">
										<a href="#">February 15,2015</a>
										<p>Duis venenatis ac ipsum vel ultricies in placerat quam</p>
									</div>
									<div class="date-text">
										<a href="#l">January 15,2015</a>
										<p>Pellentesque ullamcorper fringilla ipsum, ornare
											dapibus velit volutpat sit amet.</p>
									</div>
									<div class="date-text">
										<a href="#">September 24,2014</a>
										<p>In lobortis ipsum mi, ac imperdiet elit pellentesque
											at.</p>
									</div>
								</div>
								<script>
									function cycle($item, $cycler) {
										setTimeout(cycle, 2000, $item.next(),
												$cycler);

										$item.slideUp(1000, function() {
											$item.appendTo($cycler).show();
										});

									}
									cycle($('#cycler div:first'), $('#cycler'));
								</script>
							</div>
							<!-- //date -->
						</div>
					</div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
		<!-- //container -->
	</div>
	<!-- //banner-bottom -->
	<!-- popular-grids -->
	<div class="popular-grids">
		<!-- container -->
		<div class="container">
			<div class="popular-info">
				<h3>Popular Places</h3>
			</div>
			<!-- slider -->
			<div class="slider">
				<div class="arrival-grids">
					<ul id="flexiselDemo1">
						<li><a href=""><img src="images/a3.jpg"
								alt="" /> </a></li>
						<li><a href=""><img src="images/a2.jpg"
								alt="" /> </a></li>
						<li><a href=""><img src="images/a4.jpg"
								alt="" /> </a></li>
						<li><a href=""><img src="images/a1.jpg"
								alt="" /> </a></li>
					</ul>
					<script type="text/javascript">
						$(window).load(function() {
							$("#flexiselDemo1").flexisel({
								visibleItems : 4,
								animationSpeed : 1000,
								autoPlay : true,
								autoPlaySpeed : 3000,
								pauseOnHover : true,
								enableResponsiveBreakpoints : true,
								responsiveBreakpoints : {
									portrait : {
										changePoint : 480,
										visibleItems : 1
									},
									landscape : {
										changePoint : 640,
										visibleItems : 2
									},
									tablet : {
										changePoint : 768,
										visibleItems : 3
									}
								}
							});
						});
					</script>
					<script type="text/javascript" src="js/jquery.flexisel.js"></script>
				</div>
			</div>
			<!-- //slider -->
		</div>
		<!-- //container -->
	</div>
	<div class="footer"></div>
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
								<li><a href="#"><img src="images/app2.png" alt="" /></a></li>
								
							</ul>
							
						</div>
					</div>
					<div class="col-md-4 footer-bottom-left">
						<h4>We Accept</h4>
						<div class="a-cards">
							<ul>
								<li><a href=""><img src="images/c1.png" alt="" /></a></li>
								<li><a href=""><img src="images/c2.png" alt="" /></a></li>
								<li><a href=""><img src="images/c3.png" alt="" /></a></li>
							</ul>
						</div>
					</div>
					<div class="col-md-4 footer-bottom-left">
						<h4>Follow Us</h4>
						<div class="social">
							<ul>
								<li><a href="" class="facebook"> </a></li>
								<li><a href="" class="facebook twitter"> </a></li>
								<li><a href="" class="facebook chrome"> </a></li>
								<li><a href="" class="facebook dribbble"> </a></li>
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
	<script src="js/script.js"></script>
	<script>
		$(function() {
			SyntaxHighlighter.all();
		});
		$(window).load(function() {
			$('.flexslider').flexslider({
				animation : "slide",
				start : function(slider) {
					$('body').removeClass('loading');
				}
			});
		});
	</script>

</body>
</html>