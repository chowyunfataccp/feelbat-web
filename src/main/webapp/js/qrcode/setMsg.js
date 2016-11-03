$(document).ready(function(){
  
	$("#setMsgBtn").click(setMsgBtn);
  
});

/*外部*/

function setMsgBtn(){
	var url = "qrcodeController.do?setMsg";
	var formData = new Object();
	var count = 0;
	for(var i=1;i<10;i++){
		count = i;
//		window.console.log('title' + i + ':' +　$("#title" + i).val());
		if($("#title" + i).val() == '' && $("#picurl" + i).val() == '' && $("#url" + i).val() == '' ){
			count--;
			break;
		}
		
		formData["title" + i] = $("#title" + i).val();
		formData["picurl" + i] = $("#picurl" + i).val();
		formData["url" + i] = $("#url" + i).val();
	}
  formData["count"] = count;
  formData["scene_id"] = $("#scene_id").val();
	$.ajax({
		async : false,
		cache : false,
		type : 'POST',
		url : url,// 请求的action路径
		data : formData,
		error : function() {// 请求失败处理函数
		},
		success : function(data) {
			var d = $.parseJSON(data);
			if (d.success) {
				alert("OK");
			}
		}
	});
}



