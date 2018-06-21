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

<link href="css/bootstrap.css" type="text/css" rel="stylesheet" media="all">
<link href="css/style.css" type="text/css" rel="stylesheet" media="all">
<link href="css/flexslider.css" type="text/css" rel="stylesheet" media="screen" />
<link href="css/JFFormStyle-1.css" type="text/css" rel="stylesheet" />
<link rel="icon" href="images/favicon.ico">
<!-- js -->
<script src="js/jquery.min.js"></script>
<script src="js/modernizr.custom.js"></script>
<script src="js/menu_jquery.js"></script>
<script src="js/profileFilter.js"></script>

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
		<div class="profile_info_container">
			<div class="profile_info_content">
				<div class="dialog" role="button" onclick="$('.profile_info_container').hide(); $('.profile_info_content_list>li').remove();">
				  <img src="images/close.png" class="close-thik">
				</div>
				<div class="profile_info_content_list">
					<ul class="list_ticket_user">
					</ul>
				
				</div>
				
			</div>
		</div>
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
						<li><a href="blog.jsp">Blog</a></li>
						<li><a href="about.jsp">About</a></li>
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
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<!--//header-->
	<!-- banner-bottom -->
	<div class="banner-bottom">
		<!--  container -->
		<div class="container">
			<div class="target">
				<div class="row">
					<div class="profile_user_ico">
						<span class="welcome_profile">Welcome ${nome}</span>
						<a href="" class="pull-right"><img title="profile image"
							class="img-circle img-responsive"
							src="images/user_profile_ico.png" width=45px;></a>

					</div>
				</div>
				<div class="profile_content">
					<div class="col-sm-3">
						<!--left col-->
						<ul class="list-group">
							<li class="list-group-item text-muted f_profile"><span class="list-group-profile">Profile</span></li>
								<li class="list-group-item text-right" role="button" onclick="">
								<span class="pull-left"><strong class="">Edit</strong></span><img src="images/arrow-s.png"></li>
						</ul>
						
						<ul class="list-group">
							<li class="list-group-item text-muted"><span class="list-group-activity">Activity</span><i class="fa fa-dashboard fa-1x"></i></li>							
							<li class="list-group-item text-right" role="button" role="button" onclick="retrieveFlights();">
								<span class="pull-left"><strong class="">Tickets</strong></span><img src="images/arrow-s.png"></li>
							<li class="list-group-item text-right" role="button" onclick="">
								<span class="pull-left"><strong class="">Posts</strong></span><img src="images/arrow-s.png"></li>
							<li class="list-group-item text-right" role="button" onclick="">
								<span class="pull-left"><strong class="">Comments</strong></span><img src="images/arrow-s.png"></li>
						</ul>
					</div>
					<!--/col-3-->
					<div class="col-sm-9" style="" contenteditable="false">
						<div class="panel panel-default">
							<div class="panel-heading">${nome}'s Bio</div>
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
	<script src="js/script.js" type="text/javascript"></script>
</body>
</html>