const IS_DEBUG = true;

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