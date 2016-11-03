<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/webpage/common/mytags.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>飞巴商圈</title>
<link href="css/zice.style.css" rel="stylesheet" type="text/css" />
<link href="css/buttons.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/tipsy.css" media="all" />
<style type="text/css">
html {
	background-image: none;
}

label.iPhoneCheckLabelOn span {
	padding-left: 0px
}

#versionBar {
	background-color: #212121;
	position: fixed;
	width: 100%;
	height: 35px;
	bottom: 0;
	left: 0;
	text-align: center;
	line-height: 35px;
	z-index: 11;
	-webkit-box-shadow: black 0px 10px 10px -10px inset;
	-moz-box-shadow: black 0px 10px 10px -10px inset;
	box-shadow: black 0px 10px 10px -10px inset;
}

.copyright {
	text-align: center;
	font-size: 10px;
	color: #CCC;
}

.copyright a {
	color: #A31F1A;
	text-decoration: none
}

.on_off_checkbox {
	width: 0px;
}

#login .logo {
	width: 500px;
	height: 51px;
}
</style>
</head>
<body>
    <div id="alertMessage"></div>
    <div id="successLogin"></div>
    <div class="text_success"><img src="images/loader_green.gif" alt="Please wait" /> <span>登陆成功!请稍后....</span></div>
    <div id="login">
        <div class="ribbon" style="background-image: url(images/login.png);"></div>
        <div class="inner">
            <div class="logo"><img src="images/logo.png" /></div>
            <div class="formLogin">
                <form name="formLogin" id="formLogin" action="loginController.do?login" check="loginController.do?checkuser" method="post">
                    <div class="tip">
                        <input class="userName" name="username" type="text" id="username" title="用户名" iscookie="true" value="admin" nullmsg="请输入用户名!" />
                    </div>
                    <div class="tip">
                        <input class="password" name="password" type="password" id="password" title="密码" value="123456" nullmsg="请输入密码!" />
                    </div>
                    <div class="loginButton">
                        <div style="float: left; margin-left: -9px;">
                            <input type="checkbox" id="on_off" name="remember" checked="ture" class="on_off_checkbox" value="0" />
                            <span class="f_help">是否记住用户名 ?</span>
                        </div>

                        <div style="float: right; padding: 3px 0; margin-right: -12px;">
                            <div>
                                <ul class="uibutton-group">
                                    <li><a class="uibutton normal" href="#" id="but_login">登陆</a></li>
                                    <li><a class="uibutton normal" href="#" id="forgetpass">重置</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </form>
            </div>
        </div>
        <div class="shadow"></div>
    </div>
    <!--Login div-->
    <div class="clear"></div>
    <div id="versionBar">
        <div class="copyright">&copy; 版权所有 <span class="tip"><a href="http://www.feelbat.com" title="飞巴商圈">飞巴商圈</a> (推荐使用IE8+,谷歌浏览器可以获得更快,更安全的页面响应速度)技术支持:<a href="http://www.feelbat.com" title="飞巴商圈">飞巴商圈</a></span></div>
    </div>
    <!-- Link JScript-->
    <script type="text/javascript" src="jquery/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="jquery/jquery.cookie.js"></script>
    <script type="text/javascript" src="jquery/jquery-jrumble.js"></script>
    <script type="text/javascript" src="jquery/jquery.tipsy.js"></script>
    <script type="text/javascript" src="js/login/iphone.check.js"></script>
    <script type="text/javascript" src="js/login/login.js"></script>
</body>
</html>