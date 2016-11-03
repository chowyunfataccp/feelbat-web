$(document).ready(function(){
	loadMall();
	
	$("#categoryDiv>button").each(function(){
		  $(this).click(
			function(){
		  	if(!$(this).hasClass("categoryClass")){
		  		changeCategory();
		  		$(this).addClass("categoryClass");
		  	}
			}
		  );});
		  
		  function changeCategory(){
			  $("#categoryDiv>button").each(function(){
			  	$(this).removeClass("categoryClass");
			  });
		  }
	$("#nextBtn").click(addshop);
	
});

/////////////////////////

function loadMall(){
	var url = "mallController.do?search";
		$.ajax({
			async : true,
			cache : false,
			type : 'POST',
			url : url,// 请求的action路径
			data : null,
			error : function() {// 请求失败处理函数
			},
			success : function(data) {
				var d = $.parseJSON(data);
				if (d.success) {
					rendMall(d.obj);
				}
			}
		});
}

function rendMall(list){
	  for(var itemm in list){
		  var item = list[itemm];
		  var id = item.id;
		  var name = item.name;
		  var option = $("<option value='" +id+ "'>" +name+ "</option>");
		  $("#mallId").append(option);
	  }
}

function addshop(){
	var actionurl= "shopController.do?createshop";
	var formData = new Object();
	formData["mallId"] =$("#mallId").val();
	formData["name"] =$("#name").val();
	formData["addr"] =$("#addr").val();
	formData["floor"] =$("#floor").val();
	$("#categoryDiv>button").each(function(){
	  	if(!$(this).hasClass("categoryClass")){
	  		formData["category"] =$(this).val();
	  	}
	});
	formData["tel"] =$("#tel").val();
	formData["hoursfrom"] =$("#hoursfrom").val();
	formData["hoursto"] =$("#hoursto").val();
	formData["freewifi"] =0;
	if($("#wifi").is(":checked")){
		formData["freewifi"] =1;
	}
	formData["freecar"] =0;
	if($("#car").is(":checked")){
		formData["freecar"] =1;
	}
	
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
				var shopid = d.obj;
				window.parent.change("shopController.do?toAddShop2");
			}
		}
	});
}


