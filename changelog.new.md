* 1、【重要】为了安全性考虑，调整前端的 `vk.request` API，需要手动指定 `uniIdToken: true` 才会在请求头中自动添加 `uni-id-token`
* 2、【优化】前端 `vk.request` 当满足响应规范时，会自动保存 `token` 和 `userInfo` 以及token失效跳登录页面
* 3、【优化】新增 `vk.baseDao.setById`（根据ID判断存在则修改，不存在则添加，此为原子操作，非查询再判断）
* 4、【优化】`user/pub/sendEmailCode` 发送邮件验证码新增针对同一个邮箱每天的次数限制（默认30次，可在函数内修改默认次数）
* 5、【优化】`user/pub/sendSmsCode` 发送短信验证码新增针对同一个手机号每天的次数限制（默认12次，可在函数内修改默认次数）


#####  框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架