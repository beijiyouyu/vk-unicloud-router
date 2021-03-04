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
	// 日志风格
	logger:{
		colorArr:[
			"#0095f8",
			"#67C23A"
		]
	},
	/**
	 * app主题颜色
	 * vk.getVuex('$app.config.color.main')
	 * vk.getVuex('$app.config.color.secondary')
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
		 * 注意1: list内是通配符表达式,非正则表达式
		 * 注意2: 需要使用 vk.navigateTo 代替 uni.navigateTo 进行页面跳转才会生效
		 */
		mode:2,
		list:[
			"/pages_template/*",
			"/pages/login/*",
			"/pages/index/*",
			"/pages/error/*"
		]
	},
	// 静态文件的资源URL地址
	staticUrl:{
		// Logo
		logo: '/static/logo.png',
	},
	// 自定义拦截器
	interceptor:{

		// login:function(obj){
		// 	let { vk, params, res } = obj;
		// 	//console.log("params:",params);
		// 	//console.log("res:",res);
		// 	if(!params.noAlert){
		// 		vk.alert(res.msg);
		// 	}
		// 	console.log("跳自己的登录页面");
		// 	// 上方代码可自己修改，写成你自己的逻辑处理。
		// },

		// fail:function(obj){
		// 	let { vk, params, res } = obj;
		// 	//console.log("params:",params);
		// 	//console.log("res:",res);
		// 	return false;// 返回false则取消框架内置fail的逻辑,返回true则会继续执行框架内置fail的逻辑
		// 	// 上方代码可自己修改，写成你自己的逻辑处理。
		// }
		
	}
}
