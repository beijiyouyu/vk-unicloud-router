'use strict';
module.exports = {
	/**
	 * 获取我的菜单列表
	 * @url user/kh/getMenu 前端调用的url参数地址
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
		res.userInfo = userInfo;
		if(userInfo.role.indexOf("admin") === -1 && vk.pubfn.isNull(userInfo.permission)){
			return res;
		}
		let whereJson = {};
		if(userInfo.role.indexOf("admin") === -1){
			whereJson["permission_id"] =  _.in(userInfo.permission);
		}
		whereJson["type"] = 0;
		let perRes = await vk.baseDao.select({
			dbName:"uni-id-permissions",
			pageSize:500,
			whereJson,
			sortArr:[{ "name":"sort","type":"asc" }]
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
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
