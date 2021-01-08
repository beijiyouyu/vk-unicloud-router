import Vue from 'vue'
import App from './App'
import store from './store'
import config from '@/app.config.js'

import uView from 'uview-ui';
Vue.use(uView);

import vk from 'vk-unicloud-page';
Vue.use(vk);

// 引入vk实例提供的对vuex的简写法文件
import mixin from './store/mixin/mixin.js'
Vue.mixin(mixin);

// 自定义云函数路由配置
Vue.prototype.vk.callFunctionUtil.setConfig({
	debug:config.debug,
	// 登录页面地址
	loginPagePath:config.login.url,
	// 主函数名称
	functionName:config.functionName
});

// 自定义token拦截器
// Vue.prototype.vk.callFunctionUtil.interceptor.login = (obj = {}) =>{
//   let { params, res } = obj;
// 	if(!params.noAlert){
// 		Vue.prototype.vk.alert(res.result.msg);
// 	}
//   console.log("跳自己的登录页面");
//   // 上方代码可自己修改，写成你自己的逻辑处理。
// };

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
  ...App
})
app.$mount()
