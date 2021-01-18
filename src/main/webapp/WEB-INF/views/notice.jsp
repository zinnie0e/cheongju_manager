<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<link rel="stylesheet" href="./resources/css/main.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/notice.css" type="text/css" />

	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="./resources/js/main.js"></script>
	<script src="./resources/js/notice.js"></script>
	<title>문화제조창 키오스크</title>
</head>
<body>
	<div id="div_main">
		<div id="div_side">
			<div id="div_img_logo"></div>
			<div id="div_project_name">문화제조창 키오스크</div>
			<div id="div_side_menu">
				<div class="div_side_line"></div>
				<div id="btn_account" class="div_side_menu" onclick="javascript:accountPage();">계정관리</div>
				<div name="div_side_line" class="div_side_line"></div>
				<div id="btn_notice" class="div_side_menu" onclick="javascript:noticePage();">한줄공지 관리</div>
				<div name="div_side_line" class="div_side_line"></div>
				<div id="btn_event" class="div_side_menu" onclick="javascript:eventPage();">행사 관리</div>
				<div name="div_side_line" class="div_side_line"></div>
				<div id="btn_company" class="div_side_menu" onclick="javascript:companyPage();">입주기업 관리</div>
				<div name="div_side_line" class="div_side_line"></div>
				<!-- <div id="btn_wonder" class="div_side_menu" onclick="javascript:shopPage();">입점상가 관리</div>
				<div name="div_side_line" class="div_side_line"></div> -->
			</div>
		</div>
		<div id="div_top">
			<div id="div_top_item">
				<div id="div_user_icon"></div>
				<div id="div_user_auth"></div>
				<div id="div_user_name"></div>
				<div id="btn_logout" onclick="javascript:logout();">Logout ></div>
			</div>
		</div>
		<div id="div_contents">
			<div id="div_notice_top" class="div_notice">
				<a id="a_notice_title">한줄공지</a>
				<div id="btn_notice_add" class="div_button" onclick="javascript:showAddNotice();"></div>
				<div id="div_notice_title" class="div_notice_title">
					<a class="a_notice_title_num">No.</a>
					<a class="a_notice_title_num">언어</a>
					<a class="a_notice_title_item">한줄공지</a>
				</div>
			</div>
			<div id="div_notice_contents" class="div_notice"></div>
			<div id="div_notice_bottom" class="div_notice"></div>
			<div id="div_notice_item_add" class="div_notice"></div>
		</div>
	</div>
</body>
</html>
