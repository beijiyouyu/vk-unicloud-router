<template>
	<view class="vk-u-notice-bar">
		<view v-if="datas && datas.list && datas.list.length > 0">
			<u-notice-bar
			:list="customDatas['list'] || datas['list']"
			:mode="customDatas['mode'] || datas['mode'] || 'horizontal'"
			:type="customDatas['type'] || datas['type'] || 'warning'"
			:volume-icon="customDatas['volume-icon'] || datas['volume-icon'] || true"
			:more-icon="customDatas['more-icon'] || datas['more-icon']"
			:close-icon="customDatas['close-icon'] || datas['close-icon']"
			:autoplay="customDatas['autoplay'] || datas['autoplay'] || true"
			:color="customDatas['color'] || datas['color']"
			:bg-color="customDatas['bg-color'] || datas['bg-color']"
			:show="customDatas['show'] || datas['show'] || true"
			:volume-size="customDatas['volume-size'] || datas['volume-size']"
			:font-size="customDatas['font-size'] || datas['font-size']"
			:duration="customDatas['duration'] || datas['duration'] || 2000"
			:speed="customDatas['speed'] || datas['speed'] || 160"
			:is-circular="customDatas['is-circular'] || datas['is-circular'] || true"
			:play-state="customDatas['play-state'] || datas['play-state'] || 'play'"
			:disable-touch="customDatas['disable-touch'] || datas['disable-touch'] || true"
			:padding="customDatas['padding'] || datas['padding']"
			:border-radius="customDatas['border-radius'] || datas['border-radius']"
			:no-list-hidden="customDatas['no-list-hidden'] || datas['no-list-hidden'] || true"
			
			@click="click"
			@close="close"
			@getMore="getMore"
			@end="end"
			></u-notice-bar>
		</view>
	</view>
</template>

<script>
	export default {
		name: "vk-u-notice-bar",
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
			// 点击通告文字触发，只有mode = vertical，或者mode = horizontal且is-circular = false时有效
			click(index){
				this.$emit("click",index);
			},
			// 点击右侧关闭图标触发
			close(){
				this.$emit("close");
			},
			// 点击右侧向右图标触发
			getMore(){
				this.$emit("getMore");
			},
			// 列表的消息每次被播放一个周期时触发，只有mode = vertical，或者mode = horizontal且is-circular = false时有效
			end(){
				this.$emit("end");
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
