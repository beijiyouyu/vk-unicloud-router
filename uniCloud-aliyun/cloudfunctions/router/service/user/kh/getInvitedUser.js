module.exports = {
  /**
   * 获取接受邀请的用户清单
   * @url user/kh/getInvitedUser 前端调用的url参数地址
   * @description 此接口用于在其他接口不满足需求时使用
	 * data 请求参数 说明
	 * @params {Number} level 指定获取第几级邀请用户，默认1
	 * @params {Number} pageIndex 第几页
	 * @params {Number} pageSize 每页显示数量
	 * @params {Number} getCount 是否需要返回总数，默认false
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 * @params {Array} rows 邀请的用户列表
	 * invitedUser每项结构
	 * @params {String} username 被邀请者用户名
	 * @params {String} mobile 被邀请者手机号
	 * @params {String} invite_time 被邀请者注册时间，以时间戳形式返回
	 * 
	 */
	main: async (event) => {
		let { data = {}, util, originalParam } = event;
		let { uniID } = util;
		let { uid } = data;
		let res = { code:0, msg:"" };	
		// 业务逻辑开始----------------------------------------------------------- 
		let { pageIndex = 1, pageSize = 20, getCount = false } = data; 
		let limit = pageSize;
		let offset = (pageIndex - 1) * pageSize;
		let getInvitedUserRes = await uniID.getInvitedUser({
			uid:uid,
			limit:limit,
			offset:offset,
			needTotal:getCount
		});
		res.rows = getInvitedUserRes.invitedUser;
		res.code = getInvitedUserRes.code;
		res.msg = getInvitedUserRes.msg;
		if(res.code === 0 && res.rows && res.rows.length === pageSize){
			res.hasMore = true;
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}