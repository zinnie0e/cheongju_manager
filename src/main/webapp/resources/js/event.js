$(document).ready(function(){
	initEventList();
	getEvent();
});

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
    	object.value = object.value.slice(0, object.maxLength);
    }    
}

function getFoundation(val){
	logNow(val)
	switch(val){
		case 1: 
			return "원더아리아";
		case 2: 
			return "충북시청자미디어센터";
		case 3: 
			return "국립현대미술관";
		case 4: 
			return "청주시문화산업진흥재단";
		case 5: 
			return "청주열린도서관";
	}
}

function initEventList() {
	$('#btn_event').css('background-color', "#0062bd");
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/event/select_event_of_found_list",
		async: false,
		success: function (result) {
			init_event_list = result;
		}
	});
}

function initEvent(uid){
	var sendData = {uid: uid};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/event/select_event_all_lang_list",
		data : JSON.stringify(sendData),
		success: function (result) {
			init_event_data = result;
		}
	});
}

function initEventDetail(lang_code, uid){
	var sendData = {language: lang_code, event_uid: uid};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/event/select_event_detail_list",
		data : JSON.stringify(sendData),
		success: function (result) {
			init_event_detail_data = result;
		}
	});
}

//항목별 전역변수 생성
var init_event_list;
var init_event_data;
var init_event_detail_data;

function getEvent(){ //ajax 전체 데이터 셀렉트, 초기 데이터 전역변수 init_data에 저장
	if(isAuthCheck){
		$('#btn_event_add').hide();
	}
	
	var html_string = "";
	
	var found_cate = 0;
	for(var i = 0; i < init_event_list.length; i++){
		if(found_cate != init_event_list[i]["found_cate"]){
			html_string +=
				'<div id="a_event_foundation_info" class="a_event_foundation_info">'+ getFoundation(init_event_list[i]["found_cate"]) +'</div>';
			found_cate = init_event_list[i]["found_cate"];
		}
		
		html_string +=
			'<div name="div_event_item" class="div_event_list_title" onclick="javascript:showEvent('+ i +', '+ init_event_list[i]["uid"] +');">'+
				'<a name="a_event_num" class="a_event_num">'+ i +'</a>' +
				'<a name="a_event_item_title" class="a_event_item_title">'+ init_event_list[i]["title"] +'</a>' +
			'</div>' +
			'<div class="div_event_divide_line"></div>';
	}
	
	$('#div_event_list_contents').html(html_string);
	
	html_string = "";
	for(var i = 0; i < 4; i++) {
		html_string +=
		'<div name="div_event_detail_contents" class="div_event_detail">' +
			'<div name="div_event_contents_title_found_cate" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사분류</a>' +
				'<div class="div_event_detail_title_contents">' +
					'<div class="div_event_contents_found_cate" onclick="javascript:checkFoundation('+ i +', 0);">' +
						'<div name="div_event_contents_found_cate'+ i +'" class="div_event_contents_found_cate_img"></div>' +
						'<a class="a_event_contents_found_cate_text">이벤트</a>' +
					'</div>' +
					'<div class="div_event_contents_found_cate" onclick="javascript:checkFoundation('+ i +', 1);">' +
						'<div name="div_event_contents_found_cate'+ i +'" class="div_event_contents_found_cate_img"></div>' +
						'<a class="a_event_contents_found_cate_text">전시</a>' +
					'</div>' +
					'<div class="div_event_contents_found_cate" onclick="javascript:checkFoundation('+ i +', 2);">' +
						'<div name="div_event_contents_found_cate'+ i +'" class="div_event_contents_found_cate_img"></div>' +
						'<a class="a_event_contents_found_cate_text">교육</a>' +
					'</div>' +
					'<div class="div_event_contents_found_cate" onclick="javascript:checkFoundation('+ i +', 3);">' +
						'<div name="div_event_contents_found_cate'+ i +'" class="div_event_contents_found_cate_img"></div>' +
						'<a class="a_event_contents_found_cate_text">공연</a>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_title_name" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사명</a>' +
				'<div class="div_event_detail_title_contents">' +
					'<input type="text" name="in_event_contents_title_name" class="inputbox in_event_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>';
			
		if(i == 0){
			html_string +=
				'<div name="div_event_contents_title_poster" class="div_event_detail_title">' +
					'<a class="a_event_contents_title">* 이미지</a>' +
					'<div class="div_event_detail_title_contents">' +
						'<a id="a_event_contents_title_poster" class="a_event_contents_title_poster"></a>' +
						'<input type="file" accept="image/*" id="in_event_contents_title_poster" style="display:none" onchange="javascript:addPoster();">' +
						'<label id="btn_event_contents_title_poster" for="in_event_contents_title_poster">찾아보기</label>' +
					'</div>' +
				'</div>' +
				'<div class="div_event_detail_divide_line"></div>';
		}
	
		html_string +=
			'<div name="div_event_contents_title_time" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사기간 / 시간</a>' +
				'<input type="number" name="in_event_contents_title_start_day" class="inputbox in_event_contents_day" maxlength="8" oninput="maxLengthCheck(this);">' +
				'<a class="a_event_contents_time_separator">~</a>' +
				'<input type="number" name="in_event_contents_title_end_day" class="inputbox in_event_contents_day" maxlength="8" oninput="maxLengthCheck(this);">' +
				'<a class="a_event_contents_time_separator" style="margin-left:30px; margin-right:30px;">/</a>' +
				'<input type="number" name="in_event_contents_title_start_time" class="inputbox in_event_contents_time" maxlength="4" oninput="maxLengthCheck(this);">' +
				'<a class="a_event_contents_time_separator">~</a>' +
				'<input type="number" name="in_event_contents_title_end_time" class="inputbox in_event_contents_time" maxlength="4" oninput="maxLengthCheck(this);">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="div_event_contents_title_place" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사장소</a>' +
				'<div class="div_event_detail_title_contents">' +
					'<input type="text" name="in_event_contents_title_plase" class="inputbox in_event_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="div_event_contents_title_manager" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사문의 / 연락처</a>' +
				'<div class="div_event_detail_title_contents">' +
					'<input type="text" name="in_event_contents_title_manager" class="inputbox in_event_contents_manager">' +
					'<a class="a_event_contents_time_separator" style="margin-left:30px;">/</a>' +
					'<input type="text" name="in_event_contents_title_tel" class="inputbox in_event_contents_tel">' +
				'</div>' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div class="div_event_detail_divide_bold_line"></div>' +
			'<a class="a_event_detail_right" style="color:#ff5012;">* 항목은 필수 입력항목으로 리스트 내 노출됩니다.</a>' +
			'<div class="div_event_detail_divide_bold_line"></div>';
		for(var k = 0; k < 10; k++){
			html_string +=
				'<div name="a_event_contents_add_item'+ k +'" class="div_event_detail_title">' +
					'<input type="text" name="in_event_contents_add_item'+ k +'_title" class="inputbox in_event_contents_title">' +
					'<input type="text" name="in_event_contents_add_item'+ k +'_body" class="inputbox in_event_contents">' +
				'</div>' +
				'<div class="div_event_detail_divide_line"></div>';
		}
		html_string +=
			'<div class="div_event_detail_divide_bold_line"></div>' +
			'<a class="a_event_detail_right" style="color:#999999;">항목명 및 내용을 목적에 맞게 자유롭게 입력할 수 있습니다.</a>' +
		'</div>';
	}
	
	$('#div_event_detail_contents').html(html_string);
	resetEvent();
}

function resetEvent(){
	$('div[name=div_event_item]').each(function(index){ //행사 목록 초기화
		$('div[name=div_event_item]:eq("' + index + '")').css('background-color', '');
		
		$('a[name=a_event_num]:eq("' + index + '")').css('color', 'black');
		$('a[name=a_event_item_title]:eq("' + index + '")').css('color', 'black');
	});
	
	$('div[name=div_event_detail_contents]').each(function(index){ //행사분류 초기화
		for(var i = 0; i < 4; i++) {
			$('div[name=div_event_contents_found_cate'+ index +']:eq("' + i + '")').css('background-color', '');
		}
	});
	
	var el = document.getElementsByClassName('inputbox'); //class name inputbox 내용 모두 초기화
	for(var i = 0; i < el.length; i++){
		el[i].value = '';
	}
	
	$('#btn_event_save').attr('onclick','').unbind('click');//
	$('#btn_event_cancleNdel').attr('onclick','').unbind('click');//
	
	$('#div_contents_detail').hide();
}

function setEvent(index){
	checkFoundation(0, init_event_data[index]["event_cate"])//행사분류
	$('input[name=in_event_contents_title_name]').val(init_event_data[index]["title"]); //행사명
	$('#a_event_contents_title_poster').html(init_event_data[index]["poster"]);//이미지
	$('input[name=in_event_contents_title_start_day]').val(init_event_data[index]["start_date"]); //행사기간
	$('input[name=in_event_contents_title_end_day]').val(init_event_data[index]["end_date"]);
	$('input[name=in_event_contents_title_start_time]').val(init_event_data[index]["start_time"]); //시간
	$('input[name=in_event_contents_title_end_time]').val(init_event_data[index]["end_time"]);
	$('input[name=in_event_contents_title_plase]').val(init_event_data[index]["place"]); //행사장소
	$('input[name=in_event_contents_title_manager]').val(init_event_data[index]["manager"]); //행사문의
	$('input[name=in_event_contents_title_tel]').val(init_event_data[index]["tel"]); //연락처
	
	initEventDetail(lang_code, init_event_data[index]["uid"]);
	
	for(var i = 0; i < init_event_detail_data.length ; i++){
		$('input[name=in_event_contents_add_item'+ i +'_title]').val(init_event_detail_data[i]["detail_title"]); //제목
		$('input[name=in_event_contents_add_item'+ i +'_body]').val(init_event_detail_data[i]["detail_body"]); //내용
	}
}

function showEvent(index, uid){
	resetEvent();
	
	initEvent(uid);
	
	$('div[name=div_event_item]:eq("' + index + '")').css('background-color', '#0062bd');
	
	$('a[name=a_event_num]:eq("' + index + '")').css('color', 'white');
	$('a[name=a_event_item_title]:eq("' + index + '")').css('color', 'white');
	
	$('#div_contents_detail').show();
	
	$('#btn_event_save').click(updateContent);
	$('#btn_event_cancleNdel').css('background-image', 'url(./resources/image/btn_admin_삭제.png)'); //삭제
	$('#btn_event_cancleNdel').click(deleteContent);
	
	checkLang(0);
}

function showAddEvent(){
	resetEvent();
	
	$('#div_contents_detail').show();
	
	$('#btn_event_save').click(insertContent);//
	$('#btn_event_cancleNdel').css('background-image', 'url(./resources/image/btn_admin_취소.png)'); //취소
	$('#btn_event_cancleNdel').click(resetEvent);
	
	checkLang(0);
}

var lang_code;
function checkLang(value){//여기 수정
	switch(value){
		case 0:
			lang_code = "kr";
			break;
		case 1:
			lang_code = "en";
			break;
		case 2:
			lang_code = "ch";
			break;
		case 3:
			lang_code = "jp";
			break;
	}
	var lang = ["kr", "en", "ch", "jp"];
	$('div[name=btn_event_lang]').each(function(index){//0123
		//비활성화
		$('div[name=btn_event_lang]:eq("' + index + '")').css('background-image', 'url(./resources/image/btn_admin_2_'+ lang[index] +'.png)');
		$('div[name=div_event_detail_contents]:eq("' + index + '")').hide();
	});
	//활성화
	$('div[name=btn_event_lang]:eq("' + value + '")').css('background-image', 'url(./resources/image/btn_admin_2_'+ lang_code +'2.png)');
	$('div[name=div_event_detail_contents]:eq("' + value + '")').show();
	
	setEvent(value);
}

function checkFoundation(value, cate){
	$('div[name=div_event_contents_found_cate'+ value +']').each(function(index){
		$('div[name=div_event_contents_found_cate'+ value +']:eq("' + index + '")').css('background-color', '');
	});
	
	$('div[name=div_event_contents_found_cate'+ value +']:eq("' + cate + '")').css('background-color', '#7fc83b');
}

function addPoster() {
	var file_value = $('#in_event_contents_title_poster').val().split("\\");
	var file_name = file_value[file_value.length - 1];
	
	$('#a_event_contents_title_poster').html(file_name);
}

function updateContent() {
	
	uploadPoster();
}

function uploadPoster() {
	logNow($('#in_event_contents_title_poster').val());
	logNow($('#in_event_contents_title_poster')[0].files[0] + "/" + $('#in_event_contents_title_poster').val());
}

function deleteContent() {
}

function insertContent() {
	logNow($('#in_event_contents_title_poster').val());
	logNow($('#in_event_contents_title_poster')[0].files[0] + "/" + $('#in_event_contents_title_poster').val());
}