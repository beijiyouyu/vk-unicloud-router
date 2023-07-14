* 1、【重要】为了安全性考虑，调整前端的 `vk.request` API，需要手动指定 `uniIdToken: true` 才会自动添加 `token` 到请求头里。
* 2、【优化】前端 `vk.request` 当满足响应规范时，会自动保存 `token` 和 `userInfo`
* 3、【优化】新增 `vk.baseDao.setById`（根据ID判断存在则修改，不存在则添加，此为原子操作，非查询再判断）



#####  框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架