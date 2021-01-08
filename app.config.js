module.exports = {
	// 开发模式启用调式模式(请求时会打印日志)
	debug:process.env.NODE_ENV !== 'production',
	// 主云函数名称
	functionName:"router",
	// 登录页面路径
	login: {
		url: '/pages_template/uni-id/login/index/index'
	},
	// 404 Not Found 错误页面路径
	error: {
		url: '/pages/error/404/404'
	},
	/**
	 * app主题颜色 
	 * $app.config.color.main
	 * $app.config.color.secondary
	 */
	color:{
		main:"#ff4444",
		secondary:"#555555"
	},
	// 需要检查是否登录的页面列表
	checkTokenPages:{
		/**
		 * mode = 0 代表自动检测
		 * mode = 1 代表list内的页面需要登录
		 * mode = 2 代表list内的页面不需要登录
		 */
		mode:2, 
		list:[
			"/pages/login/*",
			"/pages_template/*"
		]
	},
	// 静态文件的资源URL地址
	staticUrl:{
		// Logo
		logo: '/static/logo.png',
	},
}
