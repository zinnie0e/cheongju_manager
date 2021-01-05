$(document).ready(function(){
	initNotice();
	getNotice();
});

function initNotice() {
	$('#btn_notice').css('background-color', "#0062bd");
}

var init_data;
function getNotice(){
	var html_string = "";
	
	//ajax 전체 데이터 셀렉트, 초기 데이터 전역변수 init_data에 저장
	for(var i = 0; i < 3; i++){
		html_string +=
			'<div name="div_notice_item">' +
				'<div name="div_notice_item_title" class="div_notice_title">' +
					'<a class="a_notice_num">'+ i +'</a>' +
					'<a class="a_notice_num">KR</a>' +
					'<a class="a_notice_item_title" onclick="javascript:showNotice('+ i +');">'+ i +'</a>' +
					'<input type="button" class="div_notice_button" value="편집" onclick="javascript:editNotice('+ i +');">' +
					'<input type="button" class="div_notice_button" value="삭제" onclick="javascript:deleteNotice('+ i +');">' +
				'</div>' +
				'<div class="div_notice_divide_line"></div>' +
				'<div name="div_notice_item_input" class="div_notice_item_input">' +
					'<div name="div_notice_item_kr" class="div_notice_item_lang">' +
						'<a class="a_notice_num">'+ i +'</a>' +
						'<a class="a_notice_num">KR</a>' +
						'<input type="text" name="in_notice_kr" class="in_notice_item" value="'+ i +'", disabled>' +
						'<input type="button" class="div_notice_button" value="편집" onclick="javascript:editNotice('+ i +');">' +
						'<input type="button" class="div_notice_button" value="삭제" onclick="javascript:deleteNotice('+ i +');">' +
					'</div>' +
					'<div name="div_notice_item_kr_u_c" class="div_notice_item_lang">' +
						'<a class="a_notice_num">'+ i +'</a>' +
						'<a class="a_notice_num">KR</a>' +
						'<input type="text" name="in_notice_kr_u" class="in_notice_item" value="'+ i +'">' +
						'<input type="button" class="div_notice_button" value="저장" onclick="javascript:updateNotice('+ i +');">' +
						'<input type="button" class="div_notice_button" value="취소" onclick="javascript:resetNotice();">' +
					'</div>' +
					'<div name="div_notice_item_en" class="div_notice_item_lang">' +
						'<a class="a_notice_num"></a>' +
						'<a class="a_notice_num">EN</a>' +
						'<input type="text" name="in_notice_en" class="in_notice_item" value="'+ i +'">' +
					'</div>' +
					'<div name="div_notice_item_ch" class="div_notice_item_lang">' +
						'<a class="a_notice_num"></a>' +
						'<a class="a_notice_num">CH</a>' +
						'<input type="text" name="in_notice_ch" class="in_notice_item" value="'+ i +'">' +
					'</div>' +
					'<div name="div_notice_item_jp" class="div_notice_item_lang">' +
						'<a class="a_notice_num"></a>' +
						'<a class="a_notice_num">JP</a>' +
						'<input type="text" name="in_notice_jp" class="in_notice_item" value="'+ i +'">' +
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
				'<input type="button" class="div_notice_button" value="저장" onclick="javascript:addNotice();">' +
				'<input type="button" class="div_notice_button" value="취소" onclick="javascript:resetNotice();">' +
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
		$('input[name=in_notice_kr_u]:eq("' + index + '")').val(index);
		$('input[name=in_notice_en]:eq("' + index + '")').val(index);
		$('input[name=in_notice_ch]:eq("' + index + '")').val(index);
		$('input[name=in_notice_jp]:eq("' + index + '")').val(index);
		
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

function deleteNotice(index){
	//삭제 ajsx
	getNotice();
}

function updateNotice(index){
	//업데이트 ajsx
	$('input[name=in_notice_kr_u]:eq("' + index + '")').val(index);
	$('input[name=in_notice_kr]:eq("' + index + '")').val(index);
	$('input[name=in_notice_en]:eq("' + index + '")').val(index);
	$('input[name=in_notice_ch]:eq("' + index + '")').val(index);
	$('input[name=in_notice_jp]:eq("' + index + '")').val(index);
	
	
	$('input[name=in_notice_en]:eq("' + index + '")').attr('disabled', true);
	$('input[name=in_notice_ch]:eq("' + index + '")').attr('disabled', true);
	$('input[name=in_notice_jp]:eq("' + index + '")').attr('disabled', true);
	
	$('div[name=div_notice_item_kr]:eq("' + index + '")').show();
	$('div[name=div_notice_item_kr_u_c]:eq("' + index + '")').hide();
}

function addNotice(){
	//추가 ajsx
	getNotice();
}