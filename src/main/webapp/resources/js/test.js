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