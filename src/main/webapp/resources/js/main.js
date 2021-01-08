const IS_DEBUG = true;
var SETTING_URL = "http://localhost:9090";

function logNow(logContents){
    if(IS_DEBUG){
        console.log(logContents);
    }
}

var isAuthCheck;
$(document).ready(function(){
	if(getCookie("login_info").auth == 0) isAuthCheck = true;
	else isAuthCheck = false;
	
	initManager();
});

function initManager() {
	initUserInfo();
}

function homePage() { //logout
	location.href="http://localhost:8080/manager/";
	deleteCookie("login_info");
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

function enterCheck(code){
	if(event.keyCode == 13){ //엔터키
		if(code == 0){
			login();
		}
	}
}

function initUserInfo(){
	if(getCookie("login_info").auth == 0){
		$("#div_user_auth").text("마스터 관리자"); 
		$('#div_user_icon').css('background-image', 'url(./resources/image/icon_masteruser.png)');
	} 
	else{
		 $("#div_user_auth").text("일반 관리자"); 
		 $('#div_user_icon').css('background-image', 'url(./resources/image/icon_user.png)');
	}
	$("#div_user_name").text(getCookie("login_info").name + " 님"); 
}

function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
    console.log(cookieName + "=" + cookieValue);
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