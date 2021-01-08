$(document).ready(function(){
	initNotice();
	getNotice();
});

var lang = ["kr", "en", "ch", "jp"];
var init_notice_data = new Array();
function initNotice() {
	$('#btn_notice').css('background-color', "#0062bd");
	
	var notice_count;
	$.ajax({
		type: "POST",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/notice/select_notice_count",
		success: function (result) {
			notice_count = result;
		}
	});
	
	for(var i = 0; i < notice_count.length; i++){
		var sendData = {uid: notice_count[i]["uid"]}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			async: false,
			url: SETTING_URL + "/notice/select_notice_of_lang",
			data : JSON.stringify(sendData),
			success: function (result) {
				init_notice_data.push(result);
			}
		});
	}
}


function getNotice(){
	var html_string = "";
	
	logNow(init_notice_data);
	
	//ajax 전체 데이터 셀렉트, 초기 데이터 전역변수 init_data에 저장
	//0(한국어), 1(영어), 2(중국어), 3(일어)
	for(var i = 0; i < init_notice_data.length; i++){
		html_string +=
			'<div name="div_notice_item">' +
				'<div name="div_notice_item_title" class="div_notice_title">' +
					'<a class="a_notice_num">'+ i +'</a>' +
					'<a class="a_notice_num">KR</a>' +
					'<a class="a_notice_item_title" onclick="javascript:showNotice('+ i +');">'+ init_notice_data[i][0]["notice"] +'</a>' +
					'<div id="div_btn_set_contain">' +
						'<div id="btn_notice_edit" class="div_button div_button_set" onclick="javascript:editNotice('+ i +');"></div>' + //편집
						'<div id="btn_notice_del" class="div_button div_button_set" onclick="javascript:deleteNotice('+ init_notice_data[i][0]["uid"] +');"></div>' + //삭제
					'</div>' + 
				'</div>' +
				'<div class="div_notice_divide_line"></div>' +
				'<div name="div_notice_item_input" class="div_notice_item_input">' +
					'<div name="div_notice_item_kr" class="div_notice_item_lang">' +
						'<a class="a_notice_num">'+ i +'</a>' +
						'<a class="a_notice_num">KR</a>' +
						'<input type="text" name="in_notice_kr" class="in_notice_item" value="'+ init_notice_data[i][0]["notice"] +'", disabled>' +
						'<div id="div_btn_set_contain">' +
							'<div id="btn_notice_edit" class="div_button div_button_set" onclick="javascript:editNotice('+ i +');"></div>' + //편집
							'<div id="btn_notice_del" class="div_button div_button_set" onclick="javascript:deleteNotice('+ init_notice_data[i][0]["uid"] +');"></div>' + //삭제
						'</div>' + 
					'</div>' +
					'<div name="div_notice_item_kr_u_c" class="div_notice_item_lang">' +
						'<a class="a_notice_num">'+ i +'</a>' +
						'<a class="a_notice_num">KR</a>' +
						'<input type="text" name="in_notice_kr_u" class="in_notice_item" value="">' +
						'<div id="div_btn_set_contain">' +
							'<div id="btn_notice_save" class="div_button div_button_set" onclick="javascript:updateNotice('+ i +', '+ init_notice_data[i][0]["uid"] +');"></div>' + //저장
							'<div id="btn_notice_cancle" class="div_button div_button_set" onclick="javascript:resetNotice();"></div>' + //취소
						'</div>' + 
					'</div>' +
					'<div name="div_notice_item_en" class="div_notice_item_lang">' +
						'<a class="a_notice_num"></a>' +
						'<a class="a_notice_num">EN</a>' +
						'<input type="text" name="in_notice_en" class="in_notice_item" value="">' +
					'</div>' +
					'<div name="div_notice_item_ch" class="div_notice_item_lang">' +
						'<a class="a_notice_num"></a>' +
						'<a class="a_notice_num">CH</a>' +
						'<input type="text" name="in_notice_ch" class="in_notice_item" value="">' +
					'</div>' +
					'<div name="div_notice_item_jp" class="div_notice_item_lang">' +
						'<a class="a_notice_num"></a>' +
						'<a class="a_notice_num">JP</a>' +
						'<input type="text" name="in_notice_jp" class="in_notice_item" value="">' +
					'</div>' +
				'</div>' +
			'</div>';
	}
	
	html_string +=
		'<div id="div_notice_item_add" class="div_notice_item_input" style="margin-top:20px;">' +
			'<div id="div_notice_item_kr_add" class="div_notice_item_lang">' +
				'<a class="a_notice_num"></a>' +
				'<a class="a_notice_num">KR</a>' +
				'<input type="text" id="in_notice_kr_add" class="in_notice_item" value="'+ i +'">' +
				'<div id="div_btn_set_contain">' +
					'<div id="btn_notice_save" class="div_button div_button_set" onclick="javascript:addNotice();"></div>' + //저장
					'<div id="btn_notice_cancle" class="div_button div_button_set" onclick="javascript:resetNotice();"></div>' + //취소
				'</div>' + 
			'</div>' +
			'<div id="div_notice_item_en_add" class="div_notice_item_lang">' +
				'<a class="a_notice_num"></a>' +
				'<a class="a_notice_num">EN</a>' +
				'<input type="text" id="in_notice_en_add" class="in_notice_item" value="'+ i +'">' +
			'</div>' +
			'<div idname="div_notice_item_ch_add" class="div_notice_item_lang">' +
				'<a class="a_notice_num"></a>' +
				'<a class="a_notice_num">CH</a>' +
				'<input type="text" id="in_notice_ch_add" class="in_notice_item" value="'+ i +'">' +
			'</div>' +
			'<div id="div_notice_item_jp_add" class="div_notice_item_lang">' +
				'<a class="a_notice_num"></a>' +
				'<a class="a_notice_num">JP</a>' +
				'<input type="text" id="in_notice_jp_add" class="in_notice_item" value="'+ i +'">' +
			'</div>' +
		'</div>';
	
	$('#div_notice_contents').html(html_string);
	
	resetNotice();
}

function resetNotice(){
	//init_data로 초기화
	$('div[name=div_notice_item_input]').each(function(index){
		$('input[name=in_notice_kr_u]:eq("' + index + '")').val(init_notice_data[index][0]["notice"]);
		$('input[name=in_notice_en]:eq("' + index + '")').val(init_notice_data[index][1]["notice"]);
		$('input[name=in_notice_ch]:eq("' + index + '")').val(init_notice_data[index][2]["notice"]);
		$('input[name=in_notice_jp]:eq("' + index + '")').val(init_notice_data[index][3]["notice"]);
		
		$('div[name=div_notice_item_title]:eq("' + index + '")').show();
		$('div[name=div_notice_item_input]:eq("' + index + '")').hide();
	});
	
	$('#div_notice_item_add').hide();
}

function showNotice(index){
	resetNotice();
	
	$('input[name=in_notice_en]:eq("' + index + '")').attr('disabled', true);
	$('input[name=in_notice_ch]:eq("' + index + '")').attr('disabled', true);
	$('input[name=in_notice_jp]:eq("' + index + '")').attr('disabled', true);
	
	$('div[name=div_notice_item_kr]:eq("' + index + '")').show();
	$('div[name=div_notice_item_kr_u_c]:eq("' + index + '")').hide();
	
	$('div[name=div_notice_item_title]:eq("' + index + '")').hide();
	$('div[name=div_notice_item_input]:eq("' + index + '")').show();
}

function showAddNotice(){
	resetNotice();

	$('#in_notice_kr_add').val('');
	$('#in_notice_en_add').val('');
	$('#in_notice_ch_add').val('');
	$('#in_notice_jp_add').val('');
	
	$('#div_notice_item_add').show();
	$('#in_notice_kr_add').focus();
}

function editNotice(index){
	resetNotice();
	
	$('input[name=in_notice_en]:eq("' + index + '")').attr('disabled', false);
	$('input[name=in_notice_ch]:eq("' + index + '")').attr('disabled', false);
	$('input[name=in_notice_jp]:eq("' + index + '")').attr('disabled', false);
	
	$('div[name=div_notice_item_kr]:eq("' + index + '")').hide();
	$('div[name=div_notice_item_kr_u_c]:eq("' + index + '")').show();
	
	$('div[name=div_notice_item_title]:eq("' + index + '")').hide();
	$('div[name=div_notice_item_input]:eq("' + index + '")').show();
}

function deleteNotice(uid){
	if(!confirm("삭제하시겠습니까?")) return;
	for(var i = 0 ; i < lang.length ; i++){
		var sendData = { language: lang[i], uid: uid }
		logNow(sendData);
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/notice/delete_notice_of_lang",
			async: false,
			data: JSON.stringify(sendData),
			success: function (result) {
				window.location.reload();
			},
			error: function () {
			}
		});
	}
}

function updateNotice(index, uid){
	$('input[name=in_notice_en]:eq("' + index + '")').attr('disabled', true);
	$('input[name=in_notice_ch]:eq("' + index + '")').attr('disabled', true);
	$('input[name=in_notice_jp]:eq("' + index + '")').attr('disabled', true);
	
	$('div[name=div_notice_item_kr]:eq("' + index + '")').show();
	$('div[name=div_notice_item_kr_u_c]:eq("' + index + '")').hide();
	
	var up_notice_data = new Array();
	up_notice_data.push($('input[name=in_notice_kr_u]:eq("' + index + '")').val());
	up_notice_data.push($('input[name=in_notice_en]:eq("' + index + '")').val());
	up_notice_data.push($('input[name=in_notice_ch]:eq("' + index + '")').val());
	up_notice_data.push($('input[name=in_notice_jp]:eq("' + index + '")').val());
	
	if(!confirm("저장하시겠습니까?")) return;
	for(var i = 0 ; i < lang.length ; i++){
		var sendData = { language: lang[i], notice: up_notice_data[i], uid: uid }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/notice/update_notice_of_lang",
			async: false,
			data: JSON.stringify(sendData),
			success: function (result) {
				window.location.reload();
			},
			error: function () {
			}
		});
	}
}

function addNotice(){
	var add_notice_data = new Array();
	var kr_data = $('#in_notice_kr_add').val();
	var en_data = $('#in_notice_en_add').val();
	var ch_data = $('#in_notice_ch_add').val();
	var jp_data = $('#in_notice_jp_add').val();
	
	if(kr_data == "") return alert("한줄공지 한국어는 필수 입력입니다.");
	
	if(en_data == "") en_data = kr_data;
	if(ch_data == "") ch_data = kr_data;
	if(jp_data == "") jp_data = kr_data;
	
	add_notice_data.push(kr_data);
	add_notice_data.push(en_data);
	add_notice_data.push(ch_data);
	add_notice_data.push(jp_data);
	
	for(var i = 0 ; i < lang.length ; i++){
		var sendData = { language: lang[i], notice: add_notice_data[i] }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: SETTING_URL + "/notice/insert_notice_of_lang",
			async: false,
			data: JSON.stringify(sendData),
			success: function (result) {
				window.location.reload();
			},
			error: function () {
			}
		});
	}
}