/**
 * 函数 - 页面导航
 */
var config;
try{
	config = require('@/app.config.js');
}catch(e){}

var util = {};



/**
 * 保留当前页面，跳转到应用内的某个页面，使用vk.navigateBack可以返回到原页面。
 * vk.navigateTo(url);
 */
util.navigateTo = function(obj) {
	var vk = getApp().globalData.vk;
	if(typeof obj == "string"){
		let url = obj;
		obj = {
			url : url
		};
	}else if(typeof obj == "undefined"){
		obj = {};
	}
	if(!obj.url){
		vk.toast("url不能为空!");
		return false;
	}
	util.checkNeedLogin({
		url:obj.url,
		success:function(res){
			if(res.needLogin){
				vk.navigate.originalPage = vk.pubfn.copyObject(obj);
				obj.url = config.login.url;
			}
			util._navigateTo(obj);
		}
	});
};
util._navigateTo = function(obj) {
	let {
		url,
		animationType = "pop-in",
		animationDuration = 300,
		events,
		mode = "navigateTo"
	} = obj;
	uni[mode]({
		url: url,
		animationType:animationType,
		animationDuration:animationDuration,
		events:events, // 参考 https://uniapp.dcloud.io/api/router?id=navigateto
		success:function(){
			if(typeof obj.success == "function") obj.success();
		},
		fail:function(err){
			// console.log(err);
			if(err.errMsg.indexOf("not found")>-1){
				let vk = getApp().globalData.vk;
				let errUrl = vk.pubfn.getPageFullPath(url);
				vk.toast(`页面 ${errUrl} 不存在`,"none");
				return false;
			}
			uni.switchTab({
				url:url,
				success:obj.success,
				fail:function(){
					uni.redirectTo({
						url:url,
						success:obj.success,
						fail:function(err){
							console.error(err);
							if(typeof obj.fail == "function") obj.fail();
						}
					});
				}
			});
		},
		complete:function(){
			if(typeof obj.complete == "function") obj.complete();
		}
	});
};

/**
 * 关闭当前页面，跳转到应用内的某个页面。
 * vk.redirectTo(url);
 */
util.redirectTo = function(obj) {
	obj = util.paramsInit(obj);
	obj.mode = "redirectTo";
	util.navigateTo(obj);
};

/**
 * 关闭所有页面，打开到应用内的某个页面。
 * vk.reLaunch(url);
 */
util.reLaunch = function(obj) {
	obj = util.paramsInit(obj);
	obj.mode = "reLaunch";
	util.navigateTo(obj);
};

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
 * vk.switchTab(url);
 */
util.switchTab = function(obj) {
	obj = util.paramsInit(obj);
	obj.mode = "switchTab";
	util.navigateTo(obj);
};
/**
 * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
 * vk.navigateBack();
 */
util.navigateBack = function(obj) {
	var vk = getApp().globalData.vk;
	if(typeof obj == "string"){
		let delta = obj;
		obj = {
			delta:delta
		};
	}else if(typeof obj == "undefined"){
		obj = {};
	}
	let {
		delta = 1,
		animationType = "pop-out",
		animationDuration = 300
	} = obj;
	uni.navigateBack({
	  delta : delta,
	  animationType : animationType,
	  animationDuration : animationDuration,
	  success:function(){
			if(typeof obj.success == "function") obj.success();
	  },
	  fail:function(res){
			console.error(res);
	  	if(typeof obj.fail == "function") obj.fail();
	  },
	  complete:function(){
	  	if(typeof obj.complete == "function") obj.complete();
	  }
	});
};
/**
 * 跳转到登录前的页面
 * vk.navigate.originalTo();
 */
util.originalTo = function() {
	var vk = getApp().globalData.vk;
	let originalPage = vk.pubfn.copyObject(vk.navigate.originalPage);
	vk.navigate.originalPage = null;
	util.redirectTo(originalPage);
};

/**
 * 检测是否需要登录(内部方法)
 util.checkNeedLogin({
	 url:url,
	 success:function(res){
		 if(res.needLogin){

		 }
	 }
 })
 */
util.checkNeedLogin = function(obj) {
	var vk = getApp().globalData.vk;
	let { url, success } = obj;
	// ../ 转成绝对路径
	url = vk.pubfn.getPageFullPath(url);
	let needLogin = false;
	if(config && config.checkTokenPages){
		let { mode=0, list=[] } = config.checkTokenPages;
		if(mode > 0){
			let checkTokenKey = false;
			let regExpKey = false;
			let path = util.getPagePath(url);
			for(let i=0; i<list.length; i++){
			  let pageRegExp = list[i];
				regExpKey = vk.pubfn.wildcardTest(path, pageRegExp);
				//let regExp = new RegExp(pageRegExp);
				//let regExpKey = regExp.test(path);
				//console.log(regExpKey, path, pageRegExp);
				if(regExpKey){
					break;
				}
			}
			if(mode === 1 && regExpKey){
				checkTokenKey = true;
			}else if(mode === 2 && !regExpKey){
				checkTokenKey = true;
			}
			if(checkTokenKey){
				// 本地判断token有效期(联网会浪费性能)
				if(!vk.callFunctionUtil.checkToken()){
					needLogin = true;
				}
			}
		}
	}
	success({
		url,
		needLogin
	});
};


// 获取?前面的地址
util.getPagePath = function(url) {
	let pathIndex = url.indexOf("?");
	let path = url;
	if(pathIndex > -1){
		path = path.substring(0,pathIndex);
	}
	return path;
};

util.paramsInit = function(obj){
	let vk = getApp().globalData.vk;
	if(typeof obj == "string"){
		let url = obj;
		obj = {
			url : url
		};
	}else if(typeof obj == "undefined"){
		obj = {};
	}
	if(!obj.url){
		vk.toast("url不能为空!");
		return false;
	}
	return obj;
}

export default util;
