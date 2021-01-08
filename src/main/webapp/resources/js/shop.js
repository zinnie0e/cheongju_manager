$(document).ready(function(){
	initShop();
	getShop();
});

function initShop() {
	$('#btn_wonder').css('background-color', "#0062bd");
}

var init_data;
//항목별 전역변수 생성
function getShop(){
	var html_string = "";
	
	//ajax 전체 데이터 셀렉트, 초기 데이터 전역변수 init_data에 저장
	for(var i = 0; i < 20; i++){
		html_string +=
			'<div name="div_shop_item" class="div_shop_list_title" onclick="javascript:showShop('+ i +');">' +
				'<a name="a_shop_num" class="a_shop_num">'+ i +'</a>' +
				'<a name="a_shop_item_title" class="a_shop_item_title">'+ i +'</a>' +
			'</div>' +
			'<div class="div_shop_divide_line"></div>';
	}
	
	$('#div_shop_list_contents').html(html_string);
	
	html_string = "";
	
	for(var i = 0; i < 4; i++) {
		html_string +=
		'<div name="div_shop_detail_contents" class="div_shop_detail">' +
			'<div name="div_shop_contents_title_shop_cate" class="div_shop_detail_title">' +
				'<a class="a_shop_contents_title">* 상점분류</a>' +
				'<div class="div_shop_detail_title_contents">' +
					'<div class="div_shop_contents_shop_cate" onclick="javascript:checkShop('+ i +', 0);">' +
						'<div name="div_shop_contents_shop_cate'+ i +'" class="div_shop_contents_shop_cate_img"></div>' +
						'<a class="a_shop_contents_shop_cate_text">의류</a>' +
					'</div>' +
					'<div class="div_shop_contents_shop_cate" onclick="javascript:checkShop('+ i +', 1);">' +
						'<div name="div_shop_contents_shop_cate'+ i +'" class="div_shop_contents_shop_cate_img"></div>' +
						'<a class="a_shop_contents_shop_cate_text">패션잡화</a>' +
					'</div>' +
					'<div class="div_shop_contents_shop_cate" onclick="javascript:checkShop('+ i +', 0);">' +
						'<div name="div_shop_contents_shop_cate'+ i +'" class="div_shop_contents_shop_cate_img"></div>' +
						'<a class="a_shop_contents_shop_cate_text">카페</a>' +
					'</div>' +
					'<div class="div_shop_contents_shop_cate" onclick="javascript:checkShop('+ i +', 1);">' +
						'<div name="div_shop_contents_shop_cate'+ i +'" class="div_shop_contents_shop_cate_img"></div>' +
						'<a class="a_shop_contents_shop_cate_text">음식점</a>' +
					'</div>' +
					'<div class="div_shop_contents_shop_cate" onclick="javascript:checkShop('+ i +', 0);">' +
						'<div name="div_shop_contents_shop_cate'+ i +'" class="div_shop_contents_shop_cate_img"></div>' +
						'<a class="a_shop_contents_shop_cate_text">도서</a>' +
					'</div>' +
					'<div class="div_shop_contents_shop_cate" onclick="javascript:checkShop('+ i +', 0);">' +
						'<div name="div_shop_contents_shop_cate'+ i +'" class="div_shop_contents_shop_cate_img"></div>' +
						'<a class="a_shop_contents_shop_cate_text">편의시설</a>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="div_shop_detail_divide_line"></div>' +
			'<div name="a_shop_contents_title_name" class="div_shop_detail_title">' +
				'<a class="a_shop_contents_title">* 상점명</a>' +
				'<div class="div_shop_detail_title_contents">' +
					'<input type="text" name="in_shop_contents_name" class="in_shop_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_shop_detail_divide_line"></div>' +
			'<div name="a_shop_contents_title_room" class="div_shop_detail_title">' +
				'<a class="a_shop_contents_title">* 입주호실</a>' +
				'<div class="div_shop_detail_title_contents">' +
					'<input type="text" name="in_shop_contents_room" class="in_shop_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_shop_detail_divide_line"></div>';
			
			if(i == 0){
				html_string +=
					'<div name="div_shop_contents_title_logo" class="div_shop_detail_title">' +
						'<a class="a_shop_contents_title">* 기업로고</a>' +
						'<div class="div_shop_detail_title_contents">' +
							'<a id="a_shop_contents_title_logo" class="a_shop_contents_title_logo"></a>' +
							'<input type="file" accept="image/*" id="in_shop_contents_title_logo" style="display:none" onchange="javascript:addLogo();">' +
							'<label id="btn_shop_contents_title_logo" for="in_shop_contents_title_logo">찾아보기</label>' +
						'</div>' +
					'</div>' +
					'<div class="div_shop_detail_divide_line"></div>';
			}
	
			html_string +=
			'<div class="div_shop_detail_divide_bold_line"></div>' +
			'<a class="a_shop_detail_right" style="color:#ff5012;">* 항목은 필수 입력항목으로 리스트 내 노출됩니다.</a>' +
		'</div>';
	}
	
	$('#div_shop_detail_contents').html(html_string);
	
	resetShop();
}

function resetShop(){
	$('div[name=div_shop_item]').each(function(index){
		$('div[name=div_shop_item]:eq("' + index + '")').css('background-color', '');
		
		$('a[name=a_shop_num]:eq("' + index + '")').css('color', 'black');
		$('a[name=a_shop_item_title]:eq("' + index + '")').css('color', 'black');
	});
	
	$('div[name=div_shop_detail_contents]').each(function(index){
		//언어별 div에 init_data로 초기화
		
		for(var i = 0; i < 6; i++) {
			$('div[name=div_shop_contents_shop_cate'+ index +']:eq("' + i + '")').css('background-color', '');
		}
	});
	
	$('#btn_shop_contents_insert').attr('onclick','').unbind('click');
	$('#btn_shop_contents_cancel').attr('onclick','').unbind('click');
	
	$('#div_contents_detail').hide();
}

function showShop(index){
	resetShop();
	
	$('div[name=div_shop_item]:eq("' + index + '")').css('background-color', '#0062bd');
	
	$('a[name=a_shop_num]:eq("' + index + '")').css('color', 'white');
	$('a[name=a_shop_item_title]:eq("' + index + '")').css('color', 'white');
	
	$('#div_contents_detail').show();
	
	$('#btn_shop_contents_insert').val("저장");
	$('#btn_shop_contents_insert').click(updateContent);
	$('#btn_shop_contents_cancel').val("삭제");
	$('#btn_shop_contents_cancel').click(deleteContent);
	
	checkLang(0);
	//checkFlow();
}

function showAddShop(){
	resetShop();
	
	$('#div_contents_detail').show();
	
	$('#btn_shop_contents_insert').val("등록");
	$('#btn_shop_contents_insert').click(insertContent);
	$('#btn_shop_contents_cancel').val("취소");
	$('#btn_shop_contents_cancel').click(resetShop);
	
	checkLang(0);
	checkFlow(0);
}

function checkFlow(value){
	$('input[name=btn_shop_flow]').each(function(index){
		$('input[name=btn_shop_flow]:eq("' + index + '")').css('color', 'black');
		$('input[name=btn_shop_flow]:eq("' + index + '")').css('background-color', '');
	});
	
	$('input[name=btn_shop_flow]:eq("' + value + '")').css('color', 'white');
	$('input[name=btn_shop_flow]:eq("' + value + '")').css('background-color', '#8da4b9');
	
	$('#img_shop_pin').hide();
	$('#img_shop_pin').css("top", 0);
	$('#img_shop_pin').css("left", 0);
	
	var flow = value + 1;
	if(flow == 3) flow += 2;
	
	$('#img_shop_map').attr("src", './resources/image/wonder_map_' + flow + 'f.png');
}

function checkLoc(){
	var x = event.offsetX;
	var y = event.offsetY;
	
	$('#img_shop_pin').show();
	$('#img_shop_pin').css("top", y - 70);
	$('#img_shop_pin').css("left", x - 25);
	logNow(x + "//" + y);
}

function checkLang(value){
	$('input[name=btn_shop_lang]').each(function(index){
		$('input[name=btn_shop_lang]:eq("' + index + '")').css('color', 'black');
		$('input[name=btn_shop_lang]:eq("' + index + '")').css('background-color', '');
		
		$('div[name=div_shop_detail_contents]:eq("' + index + '")').hide();
	});
	
	$('input[name=btn_shop_lang]:eq("' + value + '")').css('color', 'white');
	$('input[name=btn_shop_lang]:eq("' + value + '")').css('background-color', '#8da4b9');
	
	$('div[name=div_shop_detail_contents]:eq("' + value + '")').show();
}

function checkShop(lang, cate){
	$('div[name=div_shop_contents_shop_cate'+ lang +']').each(function(index){
		$('div[name=div_shop_contents_shop_cate'+ lang +']:eq("' + index + '")').css('background-color', '');
	});
	
	$('div[name=div_shop_contents_shop_cate'+ lang +']:eq("' + cate + '")').css('background-color', '#7fc83b');
}

function addLogo() {
	var file_value = $('#in_shop_contents_title_logo').val().split("\\");
	var file_name = file_value[file_value.length - 1];
	
	$('#a_shop_contents_title_logo').html(file_name);
}

function updateContent() {
	
	uploadLogo();
}

function uploadLogo() {
	logNow($('#in_shop_contents_title_logo').val());
	logNow($('#in_shop_contents_title_logo')[0].files[0] + "/" + $('#in_shop_contents_title_logo').val());
}

function deleteContent() {
}

function insertContent() {
	logNow($('#in_shop_contents_title_logo').val());
	logNow($('#in_shop_contents_title_logo')[0].files[0] + "/" + $('#in_shop_contents_title_logo').val());
}