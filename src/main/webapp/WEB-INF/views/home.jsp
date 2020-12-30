<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<link rel="stylesheet" href="./resources/css/main.css" type="text/css" />

	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="./resources/js/login.js"></script>
	<title>Home</title>
</head>
<body>
	<div id="div_login">
		<p style="size: 40px;">문화제조창C 키오스크 매니저</p>
		<input type="text" id="user_id"><br>
		<input type="password" id="user_pw"><br>
		<button type="button" id="btn_next" onclick="javascript:loginTest();">로그인</button>
	</div>

	<!-- <form id="FILE_FORM" method="post" enctype="multipart/form-data" action="">
		<input type="file" id="FILE_TAG" name="FILE_TAG">
		<input type="file" id="FILE_TAG2" name="FILE_TAG2">
		<div class="ui-shadow ui-btn ui-corner-all" onclick="javascript:uploadFile();">전송</div>
	</form>
	
	<form id="ACCOUNT_FORM" method="post" action="">
		<input type="text" id="ID_TAG" name="ID_TAG">
		<input type="password" id="PW_TAG" name="PW_TAG">
		<input type="checkbox" id=SAVE_TAG name="SAVE_TAG" value="save">
		<div class="ui-shadow ui-btn ui-corner-all" onclick="javascript:loginTest();">로그인</div>
		<div class="ui-shadow ui-btn ui-corner-all" onclick="javascript:logoutTest();">로그아웃</div>
	</form> -->
</body>
</html>
