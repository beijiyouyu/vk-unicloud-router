* 1、【优化】云函数、云对象404时的错误提示
* 2、【重要】注册接口统一去除前端的role参数（需替换目录router/service/user/pub）
* 3、【修复】云端表单验证不支持a.b的问题
* 4、【新增】`vk.sessionStorage` 本地会话缓存，仅h5可用
* 5、【优化】`vk.uploadFile` 新增参数 `cloudPathAsRealPath` 默认为true，代表支持阿里云目录
* 6、【优化】`vk.uploadFile` 新增参数 `cloudDirectory` 可以设置上传至指定的云端目录 
* 7、【优化】发送邮件验证码新增参数判断
* 8、【优化】`vk.request` 新增 `interceptor` 参数（该参数仅前端调用时生效）[传送门](https://vkdoc.fsq.pub/client/jsapi.html#vk-request-%E8%AF%B7%E6%B1%82http%E6%8E%A5%E5%8F%A3)

#####  框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架