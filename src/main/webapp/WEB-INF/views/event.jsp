<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<link rel="stylesheet" href="./resources/css/main.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/event.css" type="text/css" />

	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="./resources/js/main.js"></script>
	<script src="./resources/js/event.js"></script>
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
			<div id="div_contents_list">
				<div id="div_event_list_top" class="div_event_list">
					<a id="a_event_title">행사 목록</a>
					<input type="button" id="btn_event_add" value="추가" onclick="javascript:showAddEvent();">
					<div id="div_event_list_title" class="div_event_list_title">
						<a class="a_event_list_title_num">No.</a>
						<a class="a_event_list_title_item">이벤트명</a>
					</div>
				</div>
				<div id="div_event_list_contents" class="div_event_list"></div>
				<div id="div_event_list_bottom" class="div_event_list"></div>
			</div>
			<div id="div_contents_detail">
				<div id="div_event_detail_top" class="div_event_detail">
					<input type="button" name="btn_event_lang" class="btn_event_lang" value="KR" style="margin-left:25px" onclick="javascript:checkLang(0);">
					<input type="button" name="btn_event_lang" class="btn_event_lang" value="EN" onclick="javascript:checkLang(1);">
					<input type="button" name="btn_event_lang" class="btn_event_lang" value="CH" onclick="javascript:checkLang(2);">
					<input type="button" name="btn_event_lang" class="btn_event_lang" value="JP" onclick="javascript:checkLang(3);">
					<div id="div_event_detail_title" class="div_event_detail_title">
						<a class="a_event_detail_title_item">항목명</a>
						<a class="a_event_detail_title_contents">내용</a>
					</div>
				</div>
				<div id="div_event_detail_contents"></div>
				<div id="div_event_detail_bottom" class="div_event_detail">
					<div style="text-align:center;">
						<input type="button" id="btn_event_contents_preview" class="btn_event_contents_bottom" value="미리보기" onclick="javascript:showAddEvent();">
						<input type="button" id="btn_event_contents_insert" class="btn_event_contents_bottom">
						<input type="button" id="btn_event_contents_cancel" class="btn_event_contents_bottom">
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
