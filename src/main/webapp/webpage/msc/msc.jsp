<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/webpage/common/mytags.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>消息中心</title>
<style type="text/css">
	.timeClass{
		background-color: blue;
	}
	.typeClass{
		background-color: red;
	}
</style>
<script type="text/javascript" src="jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/msc/msc.js"></script>

</head>

<body>
<div id="timeDiv">
时间：<button value="1">今天</button>&nbsp;&nbsp;
	<button value="3" class="timeClass">三天内</button>&nbsp;&nbsp;
	<button value="7">七天内</button>&nbsp;&nbsp;
	<button value="30">一月内</button>&nbsp;&nbsp;
	<button value="100">更早</button>
</div>

<div id="typeDiv">
类型：<button value="" class="typeClass">不限</button>&nbsp;&nbsp;
	<button value="0">订单</button>&nbsp;&nbsp;
	<button value="1">提款</button>&nbsp;&nbsp;
	<button value="2">激活</button>
</div>

<div id="statusDiv">
状态：<input value="" type="checkbox" checked>不限&nbsp;&nbsp;
	<input value="0" type="checkbox">未处理&nbsp;&nbsp;
	<input value="1" type="checkbox">已处理
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="searchBtn">查询</button>
<hr>
<table>
	<thead><tr>
		<td>时间</td>
		<td>类型</td>
		<td>商铺</td>
		<td>管理员</td>
		<td>用户</td>
		<td>状态</td>
		<td>操作</td>
	</tr></thead>
	<tbody id="result">
		<c:forEach var="item" items="${list}">     
      	<tr>
      		<td>${item.optime }</td>  
      		<td><c:choose>
      			<c:when test="${item.optype == '0'}">订单</c:when>
      			<c:when test="${item.optype == '1'}">提款</c:when>
      			<c:when test="${item.optype == '2'}">激活</c:when>
      			<c:otherwise>未知</c:otherwise>
      		</c:choose></td> 
      		<td>${item.shopName }</td> 
      		<td></td>
      		<td></td>
      		<td><c:choose>
      			<c:when test="${item.status == '0'}">未处理</c:when>
      			<c:when test="${item.status == '1'}">已处理</c:when>
      			<c:otherwise>未知</c:otherwise>
      		</c:choose></td>
      		<td><c:choose>
      			<c:when test="${item.status == '0'}"><button onclick="handle(${item.id},this);">处理</button></c:when>
      			<c:when test="${item.status == '1'}"><button onclick="removeMsc(${item.id},this);">删除</button></c:when>
      			<c:otherwise></c:otherwise>
      		</c:choose></td>   
      	</tr>     
		</c:forEach>
	</tbody>
</table>
</body>
</html>




