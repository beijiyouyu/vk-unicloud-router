/**
 * 用户相关表操作
 */
const dbName_user = "uni-id-users";												// 用户

var dao = {};
/**
 * 获取用户信息
 * 调用示例
 * await vk.daoCenter.userDao.findById(user_id, util);
 * data 请求参数说明
 * @params {String} user_id 用户ID
 * @params {Object} util 公共工具包
 */
dao.findById = async (user_id, util) => {
	let { vk , db, _ } = util;
	let res = {};
	// 数据库操作开始-----------------------------------------------------------
	res = await vk.baseDao.findById({
		dbName:dbName_user,
		id:user_id,
		fieldJson:{ token:false, password:false },
	},util);
	// 数据库操作结束-----------------------------------------------------------
	return res;
};

module.exports = dao;
