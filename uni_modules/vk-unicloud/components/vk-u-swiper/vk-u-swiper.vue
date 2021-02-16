<template>
	<view class="vk-u-swiper">
		<view v-if="datas && datas.list && datas.list.length > 0">
			<u-swiper 
				:list="customDatas['list'] || datas['list']"
				:title="customDatas['title'] || datas['title']"
				:mode="customDatas['mode'] || datas['mode'] || 'round'"
				:height="customDatas['height'] || datas['height'] || 300"
				:indicator-pos="customDatas['indicator-pos'] || datas['indicator-pos'] || 'bottomCenter'"
				:autoplay="customDatas['autoplay'] || datas['autoplay'] || true"
				:interval="customDatas['interval'] || datas['interval'] || 2500"
				:circular="customDatas['circular'] || datas['circular'] || true"
				:duration="customDatas['duration'] || datas['duration'] || 500"
				:border-radius="customDatas['border-radius'] || datas['border-radius'] || 8"
				:title-style="customDatas['title-style'] || datas['title-style']"
				:img-mode="customDatas['img-mode'] || datas['img-mode'] || 'aspectFill'"
				:name="customDatas['name'] || datas['name'] || 'image'"
				:bg-color="customDatas['bg-color'] || datas['bg-color'] || '#f3f4f6'"
				:current ="customDatas['current'] || datas['current '] || 0"
				:effect3d="customDatas['effect3d'] || datas['effect3d']"
				:effect3d-previous-margin="customDatas['effect3d-previous-margin'] || datas['effect3d-previous-margin'] || 50"
				
				@click="click"
				@change="change"
			></u-swiper>
		</view>
		<view v-else 
			:style="'height: '+(customDatas['height'] || 300)+'rpx;'"
			style="display: block;"
			>
			<u-image width="100%" height="100%" mode="scaleToFill"></u-image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "vk-u-swiper",
		props: {
			dataId:{
				type: String,
				default () {
					return "";
				}
			},
			datas: {
				type: Object,
				default () {
					return {};
				}
			},
			customDatas: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data: function () {
			// 组件创建时,进行数据初始化
			return {
				
			}
		},
		methods: {
			// 点击轮播图时触发 index：点击了第几张图片，从0开始
			click(index){
				this.$emit("click",index);
			},
			// 轮播图切换时触发(自动或者手动切换) index：切换到了第几张图片，从0开始
			change(index){
				this.$emit("change",index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
