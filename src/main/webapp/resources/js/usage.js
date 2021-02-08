$(document).ready(function(){
	initSelDate();
	
	initAllDayUsage();
	setAllChart();
});

var dayMasterJson;
var daySlaveJson;
function initDayUsage(date){
	dayMasterJson = '';
	daySlaveJson = '';
	
	var from = {date: date}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/usage/select_day_usage",
		data : JSON.stringify(from),
		success: function (result) {
			dayMasterJson = result;
		}
	});
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/usage/select_day_usage", //SLAVE_URL
		data : JSON.stringify(from),
		success: function (result) {
			daySlaveJson = result;
		}
	});
}

var allMasterJson;
var allSlaveJson;
function initAllDayUsage(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: MASTER_URL + "/usage/select_all_count_usage",
		async: false,
		success: function (result) {
			allMasterJson = result;
		}
	});
	$.ajax({
		type: "POST",
		dataType: "json",
		url: MASTER_URL + "/usage/select_all_count_usage", //SLAVE_URL
		async: false,
		success: function (result) {
			allSlaveJson = result;
		}
	});
	
}

var dayChart;
function setDayChart(){
	if((dayChart != undefined)) {
		$("#div_chart").append('<canvas id="dayChart" class="chart"></canvas>');
		$("#div_chart").append('<canvas id="allChart" class="chart"></canvas>');
		setAllChart();
	}
	
	var ctx = document.getElementById('dayChart');
	var barData = {
			labels: ['진행중 이벤트', '첨단문화산업단지', '원더아리아', '한국공예관', '청주열린도서관', '층북시청자미디어센터', '문화산업진흥재단', '국립현대미술관', '동부창고', '복합공영주차장', '운영시간'],
			datasets: [{
				label: '#내부키오스크',
				data: [dayMasterJson.event_cnt, dayMasterJson.industry_cnt, dayMasterJson.wonder_cnt, dayMasterJson.craft_cnt, dayMasterJson.library_cnt, dayMasterJson.media_cnt, dayMasterJson.foundation_cnt, dayMasterJson.museum_cnt, dayMasterJson.dongbu_cnt, dayMasterJson.parking_cnt, dayMasterJson.hours_cnt],
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 0.8)',
				borderWidth: 1
			}, {
				label: '#외부키오스크',
				backgroundColor: 'rgba(54, 162, 235, 0.8)',
				borderColor: 'rgba(54, 162, 235, 0.8)',
				borderWidth: 1,
				data: [daySlaveJson.event_cnt, daySlaveJson.industry_cnt, daySlaveJson.wonder_cnt, daySlaveJson.craft_cnt, daySlaveJson.library_cnt, daySlaveJson.media_cnt, daySlaveJson.foundation_cnt, daySlaveJson.museum_cnt, daySlaveJson.dongbu_cnt, daySlaveJson.parking_cnt, daySlaveJson.hours_cnt],
			}]
		};
	var barOption = {
			responsive: false,
			scales: {
				xAxes: [{ 
					ticks: { 
						fontColor: 'black', 
						fontSize: '13'
					} 
				}],
				yAxes: [{ 
					ticks: { 
						beginAtZero: true,
						precision:0
					} 
				}]
			},
			title: {
				display: true,
				text: dayMasterJson.date.substring(0,4) + '년 ' + dayMasterJson.date.substring(4,6) + '월 ' + dayMasterJson.date.substring(6,8) + '일',
				fontSize: 20,
				fontColor: 'black'
			},
			legend: {
	            labels: { fontColor: 'black' }
	        }
		};
	
	dayChart = new Chart(ctx, { type: 'bar', data: barData, options: barOption });
}

function setAllChart(){
	var allChart;
	
	var ctx = document.getElementById('allChart');
	var barData = {
			labels: ['진행중 이벤트', '첨단문화산업단지', '원더아리아', '한국공예관', '청주열린도서관', '층북시청자미디어센터', '문화산업진흥재단', '국립현대미술관', '동부창고', '복합공영주차장', '운영시간'],
			datasets: [{
				label: '#내부키오스크',
				data: [allMasterJson.event_cnt, allMasterJson.industry_cnt, allMasterJson.wonder_cnt, allMasterJson.craft_cnt, allMasterJson.library_cnt, allMasterJson.media_cnt, allMasterJson.foundation_cnt, allMasterJson.museum_cnt, allMasterJson.dongbu_cnt, allMasterJson.parking_cnt, allMasterJson.hours_cnt],
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 0.8)',
				borderWidth: 1
			}, {
				label: '#외부키오스크',
				backgroundColor: 'rgba(54, 162, 235, 0.8)',
				borderColor: 'rgba(54, 162, 235, 0.8)',
				borderWidth: 1,
				data: [allSlaveJson.event_cnt, allSlaveJson.industry_cnt, allSlaveJson.wonder_cnt, allSlaveJson.craft_cnt, allSlaveJson.library_cnt, allSlaveJson.media_cnt, allSlaveJson.foundation_cnt, allSlaveJson.museum_cnt, allSlaveJson.dongbu_cnt, allSlaveJson.parking_cnt, allSlaveJson.hours_cnt],
			}]
		};
	
	var barOption = {
			responsive: false,
			scales: {
				xAxes: [{ 
					ticks: { 
						fontColor: 'black', 
						fontSize: '13'
					} 
				}],
				yAxes: [{ 
					ticks: { 
						beginAtZero: true,
						precision:0
					}
				}]
			},
			title: {
				display: true,
				text: '사용 누적 합계',
				fontSize: 20,
				fontColor: 'black'
			},
			legend: {
	            labels: { fontColor: 'black' }
	        }
		};
	
	allChart = new Chart(ctx, { type: 'bar', data: barData, options: barOption });
}

function initSelDate(){
	var html_string = '';
	html_string +=
		'<select name="year" class="selectbox" onChange="javascript:ChangeYnM();"></select>년 &nbsp;' +
		'<select name="month" class="selectbox" onChange="javascript:ChangeYnM();">';
			for(var i = 1; i <= 12; i++) html_string +=  '<option value="'+ ("0" + String(i)).slice(-2) +'">'+ ("0" + String(i)).slice(-2) +'</option>'; html_string +=
		'</select>월 &nbsp;' +
		'<select name="day" class="selectbox" onChange="javascript:ChangeDay();"></select>일';
			
	$('#div_sel_date').html(html_string);
	
	var d = new Date();
	//var lastday = new Date(d.getFullYear(), 1 + d.getMonth(), 0).getDate(); //new Date(2019, 2, 0); //3월 0일 > 2월 마지막일
	
	for (var i = 2021; i <= d.getFullYear(); i++) $("select[name=year]").append("<option value='" + i + "'>" + i + "</option>");
	//for (var i = 1; i <= lastday; i++) $("select[name=day]").append("<option value='" + ("0" + String(i)).slice(-2) + "'>" + ("0" + String(i)).slice(-2) + "</option>");
	
	var month = ("0" + (1 + d.getMonth())).slice(-2);
	var day = ("0" + d.getDate()).slice(-2);
	
	ChangeYnM(d.getFullYear() + month);
	
	$('select[name=year]').val(d.getFullYear());
	$('select[name=month]').val(month);
	$('select[name=day]').val(day);
	
	initDayUsage(d.getFullYear() + month + day);
	setDayChart();
}

function ChangeYnM(ynm){
	 $("select[name=day] option").remove();
	
	if(ynm) var from = {date: ynm};
	else var from = {date: $('select[name=year]').val() + $('select[name=month]').val()};
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: MASTER_URL + "/usage/select_usage_day_list",
		data : JSON.stringify(from),
		success: function (result) {
			$("select[name=day]").append("<option value='none' selected disabled hidden>-</option>");
			for(var i = 0; i < result.length; i++){
				var ex_day = result[i]["date"].substring(6,8);
				$("select[name=day]").append("<option value='" + ex_day + "'>" + ex_day + "</option>"); //해당 연월 찾아서 가져와야함
			}
		}
	});
}

function ChangeDay(){
	$("canvas#dayChart").remove();
	$("canvas#allChart").remove();
	
	var new_date = $("select[name=year]").val() +  $("select[name=month]").val() +  $("select[name=day]").val();
	initDayUsage(new_date);
	setDayChart();
}

function renameKeys(mapping, objArr){
	const renamedObjArr = [];
	for(let obj of objArr){
		const renamedObj = {};
		for(let [before, after] of Object.entries(mapping)){
			//if(obj[before]){}
			renamedObj[after] = obj[before];
		}
		renamedObjArr.push(renamedObj);
	}
	return renamedObjArr;
}

var excelHandler;
function initExcelData(){
	var totMasterJson;
	var totSlaveJson;
	
	var mapping = {
			date: '날짜',
			event_cnt: '진행중 이벤트',
			industry_cnt: '첨단문화산업단지',
			wonder_cnt: '원더아리아',
			craft_cnt: '한국공예관',
			library_cnt: '청주열린도서관',
			media_cnt: '충북시청자미디어센터',
			foundation_cnt: '문화산업진흥재단',
			museum_cnt: '국립현대미술관',
			dongbu_cnt: '동부창고',
			parking_cnt: '복합공영주차장',
			hours_cnt: '운영시간'
	}
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: MASTER_URL + "/usage/select_all_usage",
		async: false,
		success: function (result) {
			totMasterJson = renameKeys(mapping, result);
			
			var sumArray = new Array();
			sumArray.push(allMasterJson);
			var sum_temp = renameKeys(mapping, sumArray);
			sum_temp[0]['날짜'] = '내부 합계';
			
			totMasterJson.push(sum_temp[0]);
		}
	});
	$.ajax({
		type: "POST",
		dataType: "json",
		url: MASTER_URL + "/usage/select_all_usage", //SLAVE_URL
		async: false,
		success: function (result) {
			totSlaveJson = renameKeys(mapping, result);
			
			var sumArray = new Array();
			sumArray.push(allSlaveJson);
			var sum_temp = renameKeys(mapping, sumArray);
			sum_temp[0]['날짜'] = '외부 합계';
			
			totSlaveJson.push(sum_temp[0]);
		}
	});
	
	excelHandler = {
			getExcelFileName : function(){
				var d = new Date();
				var date = '';
				date += d.getFullYear();
			    date += ("0" + (1 + d.getMonth())).slice(-2);
			    date += ("0" + d.getDate()).slice(-2);
				
	            return date + '_키오스크 이용 통계.xlsx';
	        },
	        getSheetName : function(){
	            return ['내부키오스크', '외부키오스크'];
	        },
	        getExcelData1 : function(){
	            return totMasterJson; 
	        },
	        getExcelData2 : function(){
	            return totSlaveJson; 
	        },
	        getWorksheet1 : function(){
	            return XLSX.utils.json_to_sheet(this.getExcelData1());
	        },
	        getWorksheet2 : function(){
	            return XLSX.utils.json_to_sheet(this.getExcelData2());
	        }
	};
}

function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}

function exportExcel(){ 
	initExcelData();
	
    // step 1. workbook 생성
    var wb = XLSX.utils.book_new();

    // step 2. 시트 만들기 
    var newWorksheet1 = excelHandler.getWorksheet1();
    var newWorksheet2 = excelHandler.getWorksheet2();
    
    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
    XLSX.utils.book_append_sheet(wb, newWorksheet1, excelHandler.getSheetName()[0]);
    XLSX.utils.book_append_sheet(wb, newWorksheet2, excelHandler.getSheetName()[1]);

    // step 4. 엑셀 파일 만들기 
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    // step 5. 엑셀 파일 내보내기 
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
}