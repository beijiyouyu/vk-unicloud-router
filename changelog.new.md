* 【重要】新增 `微信公众号jsapi` 相关接口，可实现微信公众号的快速开发。
* 【新增】`vk.notifyEventReady(eventName, data)` 通知特定事件已准备就绪，并将数据传递给awaitEventReady注册的回调函数。一定会在 awaitEventReady 函数被调用之前触发。
* 【新增】`vk.awaitEventReady(eventName, callback)` 等待特定事件执行后再执行相应的回调函数，如果事件已准备就绪，它会立即执行回调函数；否则，它将等待事件notifyEventReady后再执行。
* 【优化】`vk.baseDao.add` 不再修改传入的 `dataJson` 参数的值（数据库里依然会自动添加 `_add_time` 字段）
* 【重要】调整 `vk.baseDao.getTableData` 的 `whereJson` 实现逻辑，使之更符合实际开发需求（现在强制条件不会覆盖前端条件，而是一起进行and条件）

关于 `vk.baseDao.getTableData` 的 `whereJson` 的调整说明

- 调整前：whereJson如果写的 `time > 100`，则即使前端传了 `time > 1000`，最终where条件也还是 `time > 100`（即在强制条件内的字段条件被固定死了）
- 调整后：whereJson如果写的 `time > 100`，而前端传了 `time > 1000`，最终where条件是 `time > 100 and time > 1000`（依然有强制条件的效果，但更灵活了，前端能在强制条件范围内自由查询）

#####  框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架