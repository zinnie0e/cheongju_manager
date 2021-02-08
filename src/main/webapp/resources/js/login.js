var MASTER_URL = "http://localhost:9090";
//var MASTER_URL = "http://cheongjukiosk.iptime.org:10000/kioskserver";

function login() {
	var get_id = $('#user_id').val().trim();
	var get_pw = $('#user_pw').val().trim();
	
	if(get_id == "" || get_pw == "") return alert("아이디, 패스워드를 입력해주세요.");
	
	var json_data = {
			user_id : get_id,
			user_pw : get_pw
		};

	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/login",
		xhrFields: {withCredentials : true},
		data : JSON.stringify(json_data),
		success : function(result) {
			if ("success" == result["result"] || "re-login" == result["result"]) {
				var json_data = { id : result["user_id"], auth: result["user_auth"], name: result["user_name"] };
				setCookie("login_info", JSON.stringify(json_data), 30);
				
//				location.replace("main");
				location.href="main";
			} else if ("none" == result["result"]) {
				$('#user_id').val('');
				$('#user_pw').val('');
				$('#user_id').focus();
				
				alert("존재하지 않는 아이디입니다.");
			} else if ("pwd" == result["result"]) {
				$('#user_pw').val('');
				$('#user_pw').focus();
				
				alert("비밀번호가 틀렸습니다.");
			}
		}
	});
}

function blockBack() {
	window.history.forward();
}

function enterCheck(code){
	if(event.keyCode == 13){ //엔터키
		if(code == 0){
			login();
		}
	}
}

function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
    console.log(cookieName + "=" + cookieValue);
}

function CheckExistId(get_id){
	var isCheck;
	var sendData = {user_id: get_id}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/user/select_check_user",
		data : JSON.stringify(sendData),
		success: function (result) {
			isCheck = result;
		}
	});
	return isCheck;
}

function getInfoOfId(get_id){
	var isInfo = {pw: "", auth: ""};
	var sendData = {user_id: get_id}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/user/select_user",
		data : JSON.stringify(sendData),
		success: function (result) {
			isInfo.pw = result[0]["user_pw"];
			isInfo.auth = result[0]["user_auth"];
			isInfo.name = result[0]["user_name"];
		}
	});
	return isInfo;
}
