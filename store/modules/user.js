/**
 * vuex 用户状态管理模块
 * import store from "@/store";
 */
export default {
	// 通过添加 namespaced: true 的方式使其成为带命名空间的模块
	namespaced: true,
	/**
	 * vuex的基本数据，用来存储变量
	 * 调用示例
	 * that.$store.state.user.userInfo
	 */
	state: {
		// 登录用户的信息
		userInfo: uni.getStorageSync("uni_id_user_info")
	},
	/**
	 * 从基本数据(state)派生的数据，相当于state的计算属性
	 * 调用示例
	 * that.$store.getters['user/getUserInfo']
	 */
	getters: {
		getUserInfo: (state) => {
			return state.userInfo;
		}
	},
	/**
	 * 提交更新数据的方法，必须是同步的(如果需要异步使用action)。
	 * 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
	 * 回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。
	 * 调用示例
		that.$store.commit('user/setUserInfo',{
			username:"admin"
		});
	 */
	mutations: {
		setUserInfo: (state, userInfo) => {
			state.userInfo = userInfo
		}
	},
	/**
	 * 和mutation的功能大致相同，不同之处在于 ==》
	 * 1. Action 提交的是 mutation，而不是直接变更状态。 
	 * 2. Action 可以包含任意异步操作。
	 * 调用示例
			that.$store.dispatch('user/setUserInfo',{
				username:"admin"
			});
	 */
	actions: {
		setUserInfo (context, userInfo) {
			uni.setStorageSync("uni_id_user_info", userInfo);
			context.commit('setUserInfo',userInfo)
		}
	}
}
