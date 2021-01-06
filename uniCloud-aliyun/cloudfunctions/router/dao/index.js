// 加载模块 - 数据库dao层 API
const modulesPath = __dirname+"/modules";
const fs = require('fs');
const fileList = fs.readdirSync(modulesPath);
const moduleObj = {};
const modulesNames = [];
fileList.map((file, index) => {
	if(file.indexOf("Dao.js") > -1){
		modulesNames.push(file.substring(0,file.length-3));
	}
});
modulesNames.map((modulesName, index) => {
	moduleObj[modulesName] = require(modulesPath+"/"+modulesName);
});
module.exports = moduleObj;