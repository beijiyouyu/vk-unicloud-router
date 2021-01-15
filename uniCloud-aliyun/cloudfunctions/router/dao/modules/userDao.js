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

/**
 * 获取用户信息,根据
 * _id
 * username
 * mobile
 * email
 * wx_openid.app-plus
 * wx_openid.mp-weixin
 * wx_unionid
 * ali_openid
 * my_invite_code
 * 调用示例
 await vk.daoCenter.userDao.findByUserInfo({
	mobile:mobile
 }, util);
 * data 请求参数说明
 * @params {Object} userInfo 用户信息
 * @params {Object} util 公共工具包
 */
dao.findByUserInfo = async (userInfo, util) => {
	let { vk , db, _ } = util;
	let res;
	// 数据库操作开始-----------------------------------------------------------
	let whereJson = {};
	let list = [
		"_id",
		"username",
		"mobile",
		"email",
		"wx_openid.app-plus",
		"wx_openid.mp-weixin",
		"wx_unionid",
		"ali_openid",
		"my_invite_code"
	];
	let orArr = [];
	for(let i=0; i<list.length; i++){
	  let keyName = list[i];
		let orObj = {};
		if(vk.pubfn.isNotNull(userInfo[keyName])) orObj[keyName] = userInfo[keyName];
		if(vk.pubfn.isNotNull(orObj)){
			orArr.push(orObj);
		}
	}
	if(orArr.length > 0){
		whereJson = _.or(orArr);
		res = await vk.baseDao.findByWhereJson({
			dbName:dbName_user,
			fieldJson:{ token:false, password:false },
			whereJson:whereJson
		}, util);
	}
	// 数据库操作结束-----------------------------------------------------------
	return res;
};
/**
 * 根据手机号直接注册账号并登录
 * 若手机号已存在,则直接登录
 * @params {Object} data 参数
 * mobile          手机号  必填
 * password        初始密码
 * inviteCode      邀请人的邀请码
 * myInviteCode    设置当前注册用户自己的邀请码
 * needPermission  设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用
 * 调用示例
 await vk.daoCenter.userDao.registerUserByMobile({
	 mobile,
 }, util);
 */
dao.registerUserByMobile = async (data, util) => {
	let { vk , db, _, uniID } = util;
	let res = {};
	let {
		mobile,
		password,
		inviteCode,
		myInviteCode,
		needPermission
	} = data;
	// 数据库操作开始-----------------------------------------------------------
	let code = vk.pubfn.random(6);
	// 设置验证码
	await uniID.setVerifyCode({
		mobile,
		code,
		expiresIn:60,
		type:"login"
	});
	// 若手机号不存在，则注册并登录。存在，则直接登录。
	res = await uniID.loginBySms({
		mobile,
		code,
		password,
		inviteCode,
		myInviteCode,
		needPermission
	});
	if(res.uid && vk.pubfn.isNull(res.userInfo)){
		res.userInfo = await vk.daoCenter.userDao.findById(res.uid, util);
	}
	// 数据库操作结束-----------------------------------------------------------
	return res;
};

module.exports = dao;
