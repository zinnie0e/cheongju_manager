<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<link rel="stylesheet" href="./resources/css/main.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/usage.css" type="text/css" />

	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	
	<script src="./resources/js/main.js"></script>
	<script src="./resources/js/usage.js"></script>
	
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.3/xlsx.full.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>
	
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
				<div id="btn_usage" class="div_side_menu" onclick="javascript:usagePage();">이용통계 관리</div>
				<div name="div_side_line" class="div_side_line"></div>
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
			<div id="div_chart">
				<a id="a_usage_title">키오스크 이용 통계 현황</a>
				<div id="div_sel_date"></div>
				<div id="btn_excel" onclick="javascript:exportExcel();"></div>
				<canvas id="dayChart" class="chart"></canvas>
				<canvas id="allChart" class="chart"></canvas>
			</div>
		</div>
	</div>
</body>
</html>
