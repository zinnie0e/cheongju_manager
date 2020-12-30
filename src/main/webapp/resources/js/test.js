function uploadFile() {
	var form = $('#FILE_FORM')[0];
	var formData = new FormData(form);
	formData.append("files", $("#FILE_TAG")[0].files[0]);

	$.ajax({
		url : 'http://192.168.1.76:9090/test/upload',
		processData : false,
		contentType : false,
		data : formData,
		type : 'POST',
		success : function(result) {
			alert("업로드 성공!!");
		}
	});
}

$(document).ready(function(){
	sessionCheck();
	
	// 저장된 쿠키값을 가져와서 ID 칸에 넣어준다. 없으면 공백으로 들어감.
	var login_info;
	
	if(getCookie("login_info") != ""){
		login_info = JSON.parse(getCookie("login_info"));
		
		$('#ID_TAG').val(login_info["id"]);
		$('#PW_TAG').val(login_info["pw"]);
		
		$('#SAVE_TAG').attr('checked', true);
	}
	
	$('#SAVE_TAG').change(function(){ // 체크박스에 변화가 있다면,
		if($('#SAVE_TAG').is(":checked")){ // ID 저장하기 체크했을 때,
//			var set_info = {
//					id : $('#ID_TAG').val(),
//					pw : $('#PW_TAG').val()
//			}
//
//			setCookie("login_info", JSON.stringify(set_info), 30);
		} else { // ID 저장하기 체크 해제 시,
			deleteCookie("login_info");
		}
	});
	
//	// ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
//	$('#ID_TAG').keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
//        if($("#SAVE_TAG").is(":checked") && $('#PW_TAG').val() != ""){ // ID 저장하기를 체크한 상태라면,
//	    	var set_info = {
//					id : $('#ID_TAG').val(),
//					pw : $('#PW_TAG').val()
//			}
//	    	
//            setCookie("login_info", JSON.stringify(set_info), 30); // 7일 동안 쿠키 보관
//        }
//    });
//    
//    $("input[id='PW_TAG']").keyup(function(){
//        if($("#SAVE_TAG").is(":checked") && $("input[id='ID_TAG']").val() != ""){
//        	var set_info = {
//					id : $('#ID_TAG').val(),
//					pw : $('#PW_TAG').val()
//			}
//	    	
//            setCookie("login_info", JSON.stringify(set_info), 30); // 7일 동안 쿠키 보관
//        }
//    });
});

function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
    console.log(cookieName + "=" + cookieValue);
}
 
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

function logoutTest() {
	$.ajax({
		url : 'http://192.168.1.76:9090/logout',
		async : false,
		type : 'POST',
		xhrFields: {withCredentials : true}
	});
}

function loginTest() {
	var get_id = $('#ID_TAG').val().trim();
	var get_pw = $('#PW_TAG').val().trim();

	if (get_id == 0 || get_pw == 0) {
		alert("empty");
		return;
	}
	
	var json_data = {
			id : get_id,
			pw : get_pw
		};

	$.ajax({
		url : 'http://192.168.1.76:9090/login',
		async : false,
		type : 'POST',
		contentType : "application/json; charset=utf-8;",
		dataType : "json",
		xhrFields: {withCredentials : true},
		data : JSON.stringify(json_data),
		success : function(result) {
			if ("success" == result["result"] || "login" == result["result"]) {
				alert(result["result"]);
				
				if($('#SAVE_TAG').is(":checked")){
					setCookie("login_info", JSON.stringify(json_data), 30);
				}
			} else {
				alert(result["result"]);
				
				if($('#SAVE_TAG').is(":checked")){
					deleteCookie("login_info");
				}
			}
			
//			location.reload();
		}
	});
}

function sessionCheck() {
	$.ajax({
		url : 'http://192.168.1.76:9090/check',
		async : false,
		type : 'POST',
		xhrFields: {withCredentials : true},
		success : function(result) {
			alert(result);
		}
	});
}