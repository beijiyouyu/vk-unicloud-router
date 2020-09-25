'use strict';
// 注意：此为云函数路由入口文件，请勿修改此文件代码，你自己的云函数逻辑应写在service目录下
const vk = require('vk-unicloud');    // vk-unicloud 工具包
const config = require('config');     // 全局配置信息
const pubFun = require(__dirname+'/util/pubFunction'); // __dirname是为了兼容阿里云
const uniID = require('uni-id');  // uni-id 公共模块
uniID.init(config["uni"]);
const db = uniCloud.database();
process.env.TZ ='Asia/Shanghai';  // 设置时区为东八区(目前无效)
exports.main = async (event, context) => {
	let originalParam = {event, context};
	let param = vk.getQueryStringParameters(event);
	let { url, data, uniIdToken } = param;
	// 工具包
	let util = {
		vk, config, pubFun, uniID, db,
		_:db.command
	};
	let serviceParam = {
		url, data, uniIdToken, util, originalParam
	};
	// 全局过滤器
	const filterService = vk.require('util/filter');
	let res = await filterService.main(serviceParam);
	if(res.code != 0) return res;		// code不为0，则直接返回错误信息
	if(res.uid) data.uid = res.uid;	// 如果存在uid，则参数自动加上uid参数
	// 加载业务函数
	let serviceMain;
	try{
		serviceMain = vk.require('service/'+url);
	}catch(err){
		return {
			code:404, msg:'云函数'+url+'不存在', err:err
		};
	}
	// 运行业务函数，并返回结果给前端
	return await serviceRun({
		res,
		serviceParam,
		serviceMain
	});
};


// 运行业务函数
async function serviceRun(obj = {}){
	let { 
		res, 
		serviceParam, 
		serviceMain 
	} = obj;
	if(res.uid) serviceParam.uid = res.uid;
	if(res.userInfo) serviceParam.userInfo = res.userInfo;
	let returnRes = await serviceMain.main(serviceParam);
	if(res.token && typeof returnRes == "object"){
		returnRes.vk_uni_token = {
			token : res.token,
			tokenExpired : res.tokenExpired
		};
	}
	return returnRes;
}