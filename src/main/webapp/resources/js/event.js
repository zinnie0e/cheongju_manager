$(document).ready(function(){
	initEventList(getCookie("login_info").auth);
	getEvent();
	initJson('korean');
});

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
    	object.value = object.value.slice(0, object.maxLength);
    }    
}

function getFoundation(val){
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

var global_json = null;
function initJson(language) {
	$.ajax({
		async: false,
		dataType: "json",
		url: "./resources/string/" + language + ".json",
		success: function (result) {
			global_json = result;
		}
	});
}

function initEventList(found_val) {
	$('#btn_event').css('background-color', "#0062bd");
	
	if(isAuthCheck) found_val = "%";
	var sendData = {found_val: found_val};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/event/select_event_of_found_list",
		data : JSON.stringify(sendData),
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
		url: MASTER_URL + "/event/select_event_all_lang_list",
		data : JSON.stringify(sendData),
		success: function (result) {
			init_event_data = result;
		}
	});
}

function initEventDetail(lang, uid){
	switch(lang){
		case 0:
			var lang_code = "kr";
			break;
		case 1:
			var lang_code = "en";
			break;
		case 2:
			var lang_code = "ch";
			break;
		case 3:
			var lang_code = "jp";
			break;
	}
	
	var sendData = {language: lang_code, event_uid: uid};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/event/select_event_detail_list",
		data : JSON.stringify(sendData),
		success: function (result) {
			init_event_detail_data = result;
		}
	});
}

function initEventMaxCount(){
	var max_event_count;
	var sendData = {found_auth: getCookie("login_info").auth};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/event/select_event_maxcount",
		data : JSON.stringify(sendData),
		success: function (result) {
			max_event_count = result;
		}
	});
	return max_event_count;
}

//항목별 전역변수 생성
var init_event_list;
var init_event_data;
var init_event_detail_data;

function getEvent(){
	if(isAuthCheck || initEventMaxCount() == init_event_list.length){ //마스터관리자  + 이벤트 최대갯수 시 = 이벤트 추가버튼 숨기기
		$('#btn_event_add').hide();
	}
	
	var html_string = "";
	
	var found_cate = 0;
	var event_num = 1;
	for(var i = 0; i < init_event_list.length; i++){
		if(found_cate != init_event_list[i]["found_cate"]){
			event_num = 1;
			html_string +=
				'<div id="a_event_foundation_info" class="a_event_foundation_info">'+ getFoundation(init_event_list[i]["found_cate"]) +'</div>';
			found_cate = init_event_list[i]["found_cate"];
		}
		
		html_string +=
			'<div name="div_event_item" class="div_event_list_title" onclick="javascript:showEvent('+ i +', '+ init_event_list[i]["uid"] +');">'+
				'<a name="a_event_num" class="a_event_num">'+ event_num +'</a>' +
				'<a name="a_event_item_title" class="a_event_item_title">'+ init_event_list[i]["title"] +'</a>' +
			'</div>' +
			'<div class="div_event_divide_line"></div>';
		
		event_num += 1;
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
						'<a class="a_event_contents_found_cate_text">공연</a>' +
					'</div>' +
					'<div class="div_event_contents_found_cate" onclick="javascript:checkFoundation('+ i +', 3);">' +
						'<div name="div_event_contents_found_cate'+ i +'" class="div_event_contents_found_cate_img"></div>' +
						'<a class="a_event_contents_found_cate_text">교육</a>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_title_name" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사명</a>' +
				'<div class="div_event_detail_title_contents">' +
					'<input type="text" name="in_event_contents_title_name" class="inputbox_esnt in_event_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>';
			
		if(i == 0){
			html_string +=
				'<div name="div_event_contents_title_poster" class="div_event_detail_title">' +
					'<a class="a_event_contents_title">* 이미지</a>' +
					'<div class="div_event_detail_title_contents">' +
						'<a id="a_event_contents_title_poster" class="a_event_contents_title_poster"></a>' +
						'<input type="file" accept="image/*" id="in_event_contents_title_poster" style="display:none" onchange="javascript:addPoster(this);">' +
						'<label id="btn_event_contents_title_poster" for="in_event_contents_title_poster">찾아보기</label>' +
					'</div>' +
				'</div>' +
				'<div class="div_event_detail_divide_line"></div>';
		}
	
		html_string +=
			'<div name="div_event_contents_title_time" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사기간 / 시간</a>' +
				'<input type="text" name="in_event_contents_title_start_day" class="inputbox_esnt in_event_contents_day" placeholder="19990101" maxlength="8" oninput="maxLengthCheck(this);">' +
				'<a class="a_event_contents_time_separator">~</a>' +
				'<input type="text" name="in_event_contents_title_end_day" class="inputbox_esnt in_event_contents_day" placeholder="19990101" maxlength="8" oninput="maxLengthCheck(this);">' +
				'<a class="a_event_contents_time_separator" style="margin-left:30px; margin-right:30px;">/</a>' +
				'<input type="text" name="in_event_contents_title_start_time_h" class="inputbox_esnt in_event_contents_time" placeholder="09" maxlength="2" oninput="maxLengthCheck(this);">' +
				'<a class="a_event_contents_time_separator">:</a>' +
				'<input type="text" name="in_event_contents_title_start_time_m" class="inputbox_esnt in_event_contents_time" placeholder="00" maxlength="2" oninput="maxLengthCheck(this);">' +
				'<a class="a_event_contents_time_separator">~</a>' +
				'<input type="text" name="in_event_contents_title_end_time_h" class="inputbox_esnt in_event_contents_time" placeholder="18" maxlength="2" oninput="maxLengthCheck(this);">' +
				'<a class="a_event_contents_time_separator">:</a>' +
				'<input type="text" name="in_event_contents_title_end_time_m" class="inputbox_esnt in_event_contents_time" placeholder="00" maxlength="2" oninput="maxLengthCheck(this);">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="div_event_contents_title_place" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사장소</a>' +
				'<div class="div_event_detail_title_contents">' +
					'<input type="text" name="in_event_contents_title_plase" class="inputbox_esnt in_event_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="div_event_contents_title_manager" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사문의 / 연락처</a>' +
				'<div class="div_event_detail_title_contents">' +
					'<input type="text" name="in_event_contents_title_manager" class="inputbox_esnt in_event_contents_manager">' +
					'<a class="a_event_contents_time_separator" style="margin-left:30px;">/</a>' +
					'<input type="text" name="in_event_contents_title_tel" class="inputbox_esnt in_event_contents_tel">' +
				'</div>' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div class="div_event_detail_divide_bold_line"></div>' +
			'<a class="a_event_detail_right" style="color:#ff5012;">* 항목은 필수 입력항목으로 리스트 내 노출됩니다.</a>' +
			'<div class="div_event_detail_divide_bold_line"></div>';
		for(var k = 0; k < 10; k++){
			html_string +=
				'<div name="a_event_contents_add_item'+ k +'" class="div_event_detail_title">' +
					'<input type="text" name="in_event_contents_add_item'+ k +'_title" class="inputbox in_event_contents_title" placeholder="항목명">' +
					'<input type="text" name="in_event_contents_add_item'+ k +'_body" class="inputbox in_event_contents" placeholder="상세 내용을 입력해주세요">' +
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
	
	var el = document.getElementsByClassName('inputbox_esnt'); //class name inputbox_esnt 내용 모두 초기화
	for(var i = 0; i < el.length; i++){
		el[i].value = '';
	}
	var el = document.getElementsByClassName('inputbox'); //class name inputbox 내용 모두 초기화
	for(var i = 0; i < el.length; i++){
		el[i].value = '';
	}
	
	$("#a_event_contents_title_poster").text(""); //poster text 초기화
	
	$('#btn_event_save').attr('onclick','').unbind('click');//
	$('#btn_event_cancleNdel').attr('onclick','').unbind('click');//
	
	$('#div_contents_detail').hide();
}

function setEvent(){
	$('div[name=div_event_detail_contents]').each(function(index){ 
		checkFoundation(index, init_event_data[index]["event_cate"])//행사분류
		$('input[name=in_event_contents_title_name]:eq("' + index + '")').val(init_event_data[index]["title"]); //행사명
		$('#a_event_contents_title_poster').html(init_event_data[index]["poster"]);//이미지
		$('input[name=in_event_contents_title_start_day]:eq("' + index + '")').val(init_event_data[index]["start_date"]); //행사기간
		$('input[name=in_event_contents_title_end_day]:eq("' + index + '")').val(init_event_data[index]["end_date"]);
		$('input[name=in_event_contents_title_start_time_h]:eq("' + index + '")').val(init_event_data[index]["start_time"].substring(0,2)); //시간
		$('input[name=in_event_contents_title_start_time_m]:eq("' + index + '")').val(init_event_data[index]["start_time"].substring(2,4)); 
		$('input[name=in_event_contents_title_end_time_h]:eq("' + index + '")').val(init_event_data[index]["end_time"].substring(0,2));
		$('input[name=in_event_contents_title_end_time_m]:eq("' + index + '")').val(init_event_data[index]["end_time"].substring(2,4));
		$('input[name=in_event_contents_title_plase]:eq("' + index + '")').val(init_event_data[index]["place"]); //행사장소
		$('input[name=in_event_contents_title_manager]:eq("' + index + '")').val(init_event_data[index]["manager"]); //행사문의
		$('input[name=in_event_contents_title_tel]:eq("' + index + '")').val(init_event_data[index]["tel"]); //연락처
		
		initEventDetail(index, init_event_data[index]["uid"]);
		
		for(var i = 0; i < init_event_detail_data.length ; i++){
			$('input[name=in_event_contents_add_item'+ i +'_title]:eq("' + index + '")').val(init_event_detail_data[i]["detail_title"]); //제목
			$('input[name=in_event_contents_add_item'+ i +'_body]:eq("' + index + '")').val(init_event_detail_data[i]["detail_body"]); //내용
		}
	});
}

function showEvent(index, uid){
	resetEvent();
	initEvent(uid);
	
	$('div[name=div_event_item]:eq("' + index + '")').css('background-color', '#0062bd');
	
	$('a[name=a_event_num]:eq("' + index + '")').css('color', 'white');
	$('a[name=a_event_item_title]:eq("' + index + '")').css('color', 'white');
	
	$('#div_contents_detail').show();
	
	$('#btn_event_preview').attr('onclick', 'showPreview(0)');
	$('#btn_event_save').attr('onclick', 'updateContent('+ uid +')');
	$('#btn_event_cancleNdel').css('background-image', 'url(./resources/image/btn_admin_삭제.png)'); //삭제
	$('#btn_event_cancleNdel').attr('onclick', 'deleteContent('+ uid +')');
	
	checkLang(0);
	if(init_event_data != null) setEvent(); 
}

function showAddEvent(){
	resetEvent();
	
	init_event_data = null;
	init_event_detail_data = null;
	
	$('#div_contents_detail').show();
	
	$('#btn_event_save').click(insertContent);//
	$('#btn_event_cancleNdel').css('background-image', 'url(./resources/image/btn_admin_취소.png)'); //취소
	$('#btn_event_cancleNdel').click(resetEvent);
	
	checkLang(0);
}

function checkFoundation(value, cate){
	$('div[name=div_event_contents_found_cate'+ value +']').each(function(index){
		$('div[name=div_event_contents_found_cate'+ value +']:eq("' + index + '")').css('background-color', '');
	});
	
	if(value == 0) $('div[name=div_event_contents_found_cate'+ value +']:eq("' + cate + '")').css('background-color', '#7fc83b');
	else $('div[name=div_event_contents_found_cate'+ value +']:eq("' + cate + '")').css('background-color', '#ebebeb');
}

//----------미리보기----------//
function showPreview(value){
	if(!checkEsnt(0)) return alert("필수항목을 모두 입력해야 미리보기를 할 수 있습니다.");
	
	$("#div_event_detail").show();
	$("#div_event_black").show();
	$('#div_contents_list').css('pointer-events', 'none');
	$('#div_contents_detail').css('pointer-events', 'none');
	
	//$('#div_contents').css('background-color', 'rgba(0, 0, 0, 0.7)')
	
	var per_date = $('input[name=in_event_contents_title_start_day]').val() + $('input[name=in_event_contents_title_end_day]').val();
	var per_time = $('input[name=in_event_contents_title_start_time_h]').val() + $('input[name=in_event_contents_title_start_time_m]').val() +
					$('input[name=in_event_contents_title_end_time_h]').val() + $('input[name=in_event_contents_title_end_time_m]').val();
	
	for(var i = 0; i < 4; i++) {
		if($('div[name=div_event_contents_found_cate0]:eq("'+ i +'")').css('background-color') == "rgb(127, 200, 59)"){
			var event_cate = i; //행사분류
			break;
		}
	}
	
	var html_string = "";
	html_string += 
		'<div style="position: absolute; width:110px; height: 20px; top: 25px; left: 30px; font-weight: 600; font-size: 20px;">미리보기</div>'+
		'<div style="position: absolute; width:40px; height: 40px; top: 25px; right: 35px;" onclick="javascript:closePreview();"></div>'+
		'<div style="position: absolute; width:820px; height: 30px; top: 65px; left: 40px;">'+
			'<div id="event_cate_detail"><img src="'+ global_json.event_categori[event_cate] +'"></img></div>'+ 
			'<div id="event_title_detail">'+ $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_name]').val() +'</div>'+
		'</div>'+
		'<div id="event_poster_detail"><img id="poster_preview" src="../external_image/promotion/'+ $("#a_event_contents_title_poster").text() +'" onerror="showPosterPreview()"></img></div>'+
		'<div style="position: absolute; width:497px; height: 90px; top:160px; left: 365px;">'+
			'<div class="event_sub_info_detail">'+
				'<div class="event_info_text">'+ global_json.event_info_title[0] +'</div>'+
				'<div class="event_info_body_detail">'+ getEventPeriod(per_date, per_time) +'</div>'+
			'</div>'+
			'<div class="event_sub_info_detail">'+
				'<div class="event_info_text">'+ global_json.event_info_title[1] +'</div>'+
				'<div class="event_info_body_detail">'+ $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_plase]').val() +'</div>'+
			'</div>'+
			'<div class="event_sub_info_detail">'+
				'<div class="event_info_text">'+ global_json.event_info_title[2] +'</div>'+
				'<div class="event_info_body_detail">'+ $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_manager]').val() + ' / ' + $('input[name=in_event_contents_title_tel]').val() +'</div>'+
			'</div>'+
		'</div>'+
		'<div id="div_detail_contents" style="position: absolute; width:497px; height: 450px; top:375px; left: 365px;"></div>';		
	
	var detail_json = new Array();
	for(var i = 0; i < 10; i++){
		var detail_title = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_add_item'+ i +'_title]').val();
		var detail_body = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_add_item'+ i +'_body]').val();
		
		if(detail_title != "" && detail_body != "") detail_json.push([detail_title, detail_body]);
	}
	
	var html_string2 = "";
	for(var i = 0; i < detail_json.length ; i++){//
		html_string2 +=
			'<div class="event_sub_info_detail">'+
				'<div class="event_info_text_detail">'+ detail_json[i][0] +'</div>'+
				'<div class="event_info_body_detail">'+ detail_json[i][1] +'</div>'+
			'</div>';
	}
	
	$('#div_event_detail').html(html_string);
	$('#div_detail_contents').html(html_string2);
	
	if(global_json.language == "japanese") $('.event_info_text').css('letter-spacing', '-2');
}

function closePreview(){
	$('#div_event_detail').hide();
	$("#div_event_black").hide();
	$('#div_contents_list').css('pointer-events', '')
	$('#div_contents_detail').css('pointer-events', '')
}

function getEventPeriod(per_date, per_time){
	return per_date.substring(0,4) + '.' + per_date.substring(4,6) + '.' + per_date.substring(6,8) + ' - ' + 
			per_date.substring(8,12) + '.' + per_date.substring(12,14) + '.' + per_date.substring(14,16) + ' / ' + 
			parseInt(per_time.substring(0,2)) + ':' + per_time.substring(2,4) + ' ~ ' + 
			parseInt(per_time.substring(4,6)) + ':' + per_time.substring(6,8);
}

//----------언어변경----------//
function checkLang(value){
	
	if(value != 0){ //ko가 아닌 다른 언어로 탭 변경시
		if(!checkEsnt(0)){
			alert("필수 사항을 모두 입력해주세요.");
			return;
		}
		
		makeLangJson(0);
		
		if((ko_json.start_day).length != 8 || (ko_json.end_day).length != 8 || (ko_json.start_time).length != 4 || (ko_json.end_time).length != 4) return alert("행사기간과 시간을 양식에 맞춰 입력해주세요.");
		
		if(value == 2 || value == 3){
			if(!checkEsnt(1)){
				alert("영어 탭의 양식을 먼저 완성해주세요");
				return;
			}else makeLangJson(1);
		}
		if(!checkEsnt(value)) setLangJson(value);
		else{
			if(value == 1){
				checkFoundation(value, ko_json.event_cate);//행사분류
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_day]').val(ko_json.start_day); //행사기간
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_day]').val(ko_json.end_day);
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_h]').val((ko_json.start_time).substring(0,2)); //시간
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_m]').val((ko_json.start_time).substring(2,4)); 
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_h]').val((ko_json.end_time).substring(0,2));
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_m]').val((ko_json.end_time).substring(2,4));
			}else{
				checkFoundation(value, en_json.event_cate);//행사분류
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_day]').val(en_json.start_day); //행사기간
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_day]').val(en_json.end_day);
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_h]').val((en_json.start_time).substring(0,2)); //시간
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_m]').val((en_json.start_time).substring(2,4)); 
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_h]').val((en_json.end_time).substring(0,2));
				$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_m]').val((en_json.end_time).substring(2,4));
			}
		}	
		$('div[name=div_event_detail_contents]:eq("'+ value +'") .div_event_contents_found_cate').attr('onclick','').unbind('click'); //한국 외 언어에서 행사분류 클릭x
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_day]').attr('disabled', true);
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_day]').attr('disabled', true);
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_h]').attr('disabled', true);
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_m]').attr('disabled', true);
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_h]').attr('disabled', true);
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_m]').attr('disabled', true);
	}	
	
	switch(value){
		case 0:
			lang_code = "kr";
			initJson('korean');
			break;
		case 1:
			lang_code = "en";
			initJson('english');
			break;
		case 2:
			lang_code = "ch";
			initJson('chinese');
			break;
		case 3:
			lang_code = "jp";
			initJson('japanese');
			break;
	}
	var lang = ["kr", "en", "ch", "jp"];
	$('div[name=btn_event_lang]').each(function(index){
		//비활성화
		$('div[name=btn_event_lang]:eq("' + index + '")').css('background-image', 'url(./resources/image/btn_admin_2_'+ lang[index] +'.png)');
		$('div[name=div_event_detail_contents]:eq("' + index + '")').hide();
	});
	//활성화
	$('div[name=btn_event_lang]:eq("' + value + '")').css('background-image', 'url(./resources/image/btn_admin_2_'+ lang_code +'2.png)');
	$('div[name=div_event_detail_contents]:eq("' + value + '")').show();
	
	$('#btn_event_preview').attr('onclick', 'showPreview('+ value +')');
}

function checkEsnt(val){ //빈 데이터 있음 false, 모두 입력 true
	var isFoundCateCheck;
	for(var i = 0; i < 4; i++) {
		if($('div[name=div_event_contents_found_cate'+ val +']:eq("'+ i +'")').css('background-color') == "rgb(127, 200, 59)"){
			isFoundCateCheck = true;
			break;
		}else{
			isFoundCateCheck = false;
		}
	}
	var isEnstCheck;
	var el = document.getElementsByClassName('inputbox_esnt'); 
	for(var i = (val * 10); i < ((val * 10) + 10); i++){ //0~7 
		if(el[i].value != ""){
			isEnstCheck = true;
		}else{
			isEnstCheck = false;
			break;
		}
	}
	if(val == 0){
		if(isEnstCheck == false || isFoundCateCheck == false || $("#a_event_contents_title_poster").text() == "") return false;
		else return true;
	}else{
		if(isEnstCheck == false) return false;
		else return true;
	}
}

var ko_json = new Object(); //한국어 저장 장소
var en_json = new Object(); //영어 저장 장소
function makeLangJson(value){ //0 //1
	var lang_json = new Object();
	for(var i = 0; i < 4; i++) {
		if($('div[name=div_event_contents_found_cate0]:eq("'+ i +'")').css('background-color') == "rgb(127, 200, 59)"){
			lang_json.event_cate = i; //행사분류
			break;
		}
	}	
	lang_json.title = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_name]').val(); //행사명
	lang_json.poster = $('div[name=div_event_detail_contents]:eq("'+ value +'") #a_event_contents_title_poster').text(); //이미지
	lang_json.start_day = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_day]').val(); //행사기간 시작날
	lang_json.end_day = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_day]').val(); //행사기간 끝날
	lang_json.start_time = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_h]').val() + 
							$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_m]').val(); //행사기간 시작시간
	lang_json.end_time = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_h]').val() + 
							$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_m]').val(); //행사기간 끝시간
	lang_json.place = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_plase]').val(); //행사장소
	lang_json.manager = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_manager]').val(); //행사문의
	lang_json.tel = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_tel]').val(); //연락처
	
	var detail_json = new Array();
	for(var i = 0; i < 10; i++){
		var detail_title = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_add_item'+ i +'_title]').val();
		var detail_body = $('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_add_item'+ i +'_body]').val();
		
		if(detail_title != "" && detail_body != "") detail_json.push([detail_title, detail_body]);
	}
	
	lang_json.detail_json = detail_json;
	
	if(value == 0) ko_json= lang_json;
	if(value == 1) en_json= lang_json;
}

function setLangJson(value){ 
	if(value == 1){ //1 ko_json 
		checkFoundation(value, ko_json.event_cate);//행사분류
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_name]').val(ko_json.title); //행사명
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_day]').val(ko_json.start_day); //행사기간
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_day]').val(ko_json.end_day);
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_h]').val((ko_json.start_time).substring(0,2)); //시간
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_m]').val((ko_json.start_time).substring(2,4)); 
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_h]').val((ko_json.end_time).substring(0,2));
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_m]').val((ko_json.end_time).substring(2,4));
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_plase]').val(ko_json.place); //행사장소
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_manager]').val(ko_json.manager); //행사문의
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_tel]').val(ko_json.tel); //연락처
		
		for(var i = 0; i < ko_json.detail_json.length ; i++){
			$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_add_item'+ i +'_title]').val(ko_json.detail_json[i][0]); //제목
			$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_add_item'+ i +'_body]').val(ko_json.detail_json[i][1]); //내용
		}
	}else{ //2,3 en_json
		checkFoundation(value, en_json.event_cate)//행사분류
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_name]').val(en_json.title) //행사명
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_day]').val(en_json.start_day) //행사기간
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_day]').val(en_json.end_day) 
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_h]').val((en_json.start_time).substring(0,2)); //시간
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_start_time_m]').val((en_json.start_time).substring(2,4)); 
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_h]').val((en_json.end_time).substring(0,2));
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_end_time_m]').val((en_json.end_time).substring(2,4));
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_plase]').val(en_json.place) //행사장소
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_manager]').val(en_json.manager) //행사문의
		$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_title_tel]').val(en_json.tel) //연락처
		
		for(var i = 0; i < en_json.detail_json.length ; i++){
			$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_add_item'+ i +'_title]').val(en_json.detail_json[i][0]); //제목
			$('div[name=div_event_detail_contents]:eq("'+ value +'") input[name=in_event_contents_add_item'+ i +'_body]').val(en_json.detail_json[i][1]); //내용
		}
	}
}

//----------데이터 수정, 삽입, 삭제----------//
function updateContent(uid) { 
	if(!confirm("수정하시겠습니까?")) return;
	
	var isUpdateCheck = false;
	for(var i = 0; i < 4; i++) {
		if($('div[name=div_event_contents_found_cate0]:eq("'+ i +'")').css('background-color') == "rgb(127, 200, 59)"){
			var event_cate = i; //행사분류
			break;
		}
	}
	
	if($('#in_event_contents_title_poster')[0].files[0] != null) uploadPoster(event_cate);
	else poster_name = $('#a_event_contents_title_poster').text();
	
	setTimeout(function(){
		var lang = ["kr", "en", "ch", "jp"];
		$('div[name=div_event_detail_contents]').each(function(index){ 
			var sendData = {
				language: lang[index],
				event_cate: event_cate,
				title: $('input[name=in_event_contents_title_name]:eq("' + index + '")').val(),
				start_date: $('input[name=in_event_contents_title_start_day]:eq("' + index + '")').val(),
				end_date: $('input[name=in_event_contents_title_end_day]:eq("' + index + '")').val(),
				start_time: $('input[name=in_event_contents_title_start_time_h]:eq("' + index + '")').val() + $('input[name=in_event_contents_title_start_time_m]:eq("' + index + '")').val(),
				end_time: $('input[name=in_event_contents_title_end_time_h]:eq("' + index + '")').val() + $('input[name=in_event_contents_title_end_time_m]:eq("' + index + '")').val(),
				place: $('input[name=in_event_contents_title_plase]:eq("' + index + '")').val(),
				manager: $('input[name=in_event_contents_title_manager]:eq("' + index + '")').val(),
				tel: $('input[name=in_event_contents_title_tel]:eq("' + index + '")').val(),
				poster: poster_name,
				uid: uid
			}
			
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: MASTER_URL + "/event/update_event",
				async: false,
				data: JSON.stringify(sendData),
				success: function (result) {
					isUpdateCheck = result;
					if(isUpdateCheck == false) alert("데이터 수정 실패");
				},
				error: function () {
				}
			});
			
			var detail_json = new Array();
			for(var i = 0; i < 10; i++){
				var detail_title = $('div[name=div_event_detail_contents]:eq("'+ index +'") input[name=in_event_contents_add_item'+ i +'_title]').val();
				var detail_body = $('div[name=div_event_detail_contents]:eq("'+ index +'") input[name=in_event_contents_add_item'+ i +'_body]').val();
				
				if(detail_title != "" && detail_body != "") detail_json.push([detail_title, detail_body]);
			}
			
			var sendData = { language: lang[index], event_uid: uid }
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: MASTER_URL + "/event/delete_event_detail",
				async: false,
				data: JSON.stringify(sendData),
				success: function (result) {
				},
				error: function () {
				}
			});
			
			for(var i = 0; i < detail_json.length ; i++){
				var sendData = {
					language: lang[index],
					detail_title: detail_json[i][0],
					detail_body: detail_json[i][1],
					event_uid: uid
				}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: MASTER_URL + "/event/insert_event_detail",
					async: false,
					data: JSON.stringify(sendData),
					success: function (result) {
					},
					error: function () {
					}
				});
			}
		});
	},1000);
	
	setTimeout(function(){
		window.location.reload();
	},1000);
	
}

function deleteContent(uid) {
	if(!confirm("삭제하시겠습니까?")) return;
	
	var isDeleteCheck = false;
	var lang = ["kr", "en", "ch", "jp"];
	for(var i = 0; i < lang.length ; i++){
		var sendData = { language: lang[i], uid: uid }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: MASTER_URL + "/event/delete_event",
			async: false,
			data: JSON.stringify(sendData),
			success: function (result) {
			},
			error: function () {
			}
		});	
		
		var sendData = { language: lang[i], event_uid: uid }
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: MASTER_URL + "/event/delete_event_detail",
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

function insertContent() { 
	for(var i = 0; i < 4; i++){
		if(!checkEsnt(i)) return alert("언어별 모든 양식에 데이터가 입력되었는지 확인바랍니다.");
	}
	
	if(($('input[name=in_event_contents_title_start_day]:eq("0")').val()).length != 8 || 
			($('input[name=in_event_contents_title_end_day]:eq("0")').val()).length != 8 || 
			($('input[name=in_event_contents_title_start_time_h]:eq("0")').val()).length != 2 || 
			($('input[name=in_event_contents_title_start_time_m]:eq("0")').val()).length != 2 || 
			($('input[name=in_event_contents_title_end_time_h]:eq("0")').val()).length != 2 || 
			($('input[name=in_event_contents_title_end_time_m]:eq("0")').val()).length != 2) return alert("행사기간과 시간을 양식에 맞춰 입력해주세요.");
	
	if(!confirm("저장하시겠습니까?")) return;
	var isInsertCheck = false;
	
	var new_uid;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: MASTER_URL + "/event/select_event_maxuid",
		async: false,
		success: function (result) {
			new_uid = result + 1;
		}
	});
	
	var event_cate;
	for(var i = 0; i < 4; i++) {
		if($('div[name=div_event_contents_found_cate0]:eq("'+ i +'")').css('background-color') == "rgb(127, 200, 59)"){
			event_cate = i; //시설분류
			break;
		}
	}	
		
	uploadPoster(event_cate);
	setTimeout(function(){
		var lang = ["kr", "en", "ch", "jp"];
		$('div[name=div_event_detail_contents]').each(function(index){ 
			var sendData = {
				language: lang[index],
				found_cate: getCookie("login_info").auth,
				event_cate: event_cate,
				title: $('input[name=in_event_contents_title_name]:eq("' + index + '")').val(),
				start_date: $('input[name=in_event_contents_title_start_day]:eq("0")').val(),
				end_date: $('input[name=in_event_contents_title_end_day]:eq("0")').val(),
				start_time: $('input[name=in_event_contents_title_start_time_h]:eq("0")').val() + $('input[name=in_event_contents_title_start_time_m]:eq("0")').val(),
				end_time: $('input[name=in_event_contents_title_end_time_h]:eq("0")').val() + $('input[name=in_event_contents_title_end_time_m]:eq("0")').val(),
				place: $('input[name=in_event_contents_title_plase]:eq("' + index + '")').val(),
				manager: $('input[name=in_event_contents_title_manager]:eq("' + index + '")').val(),
				tel: $('input[name=in_event_contents_title_tel]:eq("' + index + '")').val(),
				poster: poster_name,
				uid: new_uid
			}
			
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: MASTER_URL + "/event/insert_event",
				async: false,
				data: JSON.stringify(sendData),
				success: function (result) {
					isInsertCheck = result;
					if(!isInsertCheck) alert("데이터 입력 실패");
				},
				error: function () {
				}
			});
			
			var detail_json = new Array();
			for(var i = 0; i < 10; i++){
				var detail_title = $('div[name=div_event_detail_contents]:eq("'+ index +'") input[name=in_event_contents_add_item'+ i +'_title]').val();
				var detail_body = $('div[name=div_event_detail_contents]:eq("'+ index +'") input[name=in_event_contents_add_item'+ i +'_body]').val();
				
				if(detail_title != "" && detail_body != "") detail_json.push([detail_title, detail_body]);
			}
			
			for(var i = 0; i < detail_json.length ; i++){
				var sendData = {
					language: lang[index],
					detail_title: detail_json[i][0],
					detail_body: detail_json[i][1],
					event_uid: new_uid
				}
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8;",
					dataType: "json",
					url: MASTER_URL + "/event/insert_event_detail",
					async: false,
					data: JSON.stringify(sendData),
					success: function (result) {
						isInsertCheck = result;
						if(!isInsertCheck) alert("데이터 입력 실패");
					},
					error: function () {
					}
				});
			}
		});
	},1000);
	
	setTimeout(function(){
		window.location.reload();
	},1000);
}

//----------포스터----------//
var poster_pre_src;
function addPoster(input) {
	var file_value = $('#in_event_contents_title_poster').val().split("\\");
	var file_name = file_value[file_value.length - 1];
	
	$('#a_event_contents_title_poster').html(file_name);
	
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			poster_pre_src = e.target.result;
		}
		reader.readAsDataURL(input.files[0]);
	}
}

function showPosterPreview() {
	$("#poster_preview").attr("src", poster_pre_src);
}

var poster_name;
function uploadPoster(event_cate) {
	//logNow($('#in_event_contents_title_poster')[0].files[0] + "/" + $('#in_event_contents_title_poster').val());
	
	var namecode = getCookie("login_info").auth + '' + event_cate;
	
	var formData = new FormData();
	formData.append("files", $('#in_event_contents_title_poster')[0].files[0]);
	formData.append("namecode", namecode);

	$.ajax({ //마스터 주소
		url : MASTER_URL + "/event/upload_poster",
		processData : false,
		contentType : false,
		data : formData,
		type : 'POST',
		success : function(result) {
			if(result == "") alert("이미지 업로드 실패");
			else poster_name = result;
		}
	});
	
	/*$.ajax({ //슬레이브 주소
		url : SLAVE_URL + "/event/upload_poster",
		processData : false,
		contentType : false,
		data : formData,
		type : 'POST',
		success : function(result) {
			if(result == "") alert("이미지 업로드 실패");
			else logo_name = result;
		}
	});*/
}