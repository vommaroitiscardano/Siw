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
<script src="js/flightHandler.js"></script>
<script src="js/flightInfoSearch.js"></script>
<script src="js/leftNavbar.js"></script>

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

<!-- Animazione prima di mostrare i risultati del volo -->
<script type="text/javascript">
	$(function() {
		var stickyHeader = $('.banner-bottom').offset().top + 35;
	    $(window).scroll(function(){
	   	 	 var element =  $('.content-layout-view__column-left');
	         if( $(window).scrollTop() >= stickyHeader ) {
	           element.css({position: 'fixed', top: '0px'});
	         }
	         else {
	        	 element.css({position: 'relative', top: '0px'});
	         }

	  	});
	});
</script>


<!-- //js -->

</head>
<body>
	<!--header-->
	<div class="header">
		<div class="container">
			<div class="header-grids">
				<div class="logo">
					<h1>
						<a href="index.jsp"><span>Fly</span>down</a> - small price, big
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
					<span class="menu"><img src="images/menu.png" alt="" /></span>
					<ul class="nav1">
						<li><a href="index.jsp">Flights</a></li>
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
							<img id="cart_ico" src="images/flight-cart-ico1.png">
						</div>
						<div id="cartBox">
							<form id="cartForm">
								<div class="cart-grids">
									<div class="cart-grid-left">
										<div class="default_body_cart">
											<div class="body_cart_info_nf">
												<div class="no-flight-ico">
													<img  alt="" src="images/no-flight-ico.png" width="90px">
												</div>
												<h4 class="no-flights-title">Please pick your flight out</h4>
												<span class="no-flights-description">You haven't picked a flight yet.</span>
											</div>
										</div>
										<div class="flight_body_cart">
											<!-- contenitore più esterno -->
											<div class="flight_container_edge">
												<div class="basket-header">
													<span>Price Details</span>
													<div role="button" onclick="emptyCart();">
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
															<span class="adults_num"> </span>
															<span>x Adults</span>
														</div>
														<div class="children_section">
															<span class="children_num"> </span>
															<span>x Children</span>														
														</div>
														<span class="item_price_sym">&#163;</span>
														<strong class="item_price"></strong>
													</div>
												</div>
												<div class="footer_cart">
													<div class="footer_content">
														<span class="subtotal_header">
															Total 
															<span class="tot_price_syb">  &#163; </span>
															<span class="tot_price"></span>
														</span>
														<div class="submit_cart" role="button">
															<a href="pay">Continue</a>
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
												<input type="hidden" value="searchFlight.jsp" name="page">
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
															scope="public_profile,email" onlogin="checkLoginState('searchFlight.jsp');"
															add target="_blank">
														</div>
													</div>
													<div>
														<div class="form-group row justify-content-center" role="button" onclick="getCurrPage('searchFlight.jsp')">
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
									<span>Profile</span>
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
		<div class="content-layout-view__column-left">
			<div class="listing-filters-container">
				<div class="listing-filters-content-container">
					<div class="filters-main-collection-view">
						<div class="panel-group filter-group" role="tablist">
							<div
								class="panel panel--no-border filters-section filters-section--stops__view76">
								<div class="panel-heading" role="tab">
									<h4 class="panel-title panel_title_plus">
										<a role="button" class="filters-section__accordion-btn in collapsed"> Stops </a>
									</h4>
								</div>
								<div class="panel-collapse collapse in" role="tabpanel">
									<div class="panel-body">
										<div class="stops-filter-container--way0">
											<div data-e2e="stops-filter"
												class="filter-view checkboxlist-filter-view stops-filter-view">
												<div class="filter-view__header row--no-margin">
													<div class="filter-view__title">
														<div class="filter-view__info">
															<div class="filter-view__info-way">${origin_iata} - ${destination_iata}</div>
														</div>
													</div>
												</div>

												<ul class="filters-group filters-group--condensed" aria-multiselectable="true">
													<li>
														<div class="option">
															<div class="checkbox">
																<label data-e2e="brgui-list-option" role="checkbox">
																	<input type="checkbox" class="checkStops c_non_stop" onchange="handleCheckboxEvents('')" name="stops-c8059" value="direct">
																		<span class="desc">Non-stop</span>
																		<span class="check"></span>
																</label>
															</div>
														</div>
													</li>
													<li>
														<div class="option">
															<div class="checkbox">
																<label data-e2e="brgui-list-option" role="checkbox">
																	<input type="checkbox" class="checkStops c_stop" onchange="handleCheckboxEvents('')" name="stops-c8059" value="oneStop">
																		<span class="desc">1 stop</span>
																	<span class="check"></span>
																</label>
															</div>
														</div>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								class="panel panel--no-border filters-section filters-section--timerange__view76">
								<div class="panel-heading" role="tab">
									<h4 class="panel-title panel_title_plus">
										<a role="button" class="filters-section__accordion-btn in collapsed"> Departure times
											<span class="filters-section__accordion-arrow icon-arrow_up"></span>
										</a>
									</h4>
								</div>
								<div class="filters-section--timerange__view76"
									class="panel-collapse collapse in" role="tabpanel">
									<div class="panel-body">
										<div class="departure-timerange-filter-container--way0">
											<div data-e2e="timerange-filter"
												class="filter-view checkboxlist-filter-view timerange-filter-view">
												<div class="filter-view__header row--no-margin">
													<div class="filter-view__title">
														<div class="filter-view__info">
															<div class="filter-view__info-way">${origin_iata} - ${destination_iata}</div>
														</div>
													</div>
												</div>
												<ul class="filters-group filters-group--condensed"
													aria-multiselectable="true">
													<li>
														<div class="option">
															<div class="checkbox">
																<label data-e2e="brgui-list-option" role="checkbox">
																	<input type="checkbox"
																	name="morning"
																	class="checkDepTime morning"
																	onchange="handleCheckboxEvents('')"
																	value="{&quot;from&quot;:&quot;06.00&quot;,&quot;to&quot;:&quot;11.59&quot;}">
																		<span class="desc">Morning</span> <span class="info">04:00-11:59</span>
																		<span class="check"></span>
																</label>
															</div>
														</div>
													</li>
													<li>
														<div class="option">
															<div class="checkbox">
																<label data-e2e="brgui-list-option" role="checkbox">
																	<input type="checkbox"
																	name="afternoon"
																	class="checkDepTime afternoon"
																	onchange="handleCheckboxEvents('')"
																	value="{&quot;from&quot;:&quot;12.00&quot;,&quot;to&quot;:&quot;17.59&quot;}">
																		<span class="desc">Afternoon</span> <span
																			class="info">12:00-17:59</span>
																		<span class="check"></span>
																</label>
															</div>
														</div>
													</li>
													<li>
														<div class="option">
															<div class="checkbox">
																<label data-e2e="brgui-list-option" role="checkbox">
																	<input type="checkbox"
																	name="night"
																	class="checkDepTime night"
																	onchange="handleCheckboxEvents('')"
																	value="{&quot;from&quot;:&quot;18.00&quot;,&quot;to&quot;:&quot;23.59&quot;}">
																		<span class="desc">Night</span> <span class="info">18:00-23:59</span>
																		<span class="check"></span>
																</label>
															</div>
														</div>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>	
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- flights container -->
		<div class="container flight_container">
			<!-- top filter bar -->
			<div class="content-layout-view__column-right">
				<div class="listing-sorting-container">
					<div class="sorting-tabs-view">
						<div class="sorting-tabs-view__content">
							<ul class="nav_s" role="tablist">
								<li class="sorting-tabs-view__tab" role="tab">
									<div class="sorting-tabs-view__label">Cheapest</div>
									<div class="sorting-tabs-view__amount cheap_price"></div>
									<div class="spin_class_amount">
										<div class="spin_loader"> </div>
									</div>
								</li>
								<li class="sorting-tabs-view__tab" role="tab">
									<div class="sorting-tabs-view__label">Earliest</div>
									<div class="sorting-tabs-view__amount best_price"></div>
									<div class="spin_class_amount">
										<div class="spin_loader"> </div>
									</div>
								</li>
								<li class="sorting-tabs-view__tab" role="tab">
									<div class="sorting-tabs-view__label ">Fastest</div>
									<div class="sorting-tabs-view__amount fast_price"></div>
									<div class="spin_class_amount">
										<div class="spin_loader"> </div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
  			<div class="no_flights_found">
  				<section id="day-section" class="day-content fss-no-touch state-results state-loading-completed" >
  					<div class="day-cols clearfix">
  						<div class="day-main-content">
  							<div class="fss-no-results">
  								<div class="day-no-results-cushion">
  									<div class="day-no-results-topline filter-pointer">
  										Sorry, there aren't any flights that match your 
  										<strong>filters</strong>.
  									</div>
  									<div class="day-too-many-filters filter-pointer">
  										Change your filter settings to see results.
  									</div>
  								</div>
  							</div>
  						</div>
  					</div>
  				</section>
  			</div>
			<div class="spinner">
				<div class="spin_class_i">
					<span class="spinner_info">Searching... </span>
				</div>
				<div class="spin_class_l">
					<div class="spin_loader"> </div>
				</div>
			</div>
		</div>
		
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
							<li><a href="#"><img src="images/c1.png" alt="" /></a></li>
							<li><a href="#"><img src="images/c2.png" alt="" /></a></li>
							<li><a href="#"><img src="images/c3.png" alt="" /></a></li>
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
	<script defer src="js/jquery.flexslider.js"></script>
	<script src="js/easyResponsiveTabs.js" type="text/javascript"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/script.js" type="text/javascript"></script>
</body>
</html>