import Vue from 'vue'
import App from './App'

import uView from 'uview-ui';
Vue.use(uView);

import vk from 'vk-unicloud-page';
Vue.use(vk);

// 自定义云函数路由配置
Vue.prototype.vk.callFunctionUtil.setConfig({
		functionNameToUrl:{
			// 云函数路由（主函数url化地址）
			"router":"https://bbdf976b-a6a6-42b2-9429-db232ee80f13.bspapp.com/http/router",
			// 云函数路由（开发测试函数url化地址）
			"router-test":"https://bbdf976b-a6a6-42b2-9429-db232ee80f13.bspapp.com/http/router-test"
		}
});

// 自定义token拦截器
Vue.prototype.vk.callFunctionUtil.interceptor.login = (obj = {}) =>{
  let { params, res } = obj;
  setTimeout(function(){
    uni.navigateTo({
      url:"/pages/login/index/index",
      events:{
        // 监听登录成功后的事件
        loginSuccess: function(data) {
        // 重新执行一次云函数调用
          if(params) Vue.prototype.vk.callFunction(params);
        }
      }
    });
  },300); 
  console.log("跳自己的登录页面");
  // 上方代码可自己修改，写成你自己的逻辑处理。
};


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
