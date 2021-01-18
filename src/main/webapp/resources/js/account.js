
$(document).ready(function(){
	initAccount();
	getUser();
});

var init_account_data;
function initAccount() {
	$('#btn_account').css('background-color', "#0062bd");
	if(isAuthCheck){ //마스터 관리자
		$.ajax({
			type: "POST",
			dataType: "json",
			async: false,
			url: MASTER_URL + "/user/select_all_user",
			success: function (result) {
				init_account_data = result;
			}
		});
	}else{ //일반 관리자
		var sendData = {user_id: getCookie("login_info").id}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: MASTER_URL + "/user/select_user",
			data : JSON.stringify(sendData),
			success: function (result) {
				init_account_data = result;
			}
		});
	}
}

function getUser(){
	var html_string = "";
	
	var num = 1;
	for(var i = 0; i < init_account_data.length; i++){
		html_string +=
			'<div name="div_account_item_title" class="div_account_title">' +
				'<a class="a_account_num">'+ num +'</a>' +
				'<a class="a_account_item">'+ init_account_data[i]["user_id"] +'</a>' +
				'<a class="a_account_item">'+ init_account_data[i]["user_pw"] +'</a>' +
				'<a class="a_account_item">'+ init_account_data[i]["user_auth"] +'</a>' +
				'<a class="a_account_item">'+ init_account_data[i]["user_name"] +'</a>' +
				'<div id="div_btn_set_contain">' +
					'<div id="btn_account_edit" class="div_button div_button_set" onclick="javascript:editUser('+ i +');"></div>' + //편집
					'<div id="btn_account_del" class="div_button div_button_set" onclick="javascript:deleteUser('+ init_account_data[i]["uid"] +');"></div>' + //삭제
				'</div>' + 
			'</div>' +
			'<div name="div_account_item_input" class="div_account_item_input">' +
				'<a class="a_account_num">'+ i +'</a>' +
				'<input type="text" name="in_account_id" class="in_account_item" value="'+ init_account_data[i]["user_id"] +'">' +
				'<input type="text" name="in_account_pw" class="in_account_item" value="'+ init_account_data[i]["user_pw"] +'">' +
				'<select name="sel_account_auth" class="in_account_item_select">' +
				    '<option value="0"'; if(init_account_data[i]["user_auth"] == 0) html_string += 'selected'; html_string += '>마스터</option>' +
				    '<option value="1"'; if(init_account_data[i]["user_auth"] == 1) html_string += 'selected'; html_string += '>원더아리아</option>' +
				    '<option value="2"'; if(init_account_data[i]["user_auth"] == 2) html_string += 'selected'; html_string += '>충북시청자미디어센터</option>' +
				    '<option value="3"'; if(init_account_data[i]["user_auth"] == 3) html_string += 'selected'; html_string += '>국립현대미술관</option>' +
				    '<option value="4"'; if(init_account_data[i]["user_auth"] == 4) html_string += 'selected'; html_string += '>청주시문화산업진흥재단</option>' +
				    '<option value="5"'; if(init_account_data[i]["user_auth"] == 5) html_string += 'selected'; html_string += '>청주열린도서관</option>' +
				'</select>' +
				'<input type="text" name="in_account_name" class="in_account_item" value="'+ init_account_data[i]["user_name"] +'">' +
				'<div id="div_btn_set_contain">' +
					'<div id="btn_account_save" class="div_button div_button_set" onclick="javascript:updateUser('+ i +', '+ init_account_data[i]["uid"] +');"></div>' + //저장
					'<div id="btn_account_cancle" class="div_button div_button_set" onclick="javascript:resetUser();"></div>' + //취소
				'</div>' + 
			'</div>' +
			'<div class="div_account_divide_line"></div>';3
		num += 1;
	}
	$('#div_account_contents').html(html_string);
	
	html_string= "";
	html_string +=
		'<a class="a_account_num"></a>' +
		'<input type="text" id="in_account_id_add" class="in_account_item">' +
		'<input type="text" id="in_account_pw_add" class="in_account_item">' +
		'<select id="sel_account_auth_add" class="in_account_item">' +
		    '<option value="0">마스터</option>' +
		    '<option value="1">원더아리아</option>' +
		    '<option value="2">충북시청자미디어센터</option>' +
		    '<option value="3">국립현대미술관</option>' +
		    '<option value="4">청주시문화산업진흥재단</option>' +
		    '<option value="5">청주열린도서관</option>' +
		'</select>' +
		'<input type="text" id="in_account_name_add" class="in_account_item">' +
		'<div id="div_btn_set_contain">' +
			'<div id="btn_account_save" class="div_button div_button_set" onclick="javascript:addUser();"></div>' + //저장
			'<div id="btn_account_cancle" class="div_button div_button_set" onclick="javascript:resetUser();"></div>' + //취소
		'</div>';	
	$('#div_account_item_add').html(html_string);
	
	
	if(!isAuthCheck){
		$('#btn_account_add').hide();
		$('#btn_account_del').hide();
		$('select[name=sel_account_auth]').attr('disabled', 'true');
	}
	resetUser();
}

function resetUser(){
	//init_data로 초기화
	$('div[name=div_account_item_input]').each(function(index){
		$('input[name=in_account_id_add]:eq("' + index + '")').val(init_account_data[index]["user_id"]);
		$('input[name=in_account_pw_add]:eq("' + index + '")').val(init_account_data[index]["user_pw"]);
		$('select[name=sel_account_auth_add]:eq("' + index + '")').val(init_account_data[index]["user_auth"]);
		$('input[name=in_account_name_add]:eq("' + index + '")').val(init_account_data[index]["user_name"]);
		
		$('div[name=div_account_item_title]:eq("' + index + '")').show();
		$('div[name=div_account_item_input]:eq("' + index + '")').hide();
	});
	
	$('#div_account_item_add').hide();
}

function showAddUser(){
	resetUser();

	$('#in_account_id_add').val('');
	$('#in_account_pw_add').val('');
	$('#sel_account_auth_add').val('0');
	$('#in_account_name_add').val('');
	
	$('#div_account_item_add').show();
	$('#in_account_id_add').focus();
}

function editUser(index){
	resetUser();
	
	$('div[name=div_account_item_title]:eq("' + index + '")').hide();
	$('div[name=div_account_item_input]:eq("' + index + '")').show();
}

function deleteUser(uid){
	if(!confirm("삭제하시겠습니까?")) return;
	var sendData = { uid: uid }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: MASTER_URL + "/user/delete_user",
		async: false,
		data: JSON.stringify(sendData),
		success: function (result) {
			window.location.reload();
		},
		error: function () {
		}
	});	
}

function updateUser(index, uid){
	var id_data = $('input[name=in_account_id]:eq("' + index + '")').val();
	var pw_data = $('input[name=in_account_pw]:eq("' + index + '")').val();
	var auth_data = $('select[name=sel_account_auth]:eq("' + index + '")').val();
	var name_data = $('input[name=in_account_name]:eq("' + index + '")').val();
	
	if(!confirm("저장하시겠습니까?")) return;
	var sendData = { user_id: id_data, user_pw: pw_data, user_auth: auth_data, user_name: name_data, uid: uid }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: MASTER_URL + "/user/update_user",
		async: false,
		data: JSON.stringify(sendData),
		success: function (result) {
			window.location.reload();
		},
		error: function () {
		}
	});
}

function addUser(){
	var id_data = $('#in_account_id_add').val();
	var pw_data = $('#in_account_pw_add').val();
	var auth_data = $("#sel_account_auth_add option:selected").val();
	var name_data = $('#in_account_name_add').val();
	
	if(id_data == "" || pw_data == "" || auth_data == "" || name_data == "") return alert("데이터를 모두 입력해주세요.");
	
	var sendData = { user_id: id_data, user_pw: pw_data, user_auth: auth_data, user_name: name_data }
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: MASTER_URL + "/user/insert_user",
		async: false,
		data: JSON.stringify(sendData),
		success: function (result) {
			window.location.reload();
		},
		error: function () {
		}
	});
}

