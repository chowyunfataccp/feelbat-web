$(document).ready(function(){
	loadMall();
	
	$("#ckbox").click(function(event){
		  var flag = false;
		  $("#categoryDiv>button").each(function(){
				if($(this).hasClass("categoryClass")){
					flag = true;
					$(this).removeClass("categoryClass");
				}
			});
		  if(!flag){
			  event.preventDefault();
		  }
		});
	
	$("#categoryDiv>button").each(function(){
		  $(this).click(
			function(){
		  	if(!$(this).hasClass("categoryClass")){
		  		$("#ckbox").attr("checked",false);
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
		  
	$("#statusDiv>button").each(function(){
		$(this).click(
				function(){
			  	if(!$(this).hasClass("statusClass")){
			  		changeStatus();
			  		$(this).addClass("statusClass");
			  	}
				}
	);});
			  
	function changeStatus(){
		$("#statusDiv>button").each(function(){
			$(this).removeClass("statusClass");
		});
	}
	
	
	$("#resetBtn").click(resetClick);
	
	$("#toAddShopBtn").click(function(){
		window.parent.change("shopController.do?toAddShop1");
	 });
	
	$("#searchBtn").click(function (){
		navi(1);
	});
	$("#searchBtn").click();
});

/////////////////////////


function rendTable(list){
	  $("#result").empty();
	  for(var itemm in list){
		  var item = list[itemm];
		  var td1 = $("<td></td>");
		  td1.append(item.activetime);
		  var td2 = $("<td></td>");
		  td2.append(item.mallname);
		  var td3 = $("<td></td>");
		  td3.append(item.name);
		  var td4 = $("<td></td>");
		  td4.append(item.tel);
		  var td5 = $("<td></td>");
		  var status = item.status;
		  if(status == "0"){
			  status = "初始";
		  }else if(status == "1"){
			  status = "已激活";
		  }else if(status == "2"){
			  status = "下线";
		  }
		  td5.append(status);
		  var td6 = $("<td></td>");
		  var category = item.category;
		  if(category == 1){
			  category = "美食&餐饮";
		  }else if(category == 2){
			  category = "服饰&美妆";
		  }else if(category == 3){
			  category = "鞋包&珠宝";
		  }else if(category == 4){
			  category = "美容&美体";
		  }else if(category == 5){
			  category = "休闲&娱乐";
		  }else if(category == 6){
			  category = "培训&教育";
		  }else if(category == 7){
			  category = "母婴&亲子";
		  }else{
			  category = "其它";
		  }
		  td6.append(category);
		  var td7 = $("<td></td>");
		  if(item.usertotal != null){
			  td7.append(item.usertotal);
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

function resetClick(){
	$("#mallSel").val("");
	$("#ckbox").click();
	$("#statusDiv>button").each(function(){
		if($(this).val() == ""){
			$(this).click();
		}
		});
}


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
		  $("#mallSel").append(option);
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

function navi(pageNow){
	var mallId = $("#mallSel").val();
	var category = "";
	if(!$("#ckbox").is(":checked")){
		$("#categoryDiv>button").each(function(){
		  	if($(this).hasClass("categoryClass")){
		  		category = $(this).val();
		  	}
		});
	}
	var status = "";
	$("#statusDiv>button").each(function(){
	  	if($(this).hasClass("statusClass")){
	  		status = $(this).val();
	  	}
	});
	var url = "shopController.do?search";
	var formData = new Object();
	formData["mallId"] = mallId;
	formData["category"] = category;
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


