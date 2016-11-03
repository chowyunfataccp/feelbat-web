$(document).ready(function(){
   $("#rangeDiv>button").each(function(){
  $(this).click(
	function(){
  	if(!$(this).hasClass("rangeClass")){
  		changeRange();
  		$(this).addClass("rangeClass");
  	}
	}
  );});
  
  function changeRange(){
	  $("#rangeDiv>button").each(function(){
	  	$(this).removeClass("rangeClass");
	  });
  }
  
   $("#typeDiv>button").each(function(){
  $(this).click(
	function(){
  	if(!$(this).hasClass("typeClass")){
  		changeType();
  		$(this).addClass("typeClass");
  	}
	}
  );});
  
  function changeType(){
	  $("#typeDiv>button").each(function(){
	  	$(this).removeClass("typeClass");
	  });
  }
  
  $("#statusDiv>input").each(function(){
  $(this).click(
	function(){
  		changeStatus();
  		$(this).attr("checked",true);
	}
  );});
  
  function changeStatus(){
	  $("#statusDiv>input").each(function(){
	  	$(this).attr("checked",false);
	  });
  }
  
  
  $("#searchBtn").click(function(){
	  navi(1);
  });
  
  $("#tosetDefaultMsgBtn").click(function(){
	  window.parent.change("qrcodeController.do?tosetMsg");
  });
  
  
});

/*外部*/

function navi(pageNow){
	var range = $(".rangeClass").val();
	var type = $(".typeClass").val();
	var status = null;
	$("#statusDiv>input").each(function(){
		if($(this).is(":checked")){
			status = $(this).val();
		}
	});
	var url = "qrcodeController.do?search";
	  var formData = new Object();
	  formData["range"] = range;
	  formData["type"] = type;
	  formData["status"] = status;
	  formData["pageNow"] = pageNow;
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
					rendTable(d.obj.list);
					rendNagivation(d.obj);
				}
			}
		});
}

function rendTable(list){
	  $("#result").empty();
	  for(var itemm in list){
		  var item = list[itemm];
		  var td1 = $("<td></td>");
		  if(item.status == "0"){
			  item.status = "闲置";
		  }else if(item.status == "1"){
			  item.status = "使用中";
		  }else{
			  item.status = "未知";
		  }
		  td1.append(item.status);
		  var td2 = $("<td></td>");
		  if(item.purpose == "0"){
			  item.purpose = "mall";
		  }else if(item.purpose == "1"){
			  item.purpose = "shop";
		  }else if(item.purpose == "2"){
			  item.purpose = "partner";
		  }else{
			  item.purpose = "未知";
		  }
		  td2.append(item.purpose);
		  var td3 = $("<td></td>");
		  td3.append(item.scene_id);
		  var td4 = $("<td></td>");
		  var button4 = $('<button onclick="viewImage(\'' + item.ticket + '\');">view</button>');
		  td4.append(button4);
		  var td5 = $("<td></td>");
		  var button5 = $('<button onclick="tosetMsg(\'' + item.scene_id + '\');">设置</button>');
		  td5.append(button5);
		  var row = $("<tr></tr>"); 
		  row.append(td1);
		  row.append(td2);
		  row.append(td3);
		  row.append(td4);
		  row.append(td5);
		  $("#result").append(row);
	  }
}

function rendNagivation(page){
	var totalPageCount = parseInt(page.totalPageCount);
	var pageNow = parseInt(page.pageNow);
	var bar = "";
	bar += "<font size=\"2\">共 " +totalPageCount+" 页</font> ";
	bar += "<font size=\"2\">第 " +pageNow+ " 页</font> ";
	if(totalPageCount == 0){
		bar += "<a href=\"javascript:void(0)\">首页</a>";
		bar += "<a href=\"javascript:void(0)\">上一页</a>";
		bar += "<a href=\"javascript:void(0)\">下一页</a>";
		bar += "<a href=\"javascript:void(0)\">尾页</a>";
	}else{
		var p = 1;
		bar += "<a href=\"javascript:void(0)\" onclick=\"navi(" +p+ ")\">首页</a>";
		p = 1;
		if(pageNow-1>0){
			p = pageNow - 1;
		}
		bar += "<a href=\"javascript:void(0)\" onclick=\"navi(" +p+ ")\">上一页</a>";
		p = totalPageCount;
		if(pageNow+1<totalPageCount){
			p = pageNow + 1;
		}
		bar += "<a href=\"javascript:void(0)\" onclick=\"navi(" +p+ ")\">下一页</a>";
		p = totalPageCount;
		bar += "<a href=\"javascript:void(0)\" onclick=\"navi(" +p+ ")\">尾页</a>";
	}
	$("#navigation").html(bar);
}

function viewImage(ticket){
	window.open("https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket);
}

function tosetMsg(scene_id){
	window.parent.change("qrcodeController.do?tosetMsg&scene_id=" + scene_id);
}




