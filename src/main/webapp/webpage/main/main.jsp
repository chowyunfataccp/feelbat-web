<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/webpage/common/mytags.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>飞巴商圈</title>
<link rel="stylesheet" href="${webRoot }/css/style.css">
<link rel="stylesheet" type="text/css" href="css/common.css"/>
<link rel="stylesheet" type="text/css" href="css/main.css"/>

<script>
	function change(page){
		document.getElementById("iframe").src=page;
	}
	function exit(){
		window.location.href = "loginController.do?logout";
	}
	
	function iFrameHeight() {   
		var ifm= document.getElementById("iframe");   
		var subWeb = document.frames ? document.frames["iframe"].document : ifm.contentDocument;   
		if(ifm != null && subWeb != null) {
		   ifm.height = subWeb.body.scrollHeight;
		   ifm.width = subWeb.body.scrollWidth;
		 }
}   
</script>

</head>

<body>
<div class="top"> <img class="logo" src="${webRoot }/images/main/logo.png">
  <div class="tab1" id="tab1">
    <div class="menu">
      <ul class="nav">
        <li onclick="change('mscController.do?list')"><a href="#"><img src="${webRoot }/images/main/1430958346122214_06.png">
          <p>消息中心</p>
          </a></li>
        <li onclick="change('qrcodeController.do?list')"><a href="#"><img src="${webRoot }/images/main/14309583461214_06.png">
          <p>带参数二维码</p>
          </a></li>
        <li onclick="change('mallController.do?list')"><a href="#"><img src="${webRoot }/images/main/14309583461214_08.png">
          <p>商圈管理</p>
          </a></li>
        <li  onclick="setTab('one',3)"><a href="#"><img src="${webRoot }/images/main/14309583461214_16.png">
          <p>用户列表</p>
          </a></li>
        <li id="one4" onclick="setTab('one',4)"><a href="#"><img src="${webRoot }/images/main/14309583461214_18.png">
          <p>商圈</p>
          </a></li>
        <li id="one5" onclick="setTab('one',5)"><a href="#"><img src="${webRoot }/images/main/14309583461214_10.png">
          <p></p>
          </a></li>
        <li id="one6" onclick="exit()"><a href="#"><img src="${webRoot }/images/main/exit.jpg">
          <p>退出</p>
          </a></li>
      </ul>
    </div>
  </div>
</div>

<div class="container clearfix">
    <div class="sidebar-wrap">
        <div class="sidebar-title">
            <h1>菜单</h1>
        </div>
        <div class="sidebar-content">
            <ul class="sidebar-list">
                <li>
                    <a href="#"><i class="icon-font">&#xe003;</i>常用操作</a>
                    <ul class="sub-menu">
                        <li onclick="change('mscController.do?list')"><a href="#"><i class="icon-font">&#xe008;</i>消息中心</a></li>
                        <li onclick="change('qrcodeController.do?list')"><a href="#"><i class="icon-font">&#xe008;</i>带参数二维码</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#"><i class="icon-font">&#xe018;</i>商圈管理</a>
                    <ul class="sub-menu">
                        <li onclick="change('mallController.do?list')"><a href="#"><i class="icon-font">&#xe017;</i>商圈列表</a></li>
                        <li onclick="change('mallController.do?toAddMall')"><a href="#"><i class="icon-font">&#xe037;</i>新建商圈</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#"><i class="icon-font">&#xe018;</i>商铺管理</a>
                    <ul class="sub-menu">
                        <li onclick="change('shopController.do?list')"><a href="#"><i class="icon-font">&#xe017;</i>商铺列表</a></li>
                        <li onclick="change('shopController.do?toAddShop1')"><a href="#"><i class="icon-font">&#xe037;</i>新建商铺</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <!--/sidebar-->
    <div class="main-wrap">
        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="index.html" color="#white">首页</a><span class="crumb-step">&gt;</span><span class="crumb-name">订单查询</span></div>
        </div>
        
        <div class="search-wrap">
            <div class="search-content">
	            <iframe id="iframe" src="mscController.do?list" frameborder="0" scrolling="no" width="100%" height="100%" onLoad="iFrameHeight()"/>
            </div>
            
        </div>
        
    </div>
    <!--/main-->
</div>




</body>
</html>
