<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html >
<html>
<head>
<title>Flydown - small price, big savings</title>
<!-- Custom Theme files -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Govihar Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, 
	Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />

<link href="../css/bootstrap.css" type="text/css" rel="stylesheet" media="all">
<link href="../css/style.css" type="text/css" rel="stylesheet" media="all">
<link href="../css/flexslider.css" type="text/css" rel="stylesheet" media="screen" />
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
		<div class="container">
			<div class="container target">
				<div class="row">
					<div class="col-sm-10 userName_info">
						<h1 class="">User Name</h1>

						<button type="button" class="btn btn-success">Book me!</button>
						<button type="button" class="btn btn-info">Send me a
							message</button>
						<br>
					</div>
					<div class="col-sm-2">
						<a href="/users" class="pull-right"><img title="profile image"
							class="img-circle img-responsive"
							src="http://www.rlsandbox.com/img/profile.jpg"></a>

					</div>
				</div>
				<div class="row">
					<div class="col-sm-3">
						<!--left col-->
						<ul class="list-group">
							<li class="list-group-item text-muted" contenteditable="false">Profile</li>
							<li class="list-group-item text-right"><span
								class="pull-left"><strong class="">Joined</strong></span>
								2.13.2014</li>
							<li class="list-group-item text-right"><span
								class="pull-left"><strong class="">Last seen</strong></span>
								Yesterday</li>
							<li class="list-group-item text-right"><span
								class="pull-left"><strong class="">Real name</strong></span>
								Joseph Doe</li>
							<li class="list-group-item text-right"><span
								class="pull-left"><strong class="">Role: </strong></span> Pet
								Sitter</li>
						</ul>
						<div class="panel panel-default">
							<div class="panel-heading">Insured / Bonded?</div>
							<div class="panel-body">
								<i style="color: green" class="fa fa-check-square"></i> Yes, I
								am insured and bonded.

							</div>
						</div>
						<div class="panel panel-default">
							<div class="panel-heading">
								Website <i class="fa fa-link fa-1x"></i>

							</div>
							<div class="panel-body">
								<a href="http://bootply.com" class="">bootply.com</a>

							</div>
						</div>

						<ul class="list-group">
							<li class="list-group-item text-muted">Activity <i
								class="fa fa-dashboard fa-1x"></i>

							</li>
							<li class="list-group-item text-right"><span
								class="pull-left"><strong class="">Shares</strong></span> 125</li>
							<li class="list-group-item text-right"><span
								class="pull-left"><strong class="">Likes</strong></span> 13</li>
							<li class="list-group-item text-right"><span
								class="pull-left"><strong class="">Posts</strong></span> 37</li>
							<li class="list-group-item text-right"><span
								class="pull-left"><strong class="">Followers</strong></span> 78</li>
						</ul>
						<div class="panel panel-default">
							<div class="panel-heading">Social Media</div>
							<div class="panel-body">
								<i class="fa fa-facebook fa-2x"></i> <i
									class="fa fa-github fa-2x"></i> <i class="fa fa-twitter fa-2x"></i>
								<i class="fa fa-pinterest fa-2x"></i> <i
									class="fa fa-google-plus fa-2x"></i>

							</div>
						</div>
					</div>
					<!--/col-3-->
					<div class="col-sm-9" style="" contenteditable="false">
						<div class="panel panel-default">
							<div class="panel-heading">Starfox221's Bio</div>
							<div class="panel-body">A long description about me.</div>
						</div>
						<div class="panel panel-default target">
							<div class="panel-heading" contenteditable="false">Pets I
								Own</div>
							<div class="panel-body">
								<div class="row">
									<div class="col-md-4">
										<div class="thumbnail">
											<div class="caption">
												<h3>Rover</h3>
												<p>Cocker Spaniel who loves treats.</p>
												<p></p>
											</div>
										</div>
									</div>
									<div class="col-md-4">
										<div class="thumbnail">
											<div class="caption">
												<h3>Marmaduke</h3>
												<p>Is just another friendly dog.</p>
												<p></p>
											</div>
										</div>
									</div>
									<div class="col-md-4">
										<div class="thumbnail">
											<div class="caption">
												<h3>Rocky</h3>
												<p>Loves catnip and naps. Not fond of children.</p>
												<p></p>
											</div>
										</div>

									</div>

								</div>

							</div>

						</div>
						<div class="panel panel-default">
							<div class="panel-heading">Starfox221's Bio</div>
							<div class="panel-body">A long description about me.</div>
						</div>
					</div>
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