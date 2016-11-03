<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/webpage/common/mytags.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>商铺列表</title>
<style type="text/css">
	.categoryClass{
		background-color: blue;
	}
	.statusClass{
		background-color: red;
	}
</style>
<script type="text/javascript" src="jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/shop/shopList.js"></script>

</head>

<body>
<div>
商圈：<select id="mallSel">
	<option value="" selected>不限</option>
</select>
</div>
<div id="categoryDiv">
类目：<input id="ckbox" type="checkbox" value="" checked>全部&nbsp;&nbsp;
<button value="1">美食&餐饮</button>&nbsp;&nbsp;
<button value="2">服饰&美妆</button>&nbsp;&nbsp;
<button value="3">鞋包&珠宝</button>&nbsp;&nbsp;
<button value="4">美容&美体</button>&nbsp;&nbsp;<br>
<button value="5">休闲&娱乐</button>&nbsp;&nbsp;
<button value="6">培训&教育</button>&nbsp;&nbsp;
<button value="7">母婴&亲子</button>&nbsp;&nbsp;
<button value="8">其它</button>&nbsp;&nbsp;
</div>
<div id="statusDiv">
商铺状态：<button value=""  class="statusClass">不限</button>&nbsp;&nbsp;
<button value="0" >初始</button>&nbsp;&nbsp;
<button value="1" >激活</button>&nbsp;&nbsp;
<button value="2" >已下线</button>&nbsp;&nbsp;
</div>
&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="resetBtn" value="重置">
&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="searchBtn" value="查询">
&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="toAddShopBtn" value="新建商铺">
<hr>
<table>
	<thead><tr>
		<td>入驻时间</td>
		<td>商圈</td>
		<td>商铺名称</td>
		<td>TEL</td>
		<td>商铺状态</td>
		<td>类目</td>
		<td>用户数</td>
	</tr></thead>
	<tbody id="result">
	</tbody>
</table>
<hr>
<div align="center" id="navigation">
</div>
</body>
</html>




