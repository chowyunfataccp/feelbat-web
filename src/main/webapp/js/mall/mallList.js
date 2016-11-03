$(document).ready(function(){
	
	 $("#areaDiv>button").each(function(){
		  $(this).click(
			function(){
		  	if(!$(this).hasClass("areaClass")){
		  		changeArea();
		  		$(this).addClass("areaClass");
		  		search();
		  	}
			}
	);});
		  
	  function changeArea(){
		  $("#areaDiv>button").each(function(){
		  	$(this).removeClass("areaClass");
		  });
	  }
	
	
	$("#toAddMallBtn").click(function(){
		window.parent.change("mallController.do?toAddMall");
	 });
	
	search();
});

/*外部*/

function search(){
	var area = $(".areaClass").val();
	var url = "mallController.do?search";
	var formData = new Object();
	formData["area"] = area;
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
					$("#countLabel").html($(d.obj).size());
					rendTable(d.obj);
				}
			}
		});
}

function rendTable(list){
	  $("#result").empty();
	  for(var itemm in list){
		  var item = list[itemm];
		  var td1 = $("<td></td>");
		  var area = parseInt(item.area);
		  if(area == 0){
			  area = "松江";
		  }else if(area == 1){
			  area = "嘉定";
		  }else if(area == 2){
			  area = "金山";
		  }else if(area == 3){
			  area = "闵行";
		  }else{
			  area = "未知";
		  }
		  td1.append(area);
		  var td2 = $("<td></td>");
		  td2.append(item.name);
		  var td3 = $("<td></td>");
		  var shopcount = 0;
		  if(item.shopcount != null){
			  shopcount = parseInt(item.shopcount);
		  }
		  td3.append(shopcount);
		  var td4 = $("<td></td>");
		  var usercount = 0;
		  if(item.usercount != null){
			  usercount = parseInt(item.usercount);
		  }
		  td4.append(usercount);
		  var td5 = $("<td></td>");
		  var td6 = $("<td></td>");
		  var td7 = $("<td></td>");
		  var q = item.qrcode;
		  if(q == null){
			  var buttonDel = $('<button onclick="removeMall(' +item.id+ ',this);">刪除</button>');
			  td7.append(buttonDel);
		  }else{
			  td5.append(q.scene_id);
			  var buttonView = $('<button onclick="viewImage(\'' + q.ticket + '\');">view2</button>');
			  td6.append(buttonView);
			  if(shopcount == 0 && usercount == 0){
				  var buttonDel = $('<button onclick="removeMall(' +item.id+ ',this);">刪除</button>');
				  td7.append(buttonDel);
			  }
		  }
		  var row = $("<tr></tr>"); 
		  row.append(td1);
		  row.append(td2);
		  row.append(td3);
		  row.append(td4);
		  row.append(td5);
		  row.append(td6);
		  row.append(td7);
		  $("#result").append(row);
	  }
}

function viewImage(ticket){
	window.open("https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket);
}

function removeMall(id,ele){
	var url = "mallController.do?remove";
	var formData = new Object();
	formData["id"] = id;
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
				$(ele).parent().parent().remove();
			}
		}
	});
}



