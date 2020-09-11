module.exports = {
	/**
	 * 连表查询(仅限两表查询)(VK版本)
	 * @url db_test/pub/select2-2 前端调用的url参数地址
	 * @description 此函数描述
	 * @params {Object} data 请求参数
	 * @params {String} uniIdToken 用户token
	 * @params {Object} util 公共工具包
	 * data 请求参数 说明
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : 'ok' };
		// 业务逻辑开始----------------------------------------------------------- 
		const $ = _.aggregate;
		let dbName = "gy-dp-kehu";
		let dbName2 = "uni-id-users";
		res = await db.collection(dbName).aggregate()
		.lookup({
		  from: dbName2,
		  let: {
		    order_book: '$book',
		    order_quantity: '$quantity'
		  },
		  pipeline: $.pipeline()
		    .match(_.expr($.and([
		      $.eq(['$title', '$$order_book']),
		      $.gte(['$stock', '$$order_quantity'])
		    ])))
		    .project({
		      _id: false,
		      title: false,
		      stock: true
		    })
		    .done(),
		  as: 'user_info',
		})
		.end();
		
		// res = await vk.baseDao.select2({
		// 	dbName:"vk-test",
		// 	dbName2:"uni-id-users",
		// 	foreignKey:"kehuid",
		// 	foreignKey2:"_id",
		// 	as:"kehuInfo",
		// 	pageKey:true,
		// 	pageIndex:1,
		// 	pageSize:10,
		// 	whereJson:{
				
		// 	},
		// 	fieldJson2:{
		// 		token:false,
		// 		password:false,
		// 	}
		// }, event.util);
		//console.log(res.rows.length);
		 
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}