<script>
	import config from '@/app.config.js'
	export default {
		methods: {
			// 监听本地缓存
			watchLocalStorage: function() {
				let app = this;
				let vk = app.globalData.vk;
				vk.localStorage.watch = function(obj){
					let { type, key, data } = obj;
					if(key === "uni_id_user_info"){
						switch(type) {
							case "set": vk.vuex('$user.userInfo', data); break;
							case "remove": vk.vuex('$user.userInfo', {}); break;
						} 
					}
				}
			}
		},
		// 监听 - 页面404
		onPageNotFound:function(e) {
			uni.redirectTo({
				url: config.error.url
			})
		},
		onLaunch: function() {
			if(config.debug) console.log('App Launch')
			let that = this;
			that.watchLocalStorage();
		},
		onShow: function() {
			if(config.debug) console.log('App Show')
		},
		onHide: function() {
			if(config.debug) console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
