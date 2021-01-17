<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<link rel="stylesheet" href="./resources/css/main.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/shop.css" type="text/css" />

	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="./resources/js/main.js"></script>
	<script src="./resources/js/shop.js"></script>
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
				<div id="div_user_auth">마스터 관리자</div>
				<div id="div_user_name">000 님</div>
				<div id="btn_logout" onclick="javascript:homePage();">Logout ></div>
			</div>
		</div>
		<div id="div_contents">
			<div id="div_contents_list">
				<div id="div_shop_list_top" class="div_shop_list">
					<div id="div_shop_list_title" class="div_shop_list_title">
						<a id="a_shop_title">입주상가목록</a>
						<input type="button" id="btn_shop_add" value="추가" onclick="javascript:showAddShop();">
					</div>
					<div id="div_shop_list_title_search">
						<input type="text" id="in_shop_search">
						<div id="div_shop_search"></div>
					</div>
					<div id="div_shop_list_item_title" class="div_shop_list_title">
						<a class="a_shop_list_title_num">No.</a>
						<a class="a_shop_list_title_item">상호명</a>
					</div>
				</div>
				<div id="div_shop_list_title_contents" class="div_shop_list">
					<div id="div_shop_list_contents"></div>
				</div>
				<div id="div_shop_list_bottom" class="div_shop_list"></div>
			</div>
			<div id="div_contents_detail">
				<div id="div_shop_detail_map" class="div_shop_detail">
					<div id="div_shop_flow_btn">
						<input type="button" name="btn_shop_flow" class="btn_shop_flow" value="1층" style="margin-left:25px" onclick="javascript:checkFlow(0);">
						<input type="button" name="btn_shop_flow" class="btn_shop_flow" value="2층" onclick="javascript:checkFlow(1);">
						<input type="button" name="btn_shop_flow" class="btn_shop_flow" value="3층" onclick="javascript:checkFlow(2);">
					</div>
					<div id="div_shop_map">
						<img id="img_shop_map" onclick="javascript:checkLoc()"/>
						<img id="img_shop_pin" src="./resources/image/point_arrival.png"/>
					</div>
				</div>
				<div id="div_shop_detail_lang" class="div_shop_detail">
					<div id="div_shop_lang_btn">
						<input type="button" name="btn_shop_lang" class="btn_shop_lang" value="KR" style="margin-left:25px" onclick="javascript:checkLang(0);">
						<input type="button" name="btn_shop_lang" class="btn_shop_lang" value="EN" onclick="javascript:checkLang(1);">
						<input type="button" name="btn_shop_lang" class="btn_shop_lang" value="CH" onclick="javascript:checkLang(2);">
						<input type="button" name="btn_shop_lang" class="btn_shop_lang" value="JP" onclick="javascript:checkLang(3);">
					</div>
					<div id="div_shop_detail_title" class="div_shop_detail_title">
						<a class="a_shop_detail_title_item">항목명</a>
						<a class="a_shop_detail_title_contents">내용</a>
					</div>
				</div>
				<div id="div_shop_detail_contents"></div>
				<div id="div_shop_detail_bottom" class="div_shop_detail">
					<div style="text-align:center;">
						<input type="button" id="btn_shop_contents_insert" class="btn_shop_contents_bottom">
						<input type="button" id="btn_shop_contents_cancel" class="btn_shop_contents_bottom">
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
