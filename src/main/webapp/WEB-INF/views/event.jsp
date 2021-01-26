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
			<div id="div_contents_list">
				<div id="div_event_list_top" class="div_event_list">
					<a id="a_event_title">행사 목록</a>
					<div id="btn_event_add" class="div_button" onclick="javascript:showAddEvent();"></div>
					<div id="div_event_list_title" class="div_event_list_title">
						<a class="a_event_list_title_num">No.</a>
						<a class="a_event_list_title_item">이벤트명</a>
					</div>
				</div>
				<div id="div_event_list_contents" class="div_event_list"></div>
				<div id="div_event_list_bottom" class="div_event_list"></div>
			</div>
			<div id="div_contents_detail">
				<div id="div_loading">
					<div id="img_loading"></div>
					<div id="txt_loading">잠시만 기다려주세요...</div>
				</div>
				<div id="div_event_detail_top" class="div_event_detail">
					<div id="btn_event_lang">
						<div id="btn_kr" name="btn_event_lang" class="div_button_s" onclick="javascript:checkLang(0);"></div>
						<div id="btn_en" name="btn_event_lang" class="div_button_s" onclick="javascript:checkLang(1);"></div>
						<div id="btn_ch" name="btn_event_lang" class="div_button_s" onclick="javascript:checkLang(2);"></div>
						<div id="btn_jp" name="btn_event_lang" class="div_button_s" onclick="javascript:checkLang(3);"></div>
					</div>
					<div id="div_event_detail_title" class="div_event_detail_title">
						<a class="a_event_detail_title_item">항목명</a>
						<a class="a_event_detail_title_contents">내용</a>
					</div>
				</div>
				<div id="div_event_detail_contents"></div>
				<div id="div_event_detail_bottom" class="div_event_detail">
					<div id="div_btn_bottom_contain">
						<div id="btn_event_preview" class="div_button div_button_set" onclick="javascript:showPreview();"></div>
						<div id="btn_event_save" class="div_button div_button_set"></div>
						<div id="btn_event_cancleNdel" class="div_button div_button_set"></div>
					</div>
				</div>
			</div>
			<div id="div_event_detail"></div>
		</div>
		<div id="div_event_black"></div>
	</div>
</body>
</html>
