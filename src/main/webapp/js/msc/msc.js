$(document).ready(function(){
   $("#timeDiv>button").each(function(){
  $(this).click(
	function(){
  	if(!$(this).hasClass("timeClass")){
  		changeTime();
  		$(this).addClass("timeClass");
  	}
	}
  );});
  
  function changeTime(){
	  $("#timeDiv>button").each(function(){
	  	$(this).removeClass("timeClass");
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
	  var when = $(".timeClass").val();
	  var type = $(".typeClass").val();
	  var status = null;
	  $("#statusDiv>input").each(function(){
		  if($(this).is(":checked")){
			  status = $(this).val();
		  }
	  });
	  var url = "mscController.do?search";
	  var formData = new Object();
	  formData["when"] = when;
	  formData["type"] = type;
	  formData["status"] = status;
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
					rend(d.obj);
				}
			}
		});
  });
  
  function rend(list){
	  $("#result").empty();
	  for(var itemm in list){
		  var item = list[itemm];
		  var td1 = $("<td></td>");
		  td1.append(item.optime);
		  var td2 = $("<td></td>");
		  if(item.optype == "0"){
			  item.optype = "订单";
		  }else if(item.optype == "1"){
			  item.optype = "提款";
		  }else if(item.optype == "2"){
			  item.optype = "激活";
		  }else{
			  item.optype = "未知";
		  }
		  td2.append(item.optype);
		  var td3 = $("<td></td>");
		  td3.append(item.shopName);
		  var td4 = $("<td></td>");
		  var td5 = $("<td></td>");
		  var td6 = $("<td></td>");
		  var statusMsg = null;
		  if(item.status == "0"){
			  statusMsg = "未处理";
		  }else if(item.status == "1"){
			  statusMsg = "已处理";
		  }else{
			  statusMsg = "未知";
		  }
		  td6.append(statusMsg);
		  var td7 = $("<td></td>");
		  var button = null;
		  if(item.status == "0"){
			  button = $('<button onclick="handle(' + item.id + ',this);">处理</button>');
		  }else if(item.status == "1"){
			  button = $('<button onclick="removeMsc(' + item.id + ',this);">删除</button>');
		  }
		  td7.append(button);
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
  
});

function handle(id,ele){
	var url = "mscController.do?handle";
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
				var td7 = $(ele).parent();
				var td6 = $(ele).parent().prev();
				td6.html("已处理");
				td7.empty();
				var button = $('<button onclick="removeMsc(' + id + ',this);">删除</button>');
				td7.append(button);
			}
		}
	});
}

function removeMsc(id,ele){
	var url = "mscController.do?remove";
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