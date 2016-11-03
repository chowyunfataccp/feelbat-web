<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/webpage/common/mytags.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>添加商铺,第三步：品牌介绍（选填）</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/syntax.css">
    <link rel="stylesheet" type="text/css" href="css/iustyle.css">
    <link rel="stylesheet" type="text/css" href="css/webuploader.css">
    <link rel="stylesheet" type="text/css" href="css/iu.css">
    <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/shop/toAddShop.js"></script>
<style type="text/css">
	.categoryClass{
		background-color: blue;
	}
</style>
</head>

<body>
商圈：<select id="mallSel">
	<option value="" selected>请选择</option>
</select><br>
商铺名称:<input id="shopName" value="zs"><br>
商铺地址:<input id="shopAddr" value="addr"><br>
楼层:<select id="floor">
	<option value="F5">F5</option>
	<option value="F4">F4</option>
	<option value="F3">F3</option>
	<option value="F2">F2</option>
	<option value="F1" selected>F1</option>
	<option value="B1">B1</option>
	<option value="B2">B2</option>
</select>
<div id="categoryDiv">
类目：<button value="1"  class="categoryClass">美食&餐饮</button>&nbsp;&nbsp;
<button value="2">服饰&美妆</button>&nbsp;&nbsp;
<button value="3">鞋包&珠宝</button>&nbsp;&nbsp;
<button value="4">美容&美体</button>&nbsp;&nbsp;
<button value="5">休闲&娱乐</button>&nbsp;&nbsp;
<button value="6">培训&教育</button>&nbsp;&nbsp;
<button value="7">母婴&亲子</button>&nbsp;&nbsp;
<button value="8">其它</button>&nbsp;&nbsp;
<div>

Tel:<input id="tel" value="021-1234567"><br>
营业时间:<select id="hoursfrom">
	<option value="08:00">早8:00</option>
	<option value="08:30">早8:30</option>
	<option value="09:00">早9:00</option>
	<option value="09:30">早9:30</option>
	<option value="10:00">早10:00</option>
	<option value="10:30">早10:30</option>
	<option value="11:00">早11:00</option>
	<option value="11:30">早11:30</option>
	<option value="12:00">中午12:00</option>
	<option value="12:30">中午12:30</option>
	<option value="13:00">中午13:00</option>
	<option value="13:30">中午13:30</option>
	<option value="14:00">中午14:00</option>
</select>到<select id="hoursto">
	<option value="15:00">15:00(下午)</option>
	<option value="15:30">15:30</option>
	<option value="16:00">16:00</option>
	<option value="16:30">16:30</option>
	<option value="17:00">17:00(晚)</option>
	<option value="17:30">17:30</option>
	<option value="18:00">18:00</option>
	<option value="18:30">18:30</option>
	<option value="19:00">19:00</option>
	<option value="19:30">19:30</option>
	<option value="20:00">20:00</option>
	<option value="20:30">20:30</option>
	<option value="21:00">21:00(推荐)</option>
	<option value="21:30">21:30</option>
	<option value="22:00">22:00</option>
	<option value="22:30">22:30</option>
	<option value="23:00">23:00</option>
	<option value="23:30">23:30</option>
	<option value="24:00">24:00</option>
</select><br>

<div class="page-container">
        <h1 id="demo">Demo</h1>

<p>您可以点击添加图片按钮，来体验此demo.</p>

<div id="uploader" class="wu-example">
    <div class="queueList">
        <div id="dndArea" class="placeholder">
            <div id="filePicker"></div>
            <p>或将照片拖到这里，单次最多可选300张</p>
        </div>
    </div>
    <div class="statusBar" style="display:none;">
        <div class="progress">
            <span class="text">0%</span>
            <span class="percentage"></span>
        </div><div class="info"></div>
        <div class="btns">
            <div id="filePicker2"></div><div class="uploadBtn">开始上传</div>
        </div>
    </div>
</div>

    </div>

<script type="text/javascript">
    // 添加全局站点信息
    var BASE_URL = '/feelbat';
    </script>

<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/global.js"></script>
<script type="text/javascript" src="js/webuploader.js"></script>
<script type="text/javascript" src="js/iu.js"></script>
</body>
</html>




