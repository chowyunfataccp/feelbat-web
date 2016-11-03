<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/webpage/common/mytags.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>商圈列表</title>
<style type="text/css">
	.areaClass{
		background-color: blue;
	}
</style>
<script type="text/javascript" src="jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/mall/mallList.js"></script>

</head>

<body>
<div id="areaDiv">
类型：<button value="" class="areaClass">全部</button>&nbsp;&nbsp;
	<button value="0">松江</button>&nbsp;&nbsp;
	<button value="1">嘉定</button>&nbsp;&nbsp;
	<button value="2">金山</button>&nbsp;&nbsp;
	<button value="3">闵行</button>&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mall length:<label id="countLabel"></label>&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="toAddMallBtn" value="新建商圈">
</div>
<hr>
<table>
	<thead><tr>
		<td>区域</td>
		<td>商圈名称</td>
		<td>商铺数</td>
		<td>用户数</td>
		<td>参数值</td>
		<td>二维码</td>
		<td>操作</td>
	</tr></thead>
	<tbody id="result">
	</tbody>
</table>
</body>
</html>




