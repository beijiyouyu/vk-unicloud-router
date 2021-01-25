'use strict';
module.exports = {
	/**
	 * 获取我的菜单列表
	 * @url user/kh/getMenu 前端调用的url参数地址
	 * @description 此函数描述
	 * @params {Object} data 请求参数
	 * @params {String} uniIdToken 用户token
	 * @params {String} userInfo 当前登录用户信息（可信任，仅kh目录下的函数有此值）
	 * pub目录下请求参数需要带上need_user_info = true
	 * @params {Object} util 公共工具包
	 * @params {Object} filterResponse 过滤器返回的数据
	 * @params {Object} originalParam 原始请求参数（包含了原始event和context）
	 * data 请求参数 说明
	 * @params {String} uid  当前登录用户id（可信任，仅kh目录下的函数有此值）
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		//  注意: userInfo 和 uid 是可信任的，但默认只有kh目录下的函数才有此值
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始----------------------------------------------------------- 
		let tokenRes = await uniID.checkToken(event.uniIdToken);
		let { permission } = tokenRes;
		userInfo.permission = permission;
		res.userInfo = userInfo;
		if(vk.pubfn.isNotNull(permission)){
			let perRes = await vk.baseDao.select({
				dbName:"uni-id-permissions",
				pageSize:-1,
				whereJson:{
					permission_id : _.in(permission),
					type : 0
				},
				sortArr:[{"name":"sort","type":"asc"}]
			});
			// 将子菜单合并到父菜单的children字段中
			for(let i in perRes.rows){
				perRes.rows[i].menu_id = perRes.rows[i].permission_id;
				perRes.rows[i].name = perRes.rows[i].permission_name;
			}
			res.menus = vk.pubfn.arrayToTree(perRes.rows,{ 
				id:"menu_id", 
				parent_id:"parent_id", 
				children:"children",
			});
			res.menuList = perRes.rows;
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}