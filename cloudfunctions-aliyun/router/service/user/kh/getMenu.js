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
			}, event.util);
			// 将子菜单合并到父菜单的children字段中
			for(let i in perRes.rows){
				perRes.rows[i].menu_id = perRes.rows[i].permission_id;
				perRes.rows[i].name = perRes.rows[i].permission_name;
			}
			res.menus = buildMenus(perRes.rows);
			res.menuList = perRes.rows;
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}


function buildMenus(menuList) {
    // 保证父子级顺序
    menuList = menuList.sort(function(a, b) {
        if (a.parent_id === b.permission_id) {
            return 1
        }
        return -1
    })
    // 删除无subMenu且无url的菜单项
    for (let i = menuList.length - 1; i > -1; i--) {
        const currentMenu = menuList[i]
        const subMenu = menuList.filter(subMenuItem => subMenuItem.parent_id === currentMenu.permission_id)
        if (!currentMenu.url && !subMenu.length) {
            menuList.splice(i, 1)
        }
    }
    const menu = menuList.filter(item => !item.parent_id)

    function buildMenu(menu) {
        let nextLayer = []
        for (let i = menu.length - 1; i > -1; i--) {
            const currentMenu = menu[i]
            if (currentMenu.url) {
                continue
            }
            const subMenu = menuList.filter(item => item.parent_id === currentMenu.permission_id)
            nextLayer = nextLayer.concat(subMenu)
            currentMenu.children = subMenu
        }
        if (nextLayer.length) {
            buildMenu(nextLayer)
        }
    }
    buildMenu(menu)
    return menu
}