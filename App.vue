<script>
	import config from '@/app.config.js'
	import { version } from './package.json'
	export default {
		methods: {

		},
		// 监听 - 页面404
		onPageNotFound:function(e) {
			uni.redirectTo({
				url: config.error.url
			})
		},
		onLaunch: function() {
			if (config.debug) {
				// #ifndef APP-PLUS
				console.log(
					`%c vk-client %c v${version} `,
					'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
					'background:#007aff ;padding: 1px; border-radius: 0 3px 3px 0;  color: #fff; font-weight: bold;'
				);
				// #endif
				console.log('App Launch');
			}
			// #ifdef MP
			vk.updateManager.updateReady(); // 此代码可以让小程序自动检测最新版本
			// #endifss
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
	// @import "./uni_modules/vk-uview-ui/index.scss";
  @import "./common/css/app.scss";
</style>
