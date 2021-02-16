<template>
	<view class="vk-u-grid-button">
		<view v-if="datas && datas.list && datas.list.length > 0">
			<view class="grid-view">
				<u-grid 
					:col="customDatas['col'] || datas['col'] || 4" 
					:border="customDatas['border'] || datas['border'] || false" 
					hover-class="vk-hover-class"
					>
					<u-grid-item v-for="(item,index) in datas.list" :key="index" @click="click(item)">
						<u-badge v-if="item.badge" :count="item.badge" :offset="[20, 20]"></u-badge>
						<u-image v-if="item['icon'] && item['icon'].indexOf('http') == 0"
							mode="scaleToFill"
							:src="item['icon']"
							:height="customDatas['icon-size'] || datas['icon-size']  || 46"
							:width="customDatas['icon-size'] || datas['icon-size']   || 46"
							:lazy-load="false"
							:fade="false"
						></u-image>
						<u-icon v-else 
							:name="item['icon'] || 'photo'" 
							:size="customDatas['icon-size'] || datas['icon-size']   || 46" 
							:color="item['icon-color'] || customDatas['icon-color'] || datas['icon-color'] || 'inherit'" 
							>
						</u-icon>
						<view class="grid-text"
						:style="'font-size: '+(customDatas['text-size'] || datas['text-size'] || 24)
						+'rpx;color: '+(item['text-color'] || customDatas['text-color'] || datas['text-color'] || '#000000')+';'
						+'margin-top:'+(customDatas['text-margin-top'] || datas['text-margin-top'] || 10)+'rpx;'"
						>{{item.text}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "vk-u-grid-button",
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
			pageTo(url){
				uni.navigateTo({
					url:url,
					fail:function(){
						uni.switchTab({
							url:url,
							fail:function(){
								uni.redirectTo({
									url:url,
									fail:function(){
										vk.toast("跳转页面失败");
									}
								});
							}
						});
					}
				});
			},
			click(item){
				if(item.page){
					this.pageTo(item.page);
				}else{
					this.$emit("click",item);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grid-text{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
