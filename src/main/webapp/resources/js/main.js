const IS_DEBUG = true;
var SETTING_URL = "http://localhost:9090";

function logNow(logContents){
    if(IS_DEBUG){
        console.log(logContents);
    }
}

$(document).ready(function(){
	initManager();
});

function initManager() {
}

function homePage() {
	location.href="http://localhost:8080/kiosk/";
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