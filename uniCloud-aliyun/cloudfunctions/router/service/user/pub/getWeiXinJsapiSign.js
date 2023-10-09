'use strict';
module.exports = {
	/**
	 * 获取公众号jsapi签名
	 * @url user/pub/getWeiXinJsapiSign 前端调用的url参数地址
	 * data 请求参数
	 * @param {String} url 浏览器上的地址，前端直接用 let url = window.location.href 即可获取
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: "" };
		// 业务逻辑开始-----------------------------------------------------------

		let {
			url
		} = data;

		res = await vk.openapi.weixin.h5.auth.getJsapiSign({
			url
		});

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}