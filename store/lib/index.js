// 引入 vk实例 提供的对 vuex 的简写法文件
import mixin from '../mixin/mixin.js'
export default {
	install(Vue) {
		Vue.mixin(mixin);
	}
}
