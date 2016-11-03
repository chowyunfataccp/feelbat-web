<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/webpage/common/mytags.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>带参二维码</title>
<style type="text/css">
	.rangeClass{
		background-color: blue;
	}
	.typeClass{
		background-color: red;
	}
</style>
<script type="text/javascript" src="jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/qrcode/qrcode.js"></script>

</head>

<body>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="tosetDefaultMsgBtn">图文消息设置</button>
<hr>
<div id="statusDiv">
状态：<input value="" type="checkbox" checked>不限&nbsp;&nbsp;
	<input value="1" type="checkbox">使用中&nbsp;&nbsp;
	<input value="0" type="checkbox">闲置
</div>
<div id="typeDiv">
类型：<button value="" class="typeClass">不限</button>&nbsp;&nbsp;
	<button value="0">mall</button>&nbsp;&nbsp;
	<button value="1">shop</button>&nbsp;&nbsp;
	<button value="2">partner</button>
</div>
<div id="rangeDiv">
时间：<button value="" class="rangeClass">不限</button>&nbsp;&nbsp;
	<button value="1">100-199</button>&nbsp;&nbsp;
	<button value="2">200-299</button>&nbsp;&nbsp;
	<button value="3">300以上</button>&nbsp;&nbsp;
	<input id="selfDefine" type="checkbox">自定义&nbsp;&nbsp;<input id="start">-<input id="end">
</div>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="searchBtn">查询</button>
<hr>
<table>
	<thead><tr>
		<td>状态</td>
		<td>参数类型</td>
		<td>参数值</td>
		<td>二维码</td>
		<td>图文消息</td>
	</tr></thead>
	<tbody id="result">
		<c:forEach var="item" items="${page.list}">     
      	<tr>
      		<td><c:choose>
      			<c:when test="${item.status == '0'}">闲置</c:when>
      			<c:when test="${item.status == '1'}">使用中</c:when>
      			<c:otherwise>未知</c:otherwise>
      		</c:choose></td> 
      		<td><c:choose>
      			<c:when test="${item.purpose == '0'}">mall</c:when>
      			<c:when test="${item.purpose == '1'}">shop</c:when>
      			<c:when test="${item.purpose == '2'}">partner</c:when>
      			<c:otherwise>未知</c:otherwise>
      		</c:choose></td>
      		<td>${item.scene_id }</td> 
      		<td><button onclick="viewImage('${item.ticket }')">view</button></td>  
      		<td><button onclick="tosetMsg('${item.scene_id }')">设置</button></td>  
      	</tr>     
		</c:forEach>
	</tbody>
</table>
<hr>
<!-- 分页功能 start -->
	<div align="center" id="navigation">
		<font size="2">共 ${page.totalPageCount} 页</font> <font size="2">第
			${page.pageNow} 页</font> 
			<a href="javascript:void(0)" onclick="navi(1)">首页</a>
		<c:choose>
			<c:when test="${page.pageNow - 1 > 0}">
				<a href="javascript:void(0)" onclick="navi(${page.pageNow - 1})">上一页</a>
			</c:when>
			<c:when test="${page.pageNow - 1 <= 0}">
				<a href="javascript:void(0)" onclick="navi(1)">上一页</a>
			</c:when>
		</c:choose>
		<c:choose>
			<c:when test="${page.totalPageCount==0}">
				<a href="javascript:void(0)" onclick="">下一页</a>
			</c:when>
			<c:when test="${page.pageNow + 1 < page.totalPageCount}">
				<a href="javascript:void(0)" onclick="navi(${page.pageNow + 1})">下一页</a>
			</c:when>
			<c:when test="${page.pageNow + 1 >= page.totalPageCount}">
				<a href="javascript:void(0)" onclick="navi(${page.totalPageCount})">下一页</a>
			</c:when>
		</c:choose>
		<c:choose>
			<c:when test="${page.totalPageCount==0}">
				<a href="javascript:void(0)" onclick="">尾页</a>
			</c:when>
			<c:otherwise>
				<a href="javascript:void(0)" onclick="navi(${page.totalPageCount})">尾页</a>
			</c:otherwise>
		</c:choose>
	</div>
	<!-- 分页功能 End -->
</body>
</html>




