<template>
	<view class="content">
		<view>
			Vuex可以用来做全局状态管理。
			而此例子是演示将当前登录用户信息存入Vuex，以便于在其他页面中也能直接渲染或获取用户信息
		</view>
		<view v-if="$store.state.user.userInfo" style="color: red;margin-top: 20rpx;font-size: 36rpx;">
			当前登录用户：{{ $store.state.user.userInfo.nickname || $store.state.user.userInfo.username}}
		</view>
		<view style="margin-top: 20rpx;">
			<input type="text" v-model="form1.username" placeholder="用户名/邮箱/手机号" />
			<input type="text" v-model="form1.password" password="true" placeholder="密码" />
			<button type="default" @tap="register">注册</button>
			<button type="default" @tap="login">登录</button>
			<button type="default" @tap="logout">退出</button>
		</view>
	</view>
</template>

<script>
	var that;											// 当前页面对象
	var app = getApp();						// 可获取全局配置
	var vk;												// 自定义函数集
	export default {
		data() {
			return {
				form1:{
					username: 'admin',
					password: '123456'
				}
			}
		},
		onLoad(options) {
			that = this;
			vk = that.vk;
		},
		methods: {
			// 用户注册
			register(){
				var form1 = that.form1;
				vk.userCenter.register({
					data:form1,
					success:function(data){
						vk.alert("注册成功!");
					}
				});
			},
			// 用户登陆
			login(){
				var form1 = that.form1;
				vk.userCenter.login({
					data:form1,
					success:function(data){
						// 登录成功后将用户信息写入$store
						that.$store.dispatch('user/setUserInfo',data.userInfo);
						vk.alert("登陆成功!");
					}
				});
			},
			// 退出
			logout(){
				vk.userCenter.logout({
					success:function(data){
						// 退出成功后清楚$store的用户信息
						that.$store.dispatch('user/setUserInfo',"");
						vk.alert("退出成功");
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 15px;
	}
	.content input {
		height: 46px;
		border: solid 1px #DDDDDD;
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 0px 15px;
	}
	.content button {
		margin-bottom: 15px;
	}
	.content navigator {
		display: inline-block;
		color: #007AFF;
		border-bottom: solid 1px #007AFF;
		font-size: 16px;
		line-height: 24px;
		margin-bottom: 15px;
	}
	.tips {
		text-align: center;
		line-height: 20px;
		font-size: 14px;
		color: #999999;
		margin-bottom: 20px;
	}
</style>

