module.exports = {
  /**
   * 用户登录(支付宝授权)
   * @url user/pub/loginByEmail 前端调用的url参数地址
   * @description 用户登录(支付宝授权)
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
	 * data 请求参数 说明
	 * @params {String} email 邮箱
	 * @params {String} code 邮箱收到的验证码
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 * @params {String} token 登录成功之后返回的token信息
	 * @params {String} tokenExpired token过期时间
   */
	main: async (event) => {
		let { data = {}, util, originalParam } = event;
		let { uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = {};
		// 业务逻辑开始----------------------------------------------------------- 
		res = await uniID.loginByEmail(event.data);
		if(res.token){
			// 日志服务
			const loginLogService = vk.require("service/user/util/login_log");	
			await loginLogService.add({
				"type": "login",
				"login_type": "email",
				"user_id": res.uid,
				"ip": originalParam.context.CLIENTIP,
				"ua": originalParam.context.CLIENTUA,
				"context" :  originalParam.context,
				"os": originalParam.context.OS,
				"platform": originalParam.context.PLATFORM
			},event.util);
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}