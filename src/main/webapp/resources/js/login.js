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
	
	if(getPwOfId(get_id) != get_pw){
		$('#user_pw').val('');
		$('#user_pw').focus();
		return alert("비밀번호가 틀렸습니다.");
	} 	
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

function getPwOfId(get_id){
	var isPassword;
	var sendData = {user_id: get_id}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/user/select_user",
		data : JSON.stringify(sendData),
		success: function (result) {
			isPassword = result[0]["user_pw"];
		}
	});
	return isPassword;
}