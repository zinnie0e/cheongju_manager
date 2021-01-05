$(document).ready(function(){
	initAccount();
	getUser();
});

function initAccount() {
	$('#btn_account').css('background-color', "#0062bd");
}

function getUser(){
	var html_string = "";
	
	//ajax 전체 데이터 셀렉트, 초기 데이터 전역변수 init_data에 저장
	for(var i = 0; i < 3; i++){
		html_string +=
			'<div name="div_account_item_title" class="div_account_title">' +
				'<a class="a_account_num">'+ i +'</a>' +
				'<a class="a_account_item">'+ i +'</a>' +
				'<a class="a_account_item">'+ i +'</a>' +
				'<a class="a_account_item">'+ i +'</a>' +
				'<a class="a_account_item">'+ i +'</a>' +
				'<input type="button" class="div_account_button" value="편집" onclick="javascript:editUser('+ i +');">' +
				'<input type="button" class="div_account_button" value="삭제" onclick="javascript:deleteUser('+ i +');">' +
			'</div>' +
			'<div name="div_account_item_input" class="div_account_item_input">' +
				'<a class="a_account_num">'+ i +'</a>' +
				'<input type="text" name="in_account_id" class="in_account_item" value="'+ i +'">' +
				'<input type="text" name="in_account_pw" class="in_account_item" value="'+ i +'">' +
				'<select name="sel_account_auth" class="in_account_item_select">' +
				    '<option value="0">마스터</option>' +
				    '<option value="1">원더플레이스</option>' +
				    '<option value="2">한국공예관</option>' +
				    '<option value="3">열린도서관</option>' +
				    '<option value="4">충북시청자미디어센터</option>' +
				    '<option value="5">국립현대미술관</option>' +
				    '<option value="6">청주시문화산업재단</option>' +
				    '<option value="7">동부창고</option>' +
				    '<option value="8">복합공영주차장</option>' +
				'</select>' +
				'<input type="text" name="in_account_name" class="in_account_item" value="'+ i +'">' +
				'<input type="button" class="div_account_button" value="저장" onclick="javascript:updateUser('+ i +');">' +
				'<input type="button" class="div_account_button" value="취소" onclick="javascript:resetUser();">' +
			'</div>' +
			'<div class="div_account_divide_line"></div>';
	}
	
	html_string +=
		'<div id="div_account_item_add" class="div_account_item_input" style="margin-top:20px;">' +
			'<a class="a_account_num"></a>' +
			'<input type="text" id="in_account_id_add" class="in_account_item">' +
			'<input type="text" id="in_account_pw_add" class="in_account_item">' +
			'<select id="sel_account_auth_add" class="in_account_item">' +
			    '<option value="0">마스터</option>' +
			    '<option value="1">원더플레이스</option>' +
			    '<option value="2">한국공예관</option>' +
			    '<option value="3">열린도서관</option>' +
			    '<option value="4">충북시청자미디어센터</option>' +
			    '<option value="5">국립현대미술관</option>' +
			    '<option value="6">청주시문화산업재단</option>' +
			    '<option value="7">동부창고</option>' +
			    '<option value="8">복합공영주차장</option>' +
			'</select>' +
			'<input type="text" id="in_account_name_add" class="in_account_item">' +
			'<input type="button" class="div_account_button" value="저장" onclick="javascript:addUser();">' +
			'<input type="button" class="div_account_button" value="취소" onclick="javascript:resetUser();">' +
		'</div>';
	
	$('#div_account_contents').html(html_string);
	
	resetUser();
}

function resetUser(){
	//init_data로 초기화
	$('div[name=div_account_item_input]').each(function(index){
		$('input[name=in_account_id_add]:eq("' + index + '")').val(index);
		$('input[name=in_account_pw_add]:eq("' + index + '")').val(index);
		$('input[name=sel_account_auth_add]:eq("' + index + '")').val(index);
		$('input[name=in_account_name_add]:eq("' + index + '")').val(index);
		
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

function deleteUser(index){
	//삭제 ajsx
	getUser();
}

function updateUser(index){
	//업데이트 ajsx
	getUser();
}

function addUser(){
	//추가 ajsx
	getUser();
}

