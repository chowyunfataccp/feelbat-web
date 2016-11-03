<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/webpage/common/mytags.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>公众号图文消息</title>
<style type="text/css">
	.rangeClass{
		background-color: blue;
	}
	.typeClass{
		background-color: red;
	}
</style>
<script type="text/javascript" src="jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/qrcode/setMsg.js"></script>

</head>

<body>
<div>
	<c:if test="${empty purpose}">
		裸公众号
	</c:if>
	<c:if test="${purpose=='0'}">
		mall公众号
	</c:if>
	<c:if test="${purpose=='1'}">
		shop公众号
	</c:if>
	<input id="purpose" value="${purpose}">
	<input id="scene_id" value="${scene_id}">
</div>
<table>
<thead>
<tr>
<td></td>
<td>标题</td>
<td>图标地址</td>
<td>链接目标地址</td>
</tr>
</thead>
<tbody>
<c:forEach items="${msgList}" var="item">
<tr>
<td>${item.seq}</td>
<td><input id="title${item.seq}" value="${item.title }"></td>
<td><input id="picurl${item.seq}" value="${item.picurl }"></td>
<td><input id="url${item.seq}" value="${item.url }"></td>
</tr>
</c:forEach>
<c:if test="${fn:length(msgList)<9}">
<c:forEach var="i" begin="${fn:length(msgList)+1 }" end="9">
<tr>
<td>${i}</td>
<td><input id="title${i}"></td>
<td><input id="picurl${i}"></td>
<td><input id="url${i}"></td>
</tr>
</c:forEach>
</c:if>

</tbody>
</table>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="setMsgBtn">提交</button>
</body>
</html>




