const IS_DEBUG = true;
var MASTER_URL = "http://localhost:9090";
//var MASTER_URL = "http://guruiot.iptime.org:10000/kioskserver";
//var SLAVE_URL = "http://guruiot.iptime.org:10001/kioskserver"; 

function logNow(logContents){
    if(IS_DEBUG){
        console.log(logContents);
    }
}

$(document).ready(function(){
	initManager();
});

var isAuthCheck;
function initManager() {
	if("pass" == sessionCheck()){
		if(getCookie("login_info").auth == 0) isAuthCheck = true;
		else isAuthCheck = false;
		
		initUserInfo();
		
		return true;
	} else {
		homePage();
		
		return false;
	}
}

function logout() {
	if(!confirm("로그아웃 하시겠습니까?")) return;
	$.ajax({
		type : 'POST',
		async : false,
		url : MASTER_URL + "/logout",
		xhrFields: {withCredentials : true}
	});
	
	deleteCookie("login_info");
	
	homePage();
}

function homePage() {
	//location.replace("http://guruiot.iptime.org:10000/manager/");
	location.replace("http://localhost:8080/manager/");
}

function accountPage() {
	location.href="account";
}

function noticePage() {
	location.href="notice";
}

function eventPage() {
	location.href="event";
}

function companyPage() {
	location.href="company";
}

function shopPage() {
	location.href="shop";
}

function initUserInfo(){
	if(getCookie("login_info").auth == 0){
		$("#div_user_auth").text("마스터 관리자"); 
		$('#div_user_icon').css('background-image', 'url(./resources/image/icon_masteruser.png)');
	} 
	else{
		 $("#div_user_auth").text("일반 관리자"); 
		 $('#div_user_icon').css('background-image', 'url(./resources/image/icon_user.png)');
		 
		 $('#btn_notice').hide(); //한줄공지관리 숨기기
		 $('div[name=div_side_line]:eq("1")').hide();
		 
		 if(getCookie("login_info").auth != 4){
			$('#btn_company').hide(); //입주기업관리 숨기기
			$('div[name=div_side_line]:eq("3")').hide();
		}
	}
	$("#div_user_name").text(getCookie("login_info").name + " 님"); 
}

function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return JSON.parse(unescape(cookieValue));
}

function sessionCheck() {
	var set_result = "";
	$.ajax({
		type : 'POST',
		async : false,
		url : MASTER_URL + "/check",
		xhrFields: {withCredentials : true},
		success : function(result) {
			set_result = result;
		}
	});
	
	return set_result;
}

function enterCheck(code){
	if(event.keyCode == 13){ //엔터키
		if(code == 1){
			searchCompany();
		}
	}
}