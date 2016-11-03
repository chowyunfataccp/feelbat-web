package com.feelbat.listener;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.web.context.ServletContextAware;

import com.feelbat.service.IMenuService;
import com.feelbat.util.ApplicationContextUtil;

public class InitDataListener implements InitializingBean, ServletContextAware {

	private IMenuService menuService;
	
	
	public void setServletContext(ServletContext arg0) {
	}

	public void afterPropertiesSet() throws Exception {
		menuService = (IMenuService)ApplicationContextUtil.getBean("menuService");
		menuService.loadAll();
	}
	

}
