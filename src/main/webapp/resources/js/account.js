$(document).ready(function(){
	initAccount();
	getUser();
});

function initAccount() {
	$('#btn_account').css('background-color', "#0062bd");
}

function getUser(){
	var html_string = "";
	
	for(var i = 0; i < 3; i++){
		html_string +=
			'<div name="div_account_item" class="div_account_title">' +
				'<a class="a_account_num">'+ i +'</a>' +
				'<input type="text" name="in_account_id" class="in_account_item" value="'+ i +'" disabled>' +
				'<input type="text" name="in_account_pw" class="in_account_item" value="'+ i +'" disabled>' +
				'<select name="sel_account_auth" class="in_account_item" disabled>' +
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
				'<input type="text" name="in_account_name" class="in_account_item" value="'+ i +'" disabled>' +
				'<input type="button" name="btn_account_e_s" class="div_account_button" value="편집" onclick="javascript:setUser(this.value, '+ i +');">' +
				'<input type="button" name="btn_account_d_c" class="div_account_button" value="삭제" onclick="javascript:setUser(this.value, '+ i +');">' +
			'</div>';
		$('#div_account_contents').html(html_string);
	}
}

function addUser(){
	
}

function setUser(value, get_json){
	logNow(value + "/" + get_json);
	if(value == "편집"){
		$('input[name=in_account_id]:eq("' + get_json + '")').attr('disabled', false);
		$('input[name=in_account_pw]:eq("' + get_json + '")').attr('disabled', false);
		$('select[name=sel_account_auth]:eq("' + get_json + '")').attr('disabled', false);
		$('input[name=in_account_name]:eq("' + get_json + '")').attr('disabled', false);
		
		$('input[name=btn_account_e_s]:eq("' + get_json + '")').val('저장');
		$('input[name=btn_account_d_c]:eq("' + get_json + '")').val('취소');
		$('div[name=div_account_item]:eq("' + get_json + '")').css('background-color', '#e9e9e9');
	}else if(value == "저장"){
		//업데이트 ajsx
		getUser();
//		$('input[id=in_account_id]:eq("' + get_json + '")').attr('disabled', true);
//		$('input[id=in_account_pw]:eq("' + get_json + '")').attr('disabled', true);
//		$('select[id=sel_account_auth]:eq("' + get_json + '")').attr('disabled', true);
//		$('input[id=in_account_name]:eq("' + get_json + '")').attr('disabled', true);
//		
//		$('input[id=btn_account_e_s]:eq("' + get_json + '")').val('편집');
//		$('input[id=btn_account_d_c]:eq("' + get_json + '")').val('삭제');
//		$('div[id=div_account_item]:eq("' + get_json + '")').css('background-color', '');
	}else if(value == "삭제"){
		//삭제 ajsx
		getUser();
	}else if(value == "취소"){
		getUser();
	}
}

