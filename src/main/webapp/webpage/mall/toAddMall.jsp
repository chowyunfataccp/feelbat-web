<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/webpage/common/mytags.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>添加商圈</title>
<script type="text/javascript" src="jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/mall/toAddMall.js"></script>

</head>

<body>
please:添加商圈:
area:<select id="area">
	<option value="0" selected>松江</option>
	<option value="1">嘉定</option>
	<option value="2">金山</option>
	<option value="3">闵行</option>
</select><br>
name:<input id="name" value="zs"><br>
addr:<input id="addr" value="addr"><br>
<button id="addMallBtn">submit</button><br>
<div id="msg"></div>
</body>
</html>




