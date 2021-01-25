const config = require('config');             // 全局配置信息
const uniID = require('uni-id');              // uni-id 公共模块
uniID.init(config["uni"]);
const db = uniCloud.database();
const pubFun = require('./util/pubFunction'); // 自定义公共函数
// 自定义过滤器(中间件)
const middlewareService = require('./middleware/index');
// 数据库操作中心
const daoCenter = require('./dao/index');
const requireFn = function(path){
	return require(path);
}
const initConfig = {
	baseDir:__dirname, // 云函数根目录地址
	requireFn,
	config,
	uniID,
	db,
	pubFun,
	middlewareService,
	daoCenter,
	// customUtil :{
	// 	mynpm1:mynpm1
	// }
};

module.exports = initConfig;
