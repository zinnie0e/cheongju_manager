$(document).ready(function(){
	initCompany();
	getCompany();
});

function initCompany() {
	$('#btn_company').css('background-color', "#0062bd");
}

var init_data;
//항목별 전역변수 생성
function getCompany(){
	var html_string = "";
	
	//ajax 전체 데이터 셀렉트, 초기 데이터 전역변수 init_data에 저장
	for(var i = 0; i < 3; i++){
		html_string +=
			'<div name="div_company_item" class="div_company_list_title" onclick="javascript:showCompany('+ i +');">' +
				'<a name="a_company_num" class="a_company_num">'+ i +'</a>' +
				'<a name="a_company_item_title" class="a_company_item_title">'+ i +'</a>' +
			'</div>' +
			'<div class="div_company_divide_line"></div>';
	}
	
	$('#div_company_list_contents').html(html_string);
	
	html_string = "";
	
	for(var i = 0; i < 4; i++) {
		html_string +=
		'<div name="div_company_detail_contents" class="div_company_detail">' +
			'<div name="div_company_contents_title_com_cate" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 시설분류</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<div class="div_company_contents_com_cate" onclick="javascript:checkFoundation('+ i +', 0);">' +
						'<div name="div_company_contents_com_cate'+ i +'" class="div_company_contents_com_cate_img"></div>' +
						'<a class="a_company_contents_com_cate_text">주요시설</a>' +
					'</div>' +
					'<div class="div_company_contents_com_cate" onclick="javascript:checkFoundation('+ i +', 1);">' +
						'<div name="div_company_contents_com_cate'+ i +'" class="div_company_contents_com_cate_img"></div>' +
						'<a class="a_company_contents_com_cate_text">입주업체</a>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="a_company_contents_title_name" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 기업명</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_name" class="in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="a_company_contents_title_room" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 입주호실</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_room" class="in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>';
			
			if(i == 0){
				html_string +=
					'<div name="div_company_contents_title_logo" class="div_company_detail_title">' +
						'<a class="a_company_contents_title_option">기업로고</a>' +
						'<div class="div_company_detail_title_contents">' +
							'<a id="a_company_contents_title_logo" class="a_company_contents_title_logo"></a>' +
							'<input type="file" accept="image/*" id="in_company_contents_title_logo" style="display:none" onchange="javascript:addLogo();">' +
							'<label id="btn_company_contents_title_logo" for="in_company_contents_title_logo">찾아보기</label>' +
						'</div>' +
					'</div>' +
					'<div class="div_company_detail_divide_line"></div>';
			}
	
			html_string +=
			'<div name="div_company_contents_title_owner" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 대표자</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_owner" class="in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="div_company_contents_title_busi" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 사업분야</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_busi'+ i +'" class="in_company_contents_busi">' +
					'<div class="in_company_contents_busi_separator"></div>' +
					'<input type="text" name="in_company_contents_busi'+ i +'" class="in_company_contents_busi">' +
					'<div class="in_company_contents_busi_separator"></div>' +
					'<input type="text" name="in_company_contents_busi'+ i +'" class="in_company_contents_busi">' +
					'<div class="in_company_contents_busi_separator"></div>' +
					'<input type="text" name="in_company_contents_busi'+ i +'" class="in_company_contents_busi">' +
					'<div class="in_company_contents_busi_separator"></div>' +
					'<input type="text" name="in_company_contents_busi'+ i +'" class="in_company_contents_busi">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="div_company_contents_title_item" class="div_company_detail_title">' +
				'<a class="a_company_contents_title_option">아이템</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="number" name="in_company_contents_item" class="in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="div_company_contents_title_tel" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 연락처</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_tel" class="in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="div_company_contents_title_email" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* e-mail</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_email" class="in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="div_company_contents_title_homepage" class="div_company_detail_title">' +
				'<a class="a_company_contents_title_option">홈페이지</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_homepage" class="in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div class="div_company_detail_divide_bold_line"></div>' +
			'<a class="a_company_detail_right" style="color:#ff5012;">* 항목은 필수 입력항목으로 리스트 내 노출됩니다.</a>' +
			'<div class="div_company_detail_divide_bold_line"></div>' +
		'</div>';
	}
	
	$('#div_company_detail_contents').html(html_string);
	
	resetCompany();
}

function resetCompany(){
	$('div[name=div_company_item]').each(function(index){
		$('div[name=div_company_item]:eq("' + index + '")').css('background-color', '');
		
		$('a[name=a_company_num]:eq("' + index + '")').css('color', 'black');
		$('a[name=a_company_item_title]:eq("' + index + '")').css('color', 'black');
	});
	
	$('div[name=div_company_detail_contents]').each(function(index){
		//언어별 div에 init_data로 초기화
		
		for(var i = 0; i < 2; i++) {
			$('div[name=div_company_contents_com_cate'+ index +']:eq("' + i + '")').css('background-color', '');
		}
	});
	
	$('#btn_company_contents_insert').attr('onclick','').unbind('click');
	$('#btn_company_contents_cancel').attr('onclick','').unbind('click');
	
	$('#div_contents_detail').hide();
}

function showCompany(index){
	resetCompany();
	
	$('div[name=div_company_item]:eq("' + index + '")').css('background-color', '#0062bd');
	
	$('a[name=a_company_num]:eq("' + index + '")').css('color', 'white');
	$('a[name=a_company_item_title]:eq("' + index + '")').css('color', 'white');
	
	$('#div_contents_detail').show();
	
	$('#btn_company_contents_insert').val("저장");
	$('#btn_company_contents_insert').click(updateContent);
	$('#btn_company_contents_cancel').val("삭제");
	$('#btn_company_contents_cancel').click(deleteContent);
	
	checkLang(0);
	//checkFlow();
}

function showAddCompany(){
	resetCompany();
	
	$('#div_contents_detail').show();
	
	$('#btn_company_contents_insert').val("등록");
	$('#btn_company_contents_insert').click(insertContent);
	$('#btn_company_contents_cancel').val("취소");
	$('#btn_company_contents_cancel').click(resetCompany);
	
	checkLang(0);
	checkFlow(0);
}

function checkFlow(value){
	$('input[name=btn_company_flow]').each(function(index){
		$('input[name=btn_company_flow]:eq("' + index + '")').css('color', 'black');
		$('input[name=btn_company_flow]:eq("' + index + '")').css('background-color', '');
	});
	
	$('input[name=btn_company_flow]:eq("' + value + '")').css('color', 'white');
	$('input[name=btn_company_flow]:eq("' + value + '")').css('background-color', '#8da4b9');
	
	$('#img_company_pin').hide();
	$('#img_company_pin').css("top", 0);
	$('#img_company_pin').css("left", 0);
	
	$('#img_company_map').attr("src", './resources/image/industry_map_' + (value + 1) + 'f.png');
}

function checkLoc(){
	var x = event.offsetX;
	var y = event.offsetY;
	
	$('#img_company_pin').show();
	$('#img_company_pin').css("top", y - 70);
	$('#img_company_pin').css("left", x - 25);
	logNow(x + "//" + y);
}

function checkLang(value){
	$('input[name=btn_company_lang]').each(function(index){
		$('input[name=btn_company_lang]:eq("' + index + '")').css('color', 'black');
		$('input[name=btn_company_lang]:eq("' + index + '")').css('background-color', '');
		
		$('div[name=div_company_detail_contents]:eq("' + index + '")').hide();
	});
	
	$('input[name=btn_company_lang]:eq("' + value + '")').css('color', 'white');
	$('input[name=btn_company_lang]:eq("' + value + '")').css('background-color', '#8da4b9');
	
	$('div[name=div_company_detail_contents]:eq("' + value + '")').show();
}

function checkFoundation(lang, cate){
	$('div[name=div_company_contents_com_cate'+ lang +']').each(function(index){
		$('div[name=div_company_contents_com_cate'+ lang +']:eq("' + index + '")').css('background-color', '');
	});
	
	$('div[name=div_company_contents_com_cate'+ lang +']:eq("' + cate + '")').css('background-color', '#7fc83b');
}

function addLogo() {
	var file_value = $('#in_company_contents_title_logo').val().split("\\");
	var file_name = file_value[file_value.length - 1];
	
	$('#a_company_contents_title_logo').html(file_name);
}

function updateContent() {
	
	uploadPoster();
}

function uploadPoster() {
	logNow($('#in_company_contents_title_logo').val());
	logNow($('#in_company_contents_title_logo')[0].files[0] + "/" + $('#in_company_contents_title_logo').val());
}

function deleteContent() {
}

function insertContent() {
	logNow($('#in_company_contents_title_logo').val());
	logNow($('#in_company_contents_title_logo')[0].files[0] + "/" + $('#in_company_contents_title_logo').val());
}