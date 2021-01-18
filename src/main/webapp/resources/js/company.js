$(document).ready(function(){
	initCompanyList();
	getCompany();
});

function initCompanyList() {
	$('#btn_company').css('background-color', "#0062bd");
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: MASTER_URL + "/industry/select_industry",
		async: false,
		success: function (result) {
			init_company_list = result;
		}
	});
}

function initCompanySearchList(name) {
	$('#btn_company').css('background-color', "#0062bd");
	
	var from = {name: name}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/industry/select_industry_search",
		data : JSON.stringify(from),
		success: function (result) {
			init_company_list = result;
		}
	});
}

function initCompany(uid){
	var sendData = {uid: uid};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/industry/select_industry_all_lang",
		data : JSON.stringify(sendData),
		success: function (result) {
			init_company_data = result;
		}
	});
}

function searchCompany(){
	$('#div_company_list_contents').html('');
	
	var search_name = $('#in_company_search').val();
	if(search_name == '') initCompanyList(); 
	else initCompanySearchList(search_name);
	
	var html_string = "";
	var num = 1;
	for(var i = 0; i < init_company_list.length; i++){
		html_string +=
			'<div name="div_company_item" class="div_company_list_title" onclick="javascript:showCompany('+ i +', '+ init_company_list[i]["uid"] +');">' +
				'<a name="a_company_num" class="a_company_num">'+ num +'</a>' +
				'<a name="a_company_item_title" class="a_company_item_title">'+ init_company_list[i]["name"] +'</a>' +
			'</div>' +
			'<div class="div_company_divide_line"></div>';
		num += 1;
	}
	$('#div_company_list_contents').html(html_string);
}

var init_company_list;
var init_company_data;
//항목별 전역변수 생성
function getCompany(){
	var html_string = "";
	
	var num = 1;
	for(var i = 0; i < init_company_list.length; i++){
		html_string +=
			'<div name="div_company_item" class="div_company_list_title" onclick="javascript:showCompany('+ i +', '+ init_company_list[i]["uid"] +');">' +
				'<a name="a_company_num" class="a_company_num">'+ num +'</a>' +
				'<a name="a_company_item_title" class="a_company_item_title">'+ init_company_list[i]["name"] +'</a>' +
			'</div>' +
			'<div class="div_company_divide_line"></div>';
		num += 1;
	}
	$('#div_company_list_contents').html(html_string);
	
	html_string = "";
	
	for(var i = 0; i < 4; i++) {
		html_string +=
		'<div name="div_company_detail_contents" class="div_company_detail">' +
			'<div name="div_company_contents_title_com_cate" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 시설분류</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<div class="div_company_contents_com_cate" onclick="javascript:checkCompany('+ i +', 0);">' +
						'<div name="div_company_contents_com_cate'+ i +'" class="div_company_contents_com_cate_img"></div>' +
						'<a class="a_company_contents_com_cate_text">주요시설</a>' +
					'</div>' +
					'<div class="div_company_contents_com_cate" onclick="javascript:checkCompany('+ i +', 1);">' +
						'<div name="div_company_contents_com_cate'+ i +'" class="div_company_contents_com_cate_img"></div>' +
						'<a class="a_company_contents_com_cate_text">입주업체</a>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="a_company_contents_title_name" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 기업명</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_name" class="inputbox_esnt in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="a_company_contents_title_room" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 입주호실</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_room" class="inputbox_esnt in_company_contents">' +
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
					'<input type="text" name="in_company_contents_owner" class="inputbox_esnt in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="div_company_contents_title_busi" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 사업분야</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_busi1" class="inputbox_esnt in_company_contents_busi">' +
					'<input type="text" name="in_company_contents_busi2" class="in_company_contents_busi">' +
					'<input type="text" name="in_company_contents_busi3" class="in_company_contents_busi">' +
					'<input type="text" name="in_company_contents_busi4" class="in_company_contents_busi">' +
					'<input type="text" name="in_company_contents_busi5" class="in_company_contents_busi">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="div_company_contents_title_item" class="div_company_detail_title">' +
				'<a class="a_company_contents_title_option">아이템</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_item" class="inputbox in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="div_company_contents_title_tel" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* 연락처</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_tel" class="inputbox_esnt in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="div_company_contents_title_email" class="div_company_detail_title">' +
				'<a class="a_company_contents_title">* e-mail</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_email" class="inputbox_esnt in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
			'<div name="div_company_contents_title_homepage" class="div_company_detail_title">' +
				'<a class="a_company_contents_title_option">홈페이지</a>' +
				'<div class="div_company_detail_title_contents">' +
					'<input type="text" name="in_company_contents_homepage" class="inputbox in_company_contents">' +
				'</div>' +
			'</div>' +
			'<div class="div_company_detail_divide_line"></div>' +
		'</div>';
	}
	
	$('#div_company_detail_contents').html(html_string);
	
	resetCompany();
}

function resetCompany(){
	$('div[name=div_company_item]').each(function(index){//리스트 목록 초기화
		$('div[name=div_company_item]:eq("' + index + '")').css('background-color', '');
		
		$('a[name=a_company_num]:eq("' + index + '")').css('color', 'black');
		$('a[name=a_company_item_title]:eq("' + index + '")').css('color', 'black');
	});
	
	$('div[name=div_company_detail_contents]').each(function(index){//시설분류 초기화
		for(var i = 0; i < 2; i++) {
			$('div[name=div_company_contents_com_cate'+ index +']:eq("' + i + '")').css('background-color', '');
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
	
	$("#a_company_contents_title_logo").text(""); //로고 text 초기화
	
	$('#btn_company_save').attr('onclick','').unbind('click');
	$('#btn_company_cancleNdel').attr('onclick','').unbind('click');
	
	$('#div_contents_detail').hide();
}

function showCompany(index, uid){
	resetCompany();
	initCompany(uid);
	
	$('div[name=div_company_item]:eq("' + index + '")').css('background-color', '#0062bd');
	
	$('a[name=a_company_num]:eq("' + index + '")').css('color', 'white');
	$('a[name=a_company_item_title]:eq("' + index + '")').css('color', 'white');
	
	$('#div_contents_detail').show();
	
	$('#btn_company_save').attr('onclick', 'updateContent('+ uid +')');
	$('#btn_company_cancleNdel').css('background-image', 'url(./resources/image/btn_admin_삭제.png)'); //삭제
	$('#btn_company_cancleNdel').attr('onclick', 'deleteContent('+ uid +')');
	
	checkLang(0);
	
	if(init_company_data != null){
		checkFlow(init_company_data[0]["flow"]-1);
		setLoc(init_company_data[0]["image_x"], init_company_data[0]["image_y"]); //x,y 반대....
		setCompany(); 
	}
		
}

function setCompany(){
	$('div[name=div_company_detail_contents]').each(function(index){ 
		checkCompany(index, init_company_data[index]["com_cate"])//시설분류
		$('input[name=in_company_contents_name]:eq("' + index + '")').val(init_company_data[index]["name"]); //기업명
		$('input[name=in_company_contents_room]:eq("' + index + '")').val(init_company_data[index]["room"]); //입주호실
		$('#a_company_contents_title_logo').html(init_company_data[index]["logo"]);//로고
		$('input[name=in_company_contents_owner]:eq("' + index + '")').val(init_company_data[index]["owner"]); //대표자
		$('input[name=in_company_contents_busi1]:eq("' + index + '")').val(init_company_data[index]["busi1"]); //사업분야 1~5
		$('input[name=in_company_contents_busi2]:eq("' + index + '")').val(init_company_data[index]["busi2"]); 
		$('input[name=in_company_contents_busi3]:eq("' + index + '")').val(init_company_data[index]["busi3"]); 
		$('input[name=in_company_contents_busi4]:eq("' + index + '")').val(init_company_data[index]["busi4"]);
		$('input[name=in_company_contents_busi5]:eq("' + index + '")').val(init_company_data[index]["busi5"]);
		$('input[name=in_company_contents_item]:eq("' + index + '")').val(init_company_data[index]["item"]); //아이템
		$('input[name=in_company_contents_tel]:eq("' + index + '")').val(init_company_data[index]["tel"]); //연락처
		$('input[name=in_company_contents_email]:eq("' + index + '")').val(init_company_data[index]["email"]); //이메일
		$('input[name=in_company_contents_homepage]:eq("' + index + '")').val(init_company_data[index]["homepage"]); //홈페이지
	});
}

function showAddCompany(){
	init_company_data = null;
	resetCompany();
	
	init_company_data = null;
	
	$('#div_contents_detail').show();
	
	$('#btn_company_save').click(insertContent);//
	$('#btn_company_cancleNdel').css('background-image', 'url(./resources/image/btn_admin_취소.png)'); //취소
	$('#btn_company_cancleNdel').click(resetCompany);
	
	checkLang(0);
	checkFlow(0);
}

var currunt_flow;
function checkFlow(value){
	var flow = ["1", "2", "3"];
	$('div[name=btn_company_flow]').each(function(index){
		$('div[name=btn_company_flow]:eq("' + index + '")').css('background-image', 'url(./resources/image/btn_admin_'+ flow[index] +'f.png)');
	});
	
	$('div[name=btn_company_flow]:eq("' + value + '")').css('background-image', 'url(./resources/image/btn_admin_'+ flow[value] +'f2.png)');
	
	$('#img_company_pin').hide();
	$('#img_company_pin').css("top", 0);
	$('#img_company_pin').css("left", 0);
	
	$('#img_company_map').attr("src", './resources/image/industry_map_' + (value + 1) + 'f.png');
	currunt_flow = (value + 1);
}

var init_loc_data = new Object();
function checkLoc(){
	var x = event.offsetX;
	var y = event.offsetY;
	
	$('#img_company_pin').show();
	$('#img_company_pin').css("top", y - 70);
	$('#img_company_pin').css("left", x - 25);
	
	init_loc_data.x = x;
	init_loc_data.y = y;
	
	//logNow(x + "//" + y);
}

function setLoc(x, y){
	$('#img_company_pin').show();
	$('#img_company_pin').css("top", y - 70);
	$('#img_company_pin').css("left", x - 25);
}

function checkLang(value){
	if(value != 0){ //ko가 아닌 다른 언어로 탭 변경시
		if(!checkEsnt(0)){
			alert("필수 사항을 모두 입력해주세요.");
			return;
		}
		
		if(init_company_data == null){
			if($('#img_company_pin').css('display') == 'none') return alert("지도에 핀을 표시해주세요");
			
			makeLangJson(0);
			
			if(value == 2 || value == 3){
				if(!checkEsnt(1)){
					alert("영어 탭의 양식을 먼저 완성해주세요");
					return;
				}else makeLangJson(1);
			}
			
			if(!checkEsnt(value)) setLangJson(value);
			
			else{
				if(value == 1){
					checkCompany(value, ko_json.com_cate);
					$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_room]').val(ko_json.room); //입주호실
					$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_tel]').val(ko_json.tel); //연락처
					$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_email]').val(ko_json.email); //이메일
				}else{
					checkCompany(value, en_json.com_cate);
					$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_room]').val(en_json.room); //입주호실
					$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_tel]').val(en_json.tel); //연락처
					$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_email]').val(en_json.email); //이메일
				}
			}	
		}
		
		
		
		$('div[name=div_company_detail_contents]:eq("'+ value +'") .div_company_contents_com_cate').attr('onclick','').unbind('click'); //한국 외 언어에서 행사분류 클릭x
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_room]').attr('disabled', true);
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_tel]').attr('disabled', true);
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_email]').attr('disabled', true);
		$('#img_company_map').css('pointer-events', 'none');
		$('#div_company_flow_btn').css('pointer-events', 'none');
	}else{
		$('#img_company_map').css('pointer-events', '');
		$('#div_company_flow_btn').css('pointer-events', '');
	} 
	
	var lang = ["kr", "en", "ch", "jp"];
	$('div[name=btn_company_lang]').each(function(index){
		$('div[name=btn_company_lang]:eq("' + index + '")').css('background-image', 'url(./resources/image/btn_admin_2_'+ lang[index] +'.png)');
		
		$('div[name=div_company_detail_contents]:eq("' + index + '")').hide();
	});
	
	$('div[name=btn_company_lang]:eq("' + value + '")').css('background-image', 'url(./resources/image/btn_admin_2_'+ lang[value] +'2.png)');
	
	$('div[name=div_company_detail_contents]:eq("' + value + '")').show();
}

function checkEsnt(val){ //빈 데이터 있음 false, 모두 입력 true
	var isCompanyCheck;
	for(var i = 0; i < 4; i++) {
		if($('div[name=div_company_contents_com_cate'+ val +']:eq("'+ i +'")').css('background-color') == "rgb(127, 200, 59)"){
			isCompanyCheck = true;
			break;
		}else{
			isCompanyCheck = false;
		}
	}
	var isEnstCheck;
	var el = document.getElementsByClassName('inputbox_esnt'); 
	for(var i = (val * 6); i < ((val * 6) + 6); i++){ //0~7 
		if(el[i].value != ""){
			isEnstCheck = true;
		}else{
			isEnstCheck = false;
			break;
		}
	}
	/*var isLocCheck;
	if($('#img_company_pin').css('display') == 'none') isLocCheck = false;
	else isLocCheck = true;*/
	
	if(val == 0){
		if(isEnstCheck == false || isCompanyCheck == false) return false;
		//if(isEnstCheck == false || isCompanyCheck == false || isLocCheck == false) return false;
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
		if($('div[name=div_company_contents_com_cate0]:eq("'+ i +'")').css('background-color') == "rgb(127, 200, 59)"){
			lang_json.com_cate = i; //시설분류
			break;
		}
	}	
	lang_json.name = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_name]').val(); //기업명
	lang_json.room = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_room]').val(); //입주호실
	lang_json.logo = $('div[name=div_company_detail_contents]:eq("'+ value +'") #a_company_contents_title_logo').text(); //로고
	lang_json.owner = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_owner]').val(); //대표자
	lang_json.busi1 = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi1]').val(); //사업분야 1~5
	lang_json.busi2 = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi2]').val(); 
	lang_json.busi3 = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi3]').val(); 
	lang_json.busi4 = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi4]').val(); 
	lang_json.busi5 = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi5]').val(); 
	lang_json.item = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_item]').val(); 
	lang_json.tel = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_tel]').val(); //아이템
	lang_json.email = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_email]').val(); //이메일
	lang_json.homepage = $('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_homepage]').val(); //홈페이지
	lang_json.image_x = init_loc_data.x;
	lang_json.image_y = init_loc_data.y;
	
	if(value == 0) ko_json= lang_json;
	if(value == 1) en_json= lang_json;
}

function setLangJson(value){ 
	if(value == 1){ //1 ko_json 
		checkCompany(value, ko_json.com_cate);//행사분류
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_name]').val(ko_json.name); //기업명
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_room]').val(ko_json.room); //입주호실
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_owner]').val(ko_json.owner); //대표자
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi1]').val(ko_json.busi1); //사업분야 1~5
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi2]').val(ko_json.busi2);
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi3]').val(ko_json.busi3); 
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi4]').val(ko_json.busi4);
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi5]').val(ko_json.busi5); 
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_item]').val(ko_json.item); //아이템
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_tel]').val(ko_json.tel); //연락처
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_email]').val(ko_json.email); //이메일
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_homepage]').val(ko_json.homepage); //홈페이지
	}else{ //2,3 en_json
		checkCompany(value, en_json.com_cate);//행사분류
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_name]').val(en_json.name); //기업명
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_room]').val(en_json.room); //입주호실
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_owner]').val(en_json.owner); //대표자
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi1]').val(en_json.busi1); //사업분야 1~5
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi2]').val(en_json.busi2);
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi3]').val(en_json.busi3); 
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi4]').val(en_json.busi4);
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_busi5]').val(en_json.busi5); 
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_item]').val(en_json.item); //아이템
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_tel]').val(en_json.tel); //연락처
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_email]').val(en_json.email); //이메일
		$('div[name=div_company_detail_contents]:eq("'+ value +'") input[name=in_company_contents_homepage]').val(en_json.homepage); //홈페이지
	}
}

function checkCompany(lang, cate){
	$('div[name=div_company_contents_com_cate'+ lang +']').each(function(index){
		$('div[name=div_company_contents_com_cate'+ lang +']:eq("' + index + '")').css('background-color', '');
	});
	
	if(lang == 0) $('div[name=div_company_contents_com_cate'+ lang +']:eq("' + cate + '")').css('background-color', '#7fc83b');
	else $('div[name=div_company_contents_com_cate'+ lang +']:eq("' + cate + '")').css('background-color', '#ebebeb');
}

function addLogo() {
	var file_value = $('#in_company_contents_title_logo').val().split("\\");
	var file_name = file_value[file_value.length - 1];
	
	$('#a_company_contents_title_logo').html(file_name);
}

function updateContent(uid) {
	if(!confirm("수정하시겠습니까?")) return;
	
	for(var i = 0; i < 4; i++) {
		if($('div[name=div_company_contents_com_cate0]:eq("'+ i +'")').css('background-color') == "rgb(127, 200, 59)"){
			var com_cate = i; 
			break;
		}
	}
	
	if($('#a_company_contents_title_logo').text() != ''){
		if($('#in_company_contents_title_logo')[0].files[0] != null) uploadLogo(com_cate);
	}else logo_name = $('#a_company_contents_title_logo').text();
	
	setTimeout(function(){
		var lang = ["kr", "en", "ch", "jp"];
		$('div[name=div_company_detail_contents]').each(function(index){ 
			var sendData = {
				language: lang[index],
				com_cate: com_cate,
				name: $('input[name=in_company_contents_name]:eq("' + index + '")').val(),
				owner: $('input[name=in_company_contents_owner]:eq("' + index + '")').val(),
				tel: $('input[name=in_company_contents_tel]:eq("0")').val(),
				email: $('input[name=in_company_contents_email]:eq("0")').val(),
				flow: currunt_flow,
				room: $('input[name=in_company_contents_room]:eq("0")').val(),
				busi1: $('input[name=in_company_contents_busi1]:eq("' + index + '")').val(),
				busi2: $('input[name=in_company_contents_busi2]:eq("' + index + '")').val(),
				busi3: $('input[name=in_company_contents_busi3]:eq("' + index + '")').val(),
				busi4: $('input[name=in_company_contents_busi4]:eq("' + index + '")').val(),
				busi5: $('input[name=in_company_contents_busi5]:eq("' + index + '")').val(),
				logo: logo_name,
				homepage: $('input[name=in_company_contents_homepage]:eq("' + index + '")').val(),
				image_x: init_loc_data.x,
				image_y: init_loc_data.y,
				uid: uid
			}
			
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: MASTER_URL + "/industry/update_company",
				async: false,
				data: JSON.stringify(sendData),
				success: function (result) {
				},
				error: function () {
					alert("데이터 수정 실패");
				}
			});
		});
	},1000);
	
	setTimeout(function(){
		window.location.reload();
	},1000);
}

function deleteContent(uid) {
	if(!confirm("삭제하시겠습니까?")) return;
	
	var lang = ["kr", "en", "ch", "jp"];
	for(var i = 0; i < lang.length ; i++){
		var sendData = { language: lang[i], uid: uid };
		
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8;",
			dataType: "json",
			url: MASTER_URL + "/industry/delete_company",
			async: false,
			data: JSON.stringify(sendData),
			success: function (result) {
			},
			error: function () {
				alert("데이터 삭제 실패");
			}
		});	
	}
	window.location.reload();
}

function insertContent() {
	for(var i = 0; i < 4; i++){
		if(!checkEsnt(i)) return alert("언어별 모든 양식에 데이터가 입력되었는지 확인바랍니다.");
	}
	
	if(!confirm("저장하시겠습니까?")) return;
	
	var new_uid;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: MASTER_URL + "/industry/select_company_maxuid",
		async: false,
		success: function (result) {
			new_uid = result + 1;
		}
	});
	
	var com_cate;
	for(var i = 0; i < 4; i++) {
		if($('div[name=div_company_contents_com_cate0]:eq("'+ i +'")').css('background-color') == "rgb(127, 200, 59)"){
			com_cate = i; //시설분류
			break;
		}
	}	
	
	if($('#a_company_contents_title_logo').text() != '') uploadLogo(com_cate);
	setTimeout(function(){
		var lang = ["kr", "en", "ch", "jp"];
		$('div[name=div_company_detail_contents]').each(function(index){ 
			var sendData = {
				language: lang[index],
				com_cate: com_cate,
				name: $('input[name=in_company_contents_name]:eq("' + index + '")').val(),
				owner: $('input[name=in_company_contents_owner]:eq("' + index + '")').val(),
				tel: $('input[name=in_company_contents_tel]:eq("0")').val(),
				email: $('input[name=in_company_contents_email]:eq("0")').val(),
				flow: currunt_flow,
				room: $('input[name=in_company_contents_room]:eq("0")').val(),
				busi1: $('input[name=in_company_contents_busi1]:eq("' + index + '")').val(),
				busi2: $('input[name=in_company_contents_busi2]:eq("' + index + '")').val(),
				busi3: $('input[name=in_company_contents_busi3]:eq("' + index + '")').val(),
				busi4: $('input[name=in_company_contents_busi4]:eq("' + index + '")').val(),
				busi5: $('input[name=in_company_contents_busi5]:eq("' + index + '")').val(),
				item: $('input[name=in_company_contents_item]:eq("' + index + '")').val(),
				logo: logo_name,
				homepage: $('input[name=in_company_contents_homepage]:eq("' + index + '")').val(),
				image_x: init_loc_data.x,
				image_y: init_loc_data.y,
	 			uid: new_uid
			}
			
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8;",
				dataType: "json",
				url: MASTER_URL + "/industry/insert_company",
				async: false,
				data: JSON.stringify(sendData),
				success: function (result) {
				},
				error: function () {
					alert("데이터 입력 실패");
				}
			});
		});
	},1000);
	
	setTimeout(function(){
		window.location.reload();
	},1000);
}


var logo_name;
function uploadLogo(com_cate) {
	//logNow($('#in_company_contents_title_logo')[0].files[0] + "/" + $('#in_company_contents_title_logo').val());
	
	var namecode = getCookie("login_info").auth + '' + com_cate;
	
	var formData = new FormData();
	formData.append("files", $('#in_company_contents_title_logo')[0].files[0]);
	formData.append("namecode", namecode);

	$.ajax({ //마스터 주소
		url : MASTER_URL + "/industry/upload_logo",
		processData : false,
		contentType : false,
		data : formData,
		type : 'POST',
		success : function(result) {
			if(result == "") alert("이미지 업로드 실패");
			else logo_name = result;
		}
	});
	
	/*$.ajax({ //슬레이브 주소
		url : SLAVE_URL + "/kioskserver/industry/upload_logo",
		processData : false,
		contentType : false,
		data : formData,
		type : 'POST',
		success : function(result) {
			if(result == "") alert("이미지 업로드 실패");
		}
	});*/
}