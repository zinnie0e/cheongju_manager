$(document).ready(function(){
	initEvent();
	getEvent();
});

function initEvent() {
	$('#btn_event').css('background-color', "#0062bd");
}

var init_data;
//항목별 전역변수 생성
function getEvent(){
	var html_string = "";
	
	//ajax 전체 데이터 셀렉트, 초기 데이터 전역변수 init_data에 저장
	for(var i = 0; i < 3; i++){
		html_string +=
			'<div name="div_event_item" class="div_event_list_title" onclick="javascript:showEvent('+ i +');">' +
				'<a name="a_event_num" class="a_event_num">'+ i +'</a>' +
				'<a name="a_event_item_title" class="a_event_item_title">'+ i +'</a>' +
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
					'<input type="text" name="in_event_contents_title_name" class="in_event_contents">' +
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
				'<input type="number" name="in_event_contents_title_start_day" class="in_event_contents_day">' +
				'<a class="a_event_contents_time_separator">~</a>' +
				'<input type="number" name="in_event_contents_title_end_day" class="in_event_contents_day">' +
				'<a class="a_event_contents_time_separator" style="margin-left:30px; margin-right:30px;">/</a>' +
				'<input type="number" name="in_event_contents_title_start_time" class="in_event_contents_time">' +
				'<a class="a_event_contents_time_separator">~</a>' +
				'<input type="number" name="in_event_contents_title_end_time" class="in_event_contents_time">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="div_event_contents_title_place" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사장소</a>' +
				'<div class="div_event_detail_title_contents">' +
					'<input type="text" name="in_event_contents_title_plase" class="in_event_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="div_event_contents_title_manager" class="div_event_detail_title">' +
				'<a class="a_event_contents_title">* 행사문의 / 연락처</a>' +
				'<div class="div_event_detail_title_contents">' +
					'<input type="number" name="in_event_contents_title_manager" class="in_event_contents_manager">' +
					'<a class="a_event_contents_time_separator" style="margin-left:30px;">/</a>' +
					'<input type="number" name="in_event_contents_title_tel" class="in_event_contents_tel">' +
				'</div>' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div class="div_event_detail_divide_bold_line"></div>' +
			'<a class="a_event_detail_right" style="color:#ff5012;">* 항목은 필수 입력항목으로 리스트 내 노출됩니다.</a>' +
			'<div class="div_event_detail_divide_bold_line"></div>' +
			'<div name="a_event_contents_add_item1" class="div_event_detail_title">' +
				'<input type="text" name="in_event_contents_add_item1_title" class="in_event_contents_title">' +
				'<input type="text" name="in_event_contents_add_item1_body" class="in_event_contents">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_add_item2" class="div_event_detail_title">' +
				'<input type="text" name="in_event_contents_add_item2_title" class="in_event_contents_title">' +
				'<input type="text" name="in_event_contents_add_item2_body" class="in_event_contents">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_add_item3" class="div_event_detail_title">' +
				'<input type="text" name="in_event_contents_add_item3_title" class="in_event_contents_title">' +
				'<input type="text" name="in_event_contents_add_item3_body" class="in_event_contents">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_add_item4" class="div_event_detail_title">' +
				'<input type="text" name="in_event_contents_add_item4_title" class="in_event_contents_title">' +
				'<input type="text" name="in_event_contents_add_item4_body" class="in_event_contents">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_add_item5" class="div_event_detail_title">' +
				'<input type="text" name="in_event_contents_add_item5_title" class="in_event_contents_title">' +
				'<input type="text" name="in_event_contents_add_item5_body" class="in_event_contents">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_add_item6" class="div_event_detail_title">' +
				'<input type="text" name="in_event_contents_add_item6_title" class="in_event_contents_title">' +
				'<input type="text" name="in_event_contents_add_item6_body" class="in_event_contents">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_add_item7" class="div_event_detail_title">' +
				'<input type="text" name="in_event_contents_add_item7_title" class="in_event_contents_title">' +
				'<input type="text" name="in_event_contents_add_item7_body" class="in_event_contents">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_add_item8" class="div_event_detail_title">' +
				'<input type="text" name="in_event_contents_add_item8_title" class="in_event_contents_title">' +
				'<input type="text" name="in_event_contents_add_item8_body" class="in_event_contents">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_add_item9" class="div_event_detail_title">' +
				'<input type="text" name="in_event_contents_add_item9_title" class="in_event_contents_title">' +
				'<input type="text" name="in_event_contents_add_item9_body" class="in_event_contents">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div name="a_event_contents_add_item10" class="div_event_detail_title">' +
				'<input type="text" name="in_event_contents_add_item10_title" class="in_event_contents_title">' +
				'<input type="text" name="in_event_contents_add_item10_body" class="in_event_contents">' +
			'</div>' +
			'<div class="div_event_detail_divide_line"></div>' +
			'<div class="div_event_detail_divide_bold_line"></div>' +
			'<a class="a_event_detail_right" style="color:#999999;">항목명 및 내용을 목적에 맞게 자유롭게 입력할 수 있습니다.</a>' +
		'</div>';
	}
	
	$('#div_event_detail_contents').html(html_string);
	
	resetEvent();
}

function resetEvent(){
	$('div[name=div_event_item]').each(function(index){
		$('div[name=div_event_item]:eq("' + index + '")').css('background-color', '');
		
		$('a[name=a_event_num]:eq("' + index + '")').css('color', 'black');
		$('a[name=a_event_item_title]:eq("' + index + '")').css('color', 'black');
	});
	
	$('div[name=div_event_detail_contents]').each(function(index){
		//언어별 div에 init_data로 초기화
		
		for(var i = 0; i < 4; i++) {
			$('div[name=div_event_contents_found_cate'+ index +']:eq("' + i + '")').css('background-color', '');
		}
	});
	
	$('#btn_event_contents_insert').attr('onclick','').unbind('click');
	$('#btn_event_contents_cancel').attr('onclick','').unbind('click');
	
	$('#div_contents_detail').hide();
}

function showEvent(index){
	resetEvent();
	
	$('div[name=div_event_item]:eq("' + index + '")').css('background-color', '#0062bd');
	
	$('a[name=a_event_num]:eq("' + index + '")').css('color', 'white');
	$('a[name=a_event_item_title]:eq("' + index + '")').css('color', 'white');
	
	$('#div_contents_detail').show();
	
	$('#btn_event_contents_insert').val("저장");
	$('#btn_event_contents_insert').click(updateContent);
	$('#btn_event_contents_cancel').val("삭제");
	$('#btn_event_contents_cancel').click(deleteContent);
	
	checkLang(0);
}

function showAddEvent(){
	resetEvent();
	
	$('#div_contents_detail').show();
	
	$('#btn_event_contents_insert').val("등록");
	$('#btn_event_contents_insert').click(insertContent);
	$('#btn_event_contents_cancel').val("취소");
	$('#btn_event_contents_cancel').click(resetEvent);
	
	checkLang(0);
}

function checkLang(value){
	$('input[name=btn_event_lang]').each(function(index){
		$('input[name=btn_event_lang]:eq("' + index + '")').css('color', 'black');
		$('input[name=btn_event_lang]:eq("' + index + '")').css('background-color', '');
		
		$('div[name=div_event_detail_contents]:eq("' + index + '")').hide();
	});
	
	$('input[name=btn_event_lang]:eq("' + value + '")').css('color', 'white');
	$('input[name=btn_event_lang]:eq("' + value + '")').css('background-color', '#8da4b9');
	
	$('div[name=div_event_detail_contents]:eq("' + value + '")').show();
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