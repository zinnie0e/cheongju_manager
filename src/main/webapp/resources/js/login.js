function login() {
	var get_id = $('#user_id').val().trim();
	var get_pw = $('#user_pw').val().trim();
	
	if(get_id == "" || get_pw == "") return alert("아이디, 패스워드를 입력해주세요.");
	if(CheckExistId(get_id) == 0){
		$('#user_id').val('');
		$('#user_pw').val('');
		$('#user_id').focus();
		return alert("존재하지 않는 아이디입니다.");
	}
	
	if(getInfoOfId(get_id).pw != get_pw){
		$('#user_pw').val('');
		$('#user_pw').focus();
		return alert("비밀번호가 틀렸습니다.");
	} 	
	
	var json_data = { id : get_id, auth: getInfoOfId(get_id).auth, name: getInfoOfId(get_id).name };
	setCookie("login_info", JSON.stringify(json_data), 30);
	
	location.href="main";
}

function CheckExistId(get_id){
	var isCheck;
	var sendData = {user_id: get_id}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/user/select_check_user",
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
		url: SETTING_URL + "/user/select_user",
		data : JSON.stringify(sendData),
		success: function (result) {
			isInfo.pw = result[0]["user_pw"];
			isInfo.auth = result[0]["user_auth"];
			isInfo.name = result[0]["user_name"];
		}
	});
	return isInfo;
}

