package com.feelbat.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.feelbat.json.AjaxJson;
import com.feelbat.model.Client;
import com.feelbat.model.ClientManager;
import com.feelbat.util.ContextHolderUtils;
import com.feelbat.util.IpUtil;

@Scope("prototype")
@Controller
@RequestMapping("/loginController")
public class LoginController extends BaseController{
	private Logger logger = Logger.getLogger(LoginController.class);

	/**
	 * 检查用户名称
	 * 
	 * @param user
	 * @param req
	 * @return
	 */
	@RequestMapping(params = "checkuser")
	@ResponseBody
	public AjaxJson checkuser(HttpServletRequest req) {
		
		HttpSession session = ContextHolderUtils.getSession();
		AjaxJson j = new AjaxJson();
        
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		
		if("admin".equals(username) && "123456".equals(password)){
			j.setMsg("登录成功！");
			j.setSuccess(true);
			Client client = new Client();
	         client.setIp(IpUtil.getIpAddr(req));
	         client.setLogindatetime(new Date());
	         client.setUsername(username);
	         ClientManager.getInstance().addClient(session.getId(),client);
		}else{
			j.setMsg("登录失败！！！");
			j.setSuccess(false);
		}
		return j;
	}

	/**
	 * 用户登录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(params = "login")
	public String login(ModelMap modelMap,HttpServletRequest request) {
		HttpSession session = ContextHolderUtils.getSession();
		String username = null;
		if(ClientManager.getInstance().getClient(session.getId())!=null){
			username = ClientManager.getInstance().getClient(session.getId()).getUsername();
		}
		if(username != null){
            modelMap.put("userName", username);
			return "main/main";
		} else {
			return "login/login";
		}

	}
	
	/**
	 * 退出系统
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(params = "logout")
	public ModelAndView logout(HttpServletRequest request) {
		HttpSession session = ContextHolderUtils.getSession();
		ClientManager.getInstance().removeClient(session.getId());
//		ModelAndView modelAndView = new ModelAndView(new RedirectView(
//				"loginController.do?login"));
		ModelAndView modelAndView = new ModelAndView("login/login");
		return modelAndView;
	}

	/**
	 * 无权限页面提示跳转
	 * 
	 * @return
	 */
	@RequestMapping(params = "noAuth")
	public ModelAndView noAuth(HttpServletRequest request) {
		return new ModelAndView("common/noAuth");
	}
	

}
