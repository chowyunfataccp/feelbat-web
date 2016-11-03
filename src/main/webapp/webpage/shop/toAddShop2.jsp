<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/webpage/common/mytags.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>添加商铺,第二步：Logo&实景图</title>
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
<script type="text/javascript" src="js/shop/toAddShop2.js"></script>
<style type="text/css">
	.categoryClass{
		background-color: blue;
	}
</style>
</head>

<body>
<div class="page-container">
        <h1 id="demo">Demo</h1>

<p>添加Logo、门面、实景图.</p>

<div id="uploaderLogo" class="wu-example mygod">
    <div class="queueList">
        <div class="placeholder">
            <div id="filePicker1Logo"></div>
            <p>Logo，单次最多可选1张</p>
        </div>
    </div>
    <div class="statusBar" style="display:none;">
        <div class="progress">
            <span class="text">0%</span>
            <span class="percentage"></span>
        </div><div class="info"></div>
        <div class="btns">
            <div id="filePicker2Logo" class="mygod2"></div><div class="uploadBtn">开始上传</div>
        </div>
    </div>
</div>

<div id="uploaderFace" class="wu-example mygod">
    <div class="queueList">
        <div class="placeholder">
            <div id="filePicker1Face"></div>
            <p>门面，单次最多可选1张</p>
        </div>
    </div>
    <div class="statusBar" style="display:none;">
        <div class="progress">
            <span class="text">0%</span>
            <span class="percentage"></span>
        </div><div class="info"></div>
        <div class="btns">
            <div id="filePicker2Face" class="mygod2"></div><div class="uploadBtn">开始上传</div>
        </div>
    </div>
</div>

<div id="uploaderInner" class="wu-example mygod">
    <div class="queueList">
        <div class="placeholder">
            <div id="filePicker1Inner"></div>
            <p>店铺实景图，单次最多可选10张</p>
        </div>
    </div>
    <div class="statusBar" style="display:none;">
        <div class="progress">
            <span class="text">0%</span>
            <span class="percentage"></span>
        </div><div class="info"></div>
        <div class="btns">
            <div id="filePicker2Inner"  class="mygod2"></div><div class="uploadBtn">开始上传</div>
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
<script type="text/javascript" src="js/iuFace.js"></script>

<hr>
<center><input type="button" id="nextBtn" value="下一步"></center>
</body>
</html>




