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
			<input type="button" id="btn_account" class="div_side" value="계정관리" onclick="javascript:accountPage();">
			<input type="button" id="btn_notice" class="div_side" value="한줄공지 관리" onclick="javascript:noticePage();">
			<input type="button" id="btn_event" class="div_side" value="행사 관리" onclick="javascript:eventPage();">
			<input type="button" id="btn_company" class="div_side" value="입주기업 관리" onclick="javascript:loginTest();">
			<input type="button" id="btn_wonder" class="div_side" value="입점상가 관리" onclick="javascript:loginTest();">
		</div>
		<div id="div_top">
			<div id="div_top_item">
				<a id="a_manager" style="font-size: 40px;">관리자</a>
				<input type="button" id="btn_logout" value="Logout >" onclick="javascript:homePage();">
			</div>
		</div>
		<div id="div_contents">
			<div id="div_account_top" class="div_account">
				<a id="a_account_title">계정관리</a>
				<input type="button" id="btn_account_add" value="추가" onclick="javascript:showAddUser();">
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
