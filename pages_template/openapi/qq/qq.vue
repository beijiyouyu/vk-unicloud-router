<template>
	<view class="app">
		<button type="default" @tap="getQQMiniCode">生成带参数的小程序码</button>
		<view style="text-align: center;" v-if="imageUrl">
			<image :src="imageUrl" style="width: 400rpx;height: 400rpx;"></image>
		</view>
		<button type="default" @tap="vk.navigateTo('msgSecCheck/msgSecCheck')">文本安全检测</button>
		<button type="default" @tap="vk.navigateTo('imgSecCheck/imgSecCheck')">图片安全检测</button>
	</view>
</template>

<script>
var vk = uni.vk;
export default {
	data() {
		return {
			imageUrl: "",
			openlink: ""
		};
	},
	onLoad(options) {
		vk = uni.vk;
		this.options = options;
		this.init(options);
	},
	methods: {
		// 初始化
		init(options) {},
		// 生成带参数的小程序码
		getQQMiniCode() {
			let that = this;
			vk.userCenter.getQQMiniCode({
				data: {
					//path: "pages/index/mys"
				},
				success:(data) =>{
					that.imageUrl = data.base64;
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.app {
	padding: 30rpx;
}
.app button {
	margin-bottom: 30rpx;
}
.tips {
	font-size: 28rpx;
	color: #999999;
	margin-bottom: 32rpx;
}
</style>
