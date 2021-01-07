<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<link rel="stylesheet" href="./resources/css/main.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/account.css" type="text/css" />

	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="./resources/js/main.js"></script>
	<script src="./resources/js/account.js"></script>
	<title>Home</title>
</head>
<body>
	<div id="div_main">
		<div id="div_side">
			<div id="div_img_logo"></div>
			<div id="div_project_name">문화제조창 키오스크</div>
			<div id="div_side_menu">
				<div class="div_side_line"></div>
				<div id="btn_account" class="div_side_menu" onclick="javascript:accountPage();">계정관리</div>
				<div class="div_side_line"></div>
				<div id="btn_notice" class="div_side_menu" onclick="javascript:noticePage();">한줄공지 관리</div>
				<div class="div_side_line"></div>
				<div id="btn_event" class="div_side_menu" onclick="javascript:eventPage();">행사 관리</div>
				<div class="div_side_line"></div>
				<div id="btn_company" class="div_side_menu" onclick="javascript:companyPage();">입주기업 관리</div>
				<div class="div_side_line"></div>
				<div id="btn_wonder" class="div_side_menu" onclick="javascript:shopPage();">입점상가 관리</div>
				<div class="div_side_line"></div>
			</div>
		</div>
		<div id="div_top">
			<div id="div_top_item">
				<div id="div_user_icon"></div>
				<div id="div_user_auth">마스터 관리자</div>
				<div id="div_user_name">000 님</div>
				<div id="btn_logout" onclick="javascript:homePage();">Logout ></div>
			</div>
		</div>
		<div id="div_contents">
			<div id="div_account_top" class="div_account">
				<a id="a_account_title">계정관리</a>
				<div id="btn_account_add" class="div_button" onclick="javascript:showAddUser();"></div>
				<div id="div_account_title" class="div_account_title">
					<a class="a_account_title_num">No.</a>
					<a class="a_account_title_item">ID</a>
					<a class="a_account_title_item">PW</a>
					<a class="a_account_title_item">권한</a>
					<a class="a_account_title_item">이름</a>
				</div>
			</div>
			<div id="div_account_contents" class="div_account"></div>
			<div id="div_account_bottom" class="div_account"></div>
		</div>
	</div>
</body>
</html>
