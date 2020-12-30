<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<link rel="stylesheet" href="./resources/css/main.css" type="text/css" />

	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="./resources/js/main.js"></script>
	<title>Home</title>
</head>
<body>
	<div id="div_main">
		<div id="div_side">
			<input type="button" id="btn_account" class="div_side" value="계정관리" onclick="javascript:accountPage();">
			<input type="button" id="btn_notice" class="div_side" value="한줄공지 관리" onclick="javascript:loginTest();">
			<input type="button" id="btn_event" class="div_side" value="행사 관리" onclick="javascript:loginTest();">
			<input type="button" id="btn_company" class="div_side" value="입주기업 관리" onclick="javascript:loginTest();">
			<input type="button" id="btn_wonder" class="div_side" value="입점상가 관리" onclick="javascript:loginTest();">
		</div>
		<div id="div_top">
			<a id="a_manager" style="size: 40px;">관리자</a>
			<input type="button" id="btn_logout" value="Logout >" onclick="javascript:homePage();">
		</div>
		<div id="div_contents"></div>
	</div>
</body>
</html>
