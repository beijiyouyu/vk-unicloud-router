## 1.8.15（2021-03-19）
###  更新内容
#### 1、【修复】微信小程序服务端API在保存`token`时，缓存时间错误的问题。
#### 2、【修复】`vk.callFunctionUtil.uploadFile` 上传视频返回`.png`的问题 [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3673784&doc_id=975983)

#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.8.14（2021-03-19）
###  更新内容
#### 【新增】APP本机号码一键登录API `vk.userCenter.loginByUniverify`
## 1.8.13（2021-03-17）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【优化】在安装了`vuex`后，移除了名为`uni_id_user_info`的本地缓存（重复了）（`userInfo`使用`vk.getVuex('$user.userInfo')`获取）
#### 2、【修复】微信小程序服务端API在获取`token`时，没有正确使用缓存的问题。

#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.8.12（2021-03-12）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【重要】现在可以在js文件中直接通过 `uni.vk` 来使用 `vk` 对象内的API 
#### 2、【新增】`app.config.js` 新增参数 `checkSharePages` 控制页面是否可以被小程序分享
#### 3、【优化】发行模式下，`console.log` 将不会打印任何日志。
```js
若发行模式下需要强制打印，可用 `vk.log` 代替 `console.log`
```
## 1.8.11（2021-03-10）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【新增】`vk.callFunctionUtil.uploadFile` 支持前端直传至`阿里云oss` [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3673784&doc_id=975983)
#### 2、【新增】`app.config.js` 新增 `myfn` 参数，可用来拓展自定义公共函数 [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3673929&doc_id=975983)

#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.8.10（2021-03-06）
###  更新内容
#### 【优化】`vk.setVuex` 和 `vk.setData` 的赋值逻辑
```js
如数据源$data
{
	a:1,
	b:"1",
};
执行 vk.setVuex("$data.a.b.c",1); 
结果：
{
	a:{
		b:{
			c:1
		}
	},
	b:"1"
}
```
## 1.8.9（2021-03-05）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【新增】`vk.openapi.weixin.subscribeMessage.send` 微信小程序发送订阅消息 [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3569379&doc_id=975983)
#### 2、【优化】`vk.baseDao.add` 和 `vk.baseDao.adds` 新增参数 `cancelAddTime` 为`true`,则不会有`_add_time`和`_add_time_str`字段生成
#### 3、【优化】`vk.baseDao.add` 和 `vk.baseDao.adds` 支持添加自定义 `_id`

#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 1.8.8（2021-03-04）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
### 更新内容
#### 【重要】`vuex` 的使用方式有较大更新。(有性能提升)[点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3654596&doc_id=975983)

## 1.8.7（2021-02-24）
### 更新内容
#### 【修复】`vk.openapi.weixin.auth.code2Session` 会报`vk is not defined`的错误。

## 1.8.6（2021-02-24）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
### 更新内容
#### 【修复】`vk.baseDao.deleteById` 会报`vk is not defined`的错误。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 1.8.5（2021-02-23）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
### 更新内容
#### 【优化】`vk.baseDao.selects` 支持副表与副表的副表进行连表 [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3028633&doc_id=975983)
```
1.1、支持无限张副表和主表进行连接（横向无限张表）
1.2、支持副表与副表的副表进行连接（竖向无限层连接）
```



## 1.8.4（2021-02-16）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
### 更新内容
#### 微信小程序服务端API [点击查看文档](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3569379&doc_id=975983)
#### 1、【新增】`获取AccessToken` : `vk.openapi.weixin.auth.getAccessToken`
#### 2、【新增】`code换取openid` : `vk.openapi.weixin.auth.code2Session`
#### 3、【新增】`获取微信绑定的手机号` : `vk.openapi.weixin.decrypt.getPhoneNumber`
#### 4、【新增】`文本违规检测` : `vk.openapi.weixin.security.msgSecCheck`
#### 5、【新增】`图片违规检测` : `vk.openapi.weixin.security.imgSecCheck`
#### 6、【新增】`获取小程序码` : `vk.openapi.weixin.wxacode.getUnlimited`
#### 7、【新增】`小程序Scheme码` : `vk.openapi.weixin.urlscheme.generate`

## 1.8.3（2021-02-11）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
### 更新内容
#### 【优化】`main.js` 代码结构。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 1.8.2（2021-02-08）
### 支持 `uni-pay` 模块
## 1.8.1（2021-02-08）
### 优化插件目录结构
完整框架项目地址：https://ext.dcloud.net.cn/plugin?id=2204
## 1.8.0（2021-02-07）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【重要】升级至`uni_modules`版本 [点击查看升级指南](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/1.8%E4%BB%A5%E4%B8%8B%E7%89%88%E6%9C%AC%E5%8D%87%E7%BA%A7%E8%87%B31.8%E5%8D%87%E7%BA%A7%E6%8C%87%E5%8D%97%20%E5%8D%87%E7%BA%A7%E6%88%90%20uni_modules%E7%89%88%E6%9C%AC?sort_id=3541759)
#### 2、【重要】本次更新文件有重大改动，升级成功后将变成`uni_modules`版本，下次更新框架只需要在hbx编译器中一键更新。
#### 3、【新增】【小程序API】`vk.userCenter.loginByWeixinPhoneNumber` 前端可以使用微信小程序一键进行手机号登录
#### 4、【新增】【小程序API】`vk.userCenter.getPhoneNumber` 前端一键获取微信小程序绑定的手机号
#### 5、【新增】【小程序API】`vk.openapi.weixin.decrypt.getPhoneNumber` 云函数解析微信小程序绑定的手机号
#### 6、【新增】【小程序API】`vk.userCenter.getWeixinMPqrcode` 前端一键生成带参数的小程序码
#### 7、【新增】【小程序API】`vk.userCenter.getWeixinMPscheme` 前端一键生成带参数的小程序scheme码（支持从手机短信跳转到小程序）
#### 8、【优化】`middleware/modules/returnUserInfoFilter` 中间件的处理逻辑。
#### 9、【优化】`javascript代码块提示.json` 输入`vk.`可以快速提示代码块 `根目录/使用帮助/代码快捷提示`

#### 如有疑问，请加群：22466457 关于插件的问题包教包会！
### 你也可以在评论区发布留言交流心得。
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【重要】升级至`uni_modules`版本 [点击查看升级指南](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/1.8%E4%BB%A5%E4%B8%8B%E7%89%88%E6%9C%AC%E5%8D%87%E7%BA%A7%E8%87%B31.8%E5%8D%87%E7%BA%A7%E6%8C%87%E5%8D%97%20%E5%8D%87%E7%BA%A7%E6%88%90%20uni_modules%E7%89%88%E6%9C%AC?sort_id=3541759)
#### 2、【重要】本次更新文件有重大改动，升级成功后将变成`uni_modules`版本，下次更新框架只需要在hbx编译器中一键更新。
#### 3、【新增】【小程序API】`vk.userCenter.loginByWeixinPhoneNumber` 前端可以使用微信小程序一键进行手机号登录
#### 4、【新增】【小程序API】`vk.userCenter.getPhoneNumber` 前端一键获取微信小程序绑定的手机号
#### 5、【新增】【小程序API】`vk.openapi.weixin.decrypt.getPhoneNumber` 云函数解析微信小程序绑定的手机号
#### 6、【新增】【小程序API】`vk.userCenter.getWeixinMPqrcode` 前端一键生成带参数的小程序码
#### 7、【新增】【小程序API】`vk.userCenter.getWeixinMPscheme` 前端一键生成带参数的小程序scheme码（支持从手机短信跳转到小程序）
#### 8、【优化】`middleware/modules/returnUserInfoFilter` 中间件的处理逻辑。
#### 9、【优化】`javascript代码块提示.json` 输入`vk.`可以快速提示代码块 `根目录/使用帮助/代码快捷提示`

#### 如有疑问，请加群：22466457 关于插件的问题包教包会！
### 你也可以在评论区发布留言交流心得。