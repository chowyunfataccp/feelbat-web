$(document).ready(function(){
	$("#areaDiv>button").each(function(){
		  $(this).click(
			function(){
		  	if(!$(this).hasClass("areaClass")){
		  		changeArea();
		  		$(this).addClass("areaClass");
		  	}
			}
	);});
		  
	  function changeArea(){
		  $("#areaDiv>button").each(function(){
		  	$(this).removeClass("areaClass");
		  });
	  }
	
	$("#addMallBtn").click(function(){
		addmall();
	 });
});

///////////////////

function addmall(){
	var actionurl= "mallController.do?create";
	var formData = new Object();
	formData["area"] =$("#area").val();
	formData["name"] =$("#name").val();
	formData["addr"] =$("#addr").val();
	$.ajax({
		async : false,
		cache : false,
		type : 'POST',
		url : actionurl,// 请求的action路径
		data : formData,
		error : function() {// 请求失败处理函数
		},
		success : function(data) {
			var d = $.parseJSON(data);
			if (d.success) {
				$("#msg").html("添加成功!");
			}
		}
	});
}