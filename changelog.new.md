* 【重要】新增 `微信公众号jsapi` 相关接口，可实现微信公众号的快速开发。
* 【新增】`vk.notifyEventReady(eventName, data)` 通知特定事件已准备就绪，并将数据传递给awaitEventReady注册的回调函数。一定会在 awaitEventReady 函数被调用之前触发。
* 【新增】`vk.awaitEventReady(eventName, callback)` 等待特定事件执行后再执行相应的回调函数，如果事件已准备就绪，它会立即执行回调函数；否则，它将等待事件notifyEventReady后再执行。

#####  框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架