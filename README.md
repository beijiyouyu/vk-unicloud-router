### uniCloud云函数路由框架研究Q群:22466457 如有问题或建议可以在群内讨论。
### 插件名称：`vk-unicloud-router`
### 作者：VK
### 更新时间：2020-09-25

## 主要功能 以及 对开发者的价值

#### 1、实现云函数路由模式
```
1.1、路由模式不使用任何第三方包，兼容性强，运行稳定
1.2、减少云函数数量，云函数有个数限制（用一个云函数即可实现多个云函数效果）
1.3、部分通用的代码块可以放在公共区执行，类似公共函数的效果
1.4、可以在开发环境和生产环境中任意切换，开发时，用开发环境，开发过程中不会影响到线上环境。（具体切换方法在文档最后）
```

#### 2、实现全局过滤器，过滤非法请求

#### 3、全面支持url化的云函数请求，您无需关心url化后参数的获取问题

#### 4、已集成`uni-id` 当前版本:1.1.9 （已支持真实发送邮箱验证码和阿里云短信验证码）
```
4.1、由于每个应用基本都会用上用户系统，官方建议所有`uniCloud`应用均使用`uni-id`作为用户体系，
有了统一的账户规范，并且围绕这套账户规范，有各种各样插件，那么开发者可以随意整合这些插件，让数据连同。

4.2、同时方便其他用户使用`unicloud`插件发布者发布的前后端一体插件，只需要导入一个云函数即可。
(如导入一个社区插件，可能要导入几十个云函数，而使用此云函数路由后，只需导入一个云函数，且已集成`uni-id`，打通账号体系)。
```

#### 5、将`uni-id`的API封装成 `userCenter` 通过this.vk.userCenter 即可调用
```
// 【示例】用户登录
this.vk.userCenter.login({
	data:{
		username : username,
		password : password
	},
	success:function(data){
		// 登录成功
	}
});
```

#### 6、封装`uni.callFunction` 和 `uni.request` 使之合二为一 通过this.vk.callFunction 调用
```
// 【示例】修改当前登录用户自己的头像
this.vk.callFunction({
	url: 'user/kh/setAvatar',
	title:'请求中...',
	data:{
		avatar: "https://xxxxxxx.jpg"
	},
	success(data) {
		// 修改成功
	}
});
```

#### 6、【1.2.2 新增】 `vk.baseDao`数据库工具包，使小白也能轻松上手对数据库的调用。

#### 7、【1.2.7 新增】 集成`uview-ui` UI框架（感谢`uview-ui`作者）。

#### 8、【1.2.9 新增】 前后端一体动态数据组件

#### 前后端一体动态数据组件优势:

##### 1、减少APP或小程序的审核次数，页面组件局部更新不需要重新发布小程序，且实时生效。
##### 2、方便维护，只需要修改数据库对应的组件数据即可达到修改页面的目的。
##### 3、是支持可视化装修页面的必备能力。

#### 1、`vk-u-notice-bar` `uniCloud`动态数据组件 - `公告`
```
可快速实现滚动公告的业务需求
且公告内容获取于uniCloud的数据库中
修改数据库的内容，即可修改公告
```
#### 2、`vk-u-swiper` `uniCloud`动态数据组件 - `图片轮播`

#### 3、`vk-u-grid-button` `uniCloud`动态数据组件 - `图文导航（宫格按钮）`

##### 动态数据组件体验地址
![动态数据组件体验地址](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-vk-cloud-router-test/51dc8810-e9ae-11ea-81ea-f115fe74321c.png?x-oss-process=image/resize,h_250 "动态数据组件体验地址")

#### 9、其他好处…

##### 插件首页体验地址

![插件首页体验地址](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-vk-cloud-router-test/51de83e0-e9ae-11ea-81ea-f115fe74321c.png?x-oss-process=image/resize,h_250 "插件首页体验地址")
 

# 快速上手
# 后端（云函数端）安装步骤
打开 `cloudfunctions` 目录


```js
1、上传common目录下的公共模块
1.1、右键common下的uni-id目录，点击上传公共模块
1.2、右键common下的config目录，点击上传公共模块
```

```js
2、router安装公共模块
在router目录执行命令 （右键router目录，使用命令行窗口打开所在目录），输入

npm i （若执行失败，则再执行一次）

或 分别输入
2.1、npm i ../common/uni-id（若执行失败，则再执行一次）
2.2、npm i ../common/config（若执行失败，则再执行一次）
2.3、npm i nodemailer（若执行失败，则再执行一次）
2.4、npm i vk-unicloud（若执行失败，则再执行一次）
2.5、npm i @alicloud/pop-core（若执行失败，则再执行一次）
```

```js
3、上传云函数router（右键router目录，上传部署）
```

```js
4、初始化云数据库db_init.json（右键db_init.json文件，初始化云数据库）
```

## 注意：
```html
1、使用微信登录需要配置manifest.json以及common/config/index.js这2个配置文件，
且改动配置后需要重新上传公共模块和router函数。
2、若你的电脑没有安装Node.js，则无法使用npm命令。
3、Node.js 安装包及源码下载地址为：https://nodejs.org/en/download/
4、Node.js 安装教程：https://www.runoob.com/nodejs/nodejs-install-setup.html
```

# 前端（页面端）安装步骤
在你的项目根目录执行npm命令：npm i vk-unicloud-page 进行安装

1. `npm`方式安装
```js
npm i vk-unicloud-page
（若提示失败，再执行一次该命令即可）
```

2. `main.js`引入vk-unicloud-page库
```js
// main.js
import vk from 'vk-unicloud-page';
Vue.use(vk);
```


## 集成 `uview-ui` 安装步骤开始 （若不想集成`uview-ui`可跳过此处）

```bash
# npm方式安装
npm i uview-ui
```


1. `main.js`引入uView库
```js
// main.js
import uView from 'uview-ui';
Vue.use(uView);
```

2. `App.vue`引入基础样式(注意style标签需声明scss属性支持)
### 重要：style标签需声明scss属性支持
```css
/* App.vue */
<style lang="scss">
@import "uview-ui/index.scss";
</style>
```

3. `uni.scss`引入全局scss变量文件
```css
/* uni.scss */
@import "uview-ui/theme.scss";
```

4. `pages.json`配置easycom规则(按需引入)

```js
// pages.json
{
	"easycom": {
		"^u-(.*)": "uview-ui/components/u-$1/u-$1.vue",
		"^vk-u-(.*)": "vk-unicloud-dynamic-components/components/vk-u-$1/vk-u-$1.vue"
	},
	// 此为本身已有的内容
	"pages": [
		// ......
	]
}
```

## 集成 `uview-ui` 安装步骤结束 （若不想集成`uview-ui`可跳过此处）

# 云函数框架目录结构

```html
.
├── common─────────────────# 自定义官方公共模块包
│ └── config──────────────────# 全局配置公共模块
│ └── uni-id──────────────────# uni-id官方公共模块
├── router─────────────────# 正式环境云函数主入口(函数路由器)
│ └── node_modules─────────# npm包
│ └── dao──────────────────# dao层(用于直接操作数据库)
│ └── service──────────────# 逻辑层(用于业务逻辑)
│ ── └── components_dynamic──# 动态数据组件服务
│ ──── └── kh──────────────────# kh函数为必须登录后才能访问的函数(客户端用户)
│ ──── └── pub─────────────────# pub函数为所有人都可以访问,不限制
│ ──── └── sys─────────────────# sys函数为后端管理人员才能访问的函数(商家后台工作人员)
│ ──── └── util────────────────# 工具包
│ ── └── db_test─────────────# vk.baseDao 数据库API调用测试服务
│ ──── └── kh──────────────────# kh函数为必须登录后才能访问的函数(客户端用户)
│ ──── └── pub─────────────────# pub函数为所有人都可以访问,不限制
│ ──── └── sys─────────────────# sys函数为后端管理人员才能访问的函数(商家后台工作人员)
│ ──── └── util────────────────# 工具包
│ ── └── order───────────────# 订单服务
│ ──── └── kh──────────────────# kh函数为必须登录后才能访问的函数(客户端用户)
│ ──── └── pub─────────────────# pub函数为所有人都可以访问,不限制
│ ──── └── sys─────────────────# sys函数为后端管理人员才能访问的函数(商家后台工作人员)
│ ──── └── util────────────────# 订单服务专用的工具包
│ ── └── user────────────────# 用户服务(已集成uniID)
│ ──── └── kh──────────────────# kh函数为必须登录后才能访问的函数(客户端用户)
│ ──── └── pub─────────────────# pub函数为所有人都可以访问,不限制
│ ──── └── sys─────────────────# sys函数为后端管理人员才能访问的函数(商家后台工作人员)
│ ──── └── util────────────────# 用户服务专用的工具包
│ ── └── muban.js──────────────# service下空函数模板
│ └── util─────────────────# 工具包
│ ── └── checkIsLogin.js──────# 检测客户端用户是否已登录
│ ── └── checkSysAuth.js──────# 管理后台的权限检测
│ ── └── filter.js────────────# 全局过滤器
│ ── └── pubFunction.js───────# 公共函数包
│ └── index.js─────────────# 入口函数
│ └── package-lock.json────# 工具包
└── └── package.json──────────# 第三方依赖配置文件(若使用npm，自动生成)
.
├── router-test───────────────# 函数路由(开发测试环境)
│ └── ...─────────# ...
│ └── ...─────────# ...
└── └── ...─────────# ...
```

# 云函数service模板文件示例
```
module.exports = {
	/**
	 * 此函数名称
	 * @url user/sys/test1 前端调用的url参数地址
	 * @description 此函数描述
	 * @params {Object} data 请求参数
	 * @params {String} uniIdToken 用户token
	 * @params {String} userInfo 当前登录用户信息(同理,是可信任的)(只有kh函数才带此参数)
	 * @params {Object} util 公共工具包
	 * @params {Object} originalParam 原始请求参数(包含了原始event和context)
	 * data 请求参数 说明
	 * @params {String} uid  当前登录用户id,若用户已登录且token有效,则data中会带uid参数
	 * (此参数是后端过滤器通过token获取并添加到data中的,是可信任的)(只有kh函数才带此参数)
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始----------------------------------------------------------- 
		// 可写与数据库的交互逻辑等等
		
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
```
```html
res.code = 0 表示执行成功;
若执行失败，如xx参数不能为空，xx参数不正确，积分不足等等则返回
res.code = -1;
res.msg = '兑换失败，您的积分不足！';
```


# this.vk.callFunction函数的参数说明
```html
/**
 * 云函数请求封装 - 统一入口
 * @description 通过云函数路由，1个云函数实现多个云函数的效果。
 * @params {String}   url       请求路径，该路径实为router云函数的service目录下的路径
 * @params {Object}   data      请求参数
 * @params {String}   title     遮罩层提示语，为空或不传则代表不显示遮罩层。
 * @params {Boolean}  isRequest 是否使用云函数url化地址访问云函数，默认false
 * @params {Boolean}  noAlert   为true代表请求错误时，不会有弹窗提示。默认为false
 * @params {Function} success   请求成功时，执行的回调函数
 * @params {Function} fail      请求失败时，执行的回调函数
 * @params {Function} complete  无论请求成功与否，都会执行的回调函数
 */
```


# 普通方式调用云函数示例

```html

this.vk.callFunction({
	url: 'user/kh/setAvatar',
	title:'请求中...',
	data:{
		avatar: "https://xxxxxxx.jpg"
	},
	success(data) {
		// 修改成功
	}
});

```

# 云函数url化方式调用云函数示例
isRequest:true 代表使用url访问云函数，一般用于PC后台管理页面使用

```html
this.vk.callFunction({
	url: 'user/kh/setAvatar',
	title:'请求中...',
	isRequest:true,
	data:{
		avatar: "https://xxxxxxx.jpg"
	},
	success(data) {
		// 修改成功
	}
});

```


# 注意：云函数url化方式调用需要配置你的云函数url路径地址
`main.js` 在代码`Vue.use(vk); `的下方添加
```html
// 自定义云函数路由配置
Vue.prototype.vk.callFunctionUtil.setConfig({
    // 云函数路由（主函数url化地址）
    functionPath:"https://xxxxx.bspapp.com/http/router",
    // 云函数路由（开发测试函数url化地址）
    testFunctionPath:"https://xxxxx.bspapp.com/http/router-test",
});

```


# 前端非法token拦截器
`main.js` 在代码`Vue.use(vk); `的下方添加
```html
// 自定义token拦截器
Vue.prototype.vk.callFunctionUtil.interceptor.login = (obj = {}) =>{
	let {params, res} = obj;
	// 下方代码可自己修改，写成你自己的逻辑处理。
	if(!params.noAlert){
		Vue.prototype.vk.alert(res.result.msg);
	}
	console.log("跳自己的登录页面");
	// 上方代码可自己修改，写成你自己的逻辑处理。
};
```

## `vk.baseDao`数据库API
### 调用示例在`router/service/db_test/pub/`目录下
### 演示页面在`pages/db-test/db-test`
### `vk.baseDao`数据库API部分调用示例展示
```
增

let id = await vk.baseDao.add({
	dbName:"vk-test",// 表名
	dataJson:{ // 需要新增的数据 json格式
		money: Math.floor(Math.random() * 9 + 1)
	}
},event.util);


删 sql: delete from vk-test where money = 1

let num = await vk.baseDao.del({
	dbName:"vk-test",// 表名
	whereJson:{ // 条件
		money:1
	}
},event.util);

改 sql: update vk-test set money = money-1 where _id="5f3a14823d11c6000106ff5c" and money > 0

let num = await vk.baseDao.update({
	dbName:"vk-test", // 表名
	whereJson:{ // 条件
		_id:"5f3a14823d11c6000106ff5c",
		money:_.gt(0)
	},
	dataJson:{ // 需要修改的数据
		money:_.inc(-1)
	}
},event.util);

查 

// 根据id获取单条记录 sql: select * from vk-test where _id = "5f3a125b3d11c6000106d338"
let item = await vk.baseDao.findById({
	dbName:"vk-test",// 表名
	id:"5f3a125b3d11c6000106d338" // id
},event.util);

// 根据条件获取单条记录 sql: select * from vk-test where _id = "5f3a125b3d11c6000106d338"
res.item = await vk.baseDao.findByWhereJson({
	dbName:"vk-test",// 表名
	whereJson:{ // 条件
		_id:"5f3a125b3d11c6000106d338",
	}
},event.util);

// 分页查询多条数据 sql: select * from vk-test where money >= 0 limit 0,20;
let res = await vk.baseDao.select({
	dbName:"vk-test", // 表名
	pageKey:true, // 是否分页
	pageIndex:1, // 当前第几页
	pageSize:20, // 每页条数
	whereJson:{ // 条件
		money:_.gte(0)  // 金额大于0
	},
}, event.util);

// 获取记录总条数 sql: count * from vk-test
let num = await vk.baseDao.count({
	dbName:"vk-test",// 表名
	whereJson:{ // 条件
		
	}
},event.util);

// sum求和 sql: select sum(money) from vk-test
let sum = await vk.baseDao.sum({
	dbName:"vk-test", // 表名
	fieldName:"money", // 需要求和的字段名
	whereJson:{ // 条件
		
	}
},event.util);

// 连表查询 形式1、`many-to-one` 多对一 或 一对一 形式
let res = await vk.baseDao.select2({
	dbName:"vk-test",                 // 主表名
	dbName2:"uni-id-users",           // 副表名
	foreignKeyType:"many-to-one",     // one-to-many 一对多 many-to-one 多对一
	foreignKey:"kehuid",              // 主表外键字段名
	foreignKey2:"_id",                // 副表外键字段名
	as:"kehuInfo",                    // 副表数据插入到主表的字段名
	pageKey:true,                     // 是否分页(会返回count和hasMore)
	pageIndex:1,                      // 当前第几页
	pageSize:10,                      // 每页显示数据
	whereJson:{                       // 主表where条件
		
	},
	whereJson2:{                      // 副表where条件
		nickname : "测试客户1"
	},
	fieldJson:{                       // 主表字段显示规则
		
	},
	fieldJson2:{										  // 副表字段显示规则
		token : false,
		password : false
	},
	sortArr:[                         // 排序规则
		{
			"name":"money",
			"type":"desc"
		}
	]
}, event.util);

// 连表查询 形式2、`one-to-many` 一对多 或 多对多 形式
let res = await vk.baseDao.select2({
	dbName:"uni-id-users",            // 主表名
	dbName2:"vk-test",                // 副表名
	foreignKeyType:"one-to-many",     // one-to-many 一对多 many-to-one 多对一
	foreignKey:"_id",                 // 主表外键字段名
	foreignKey2:"kehuid",             // 副表外键字段名
	as:"kehuInfo",                    // 副表数据插入到主表的字段名
	pageKey:true,                     // 是否分页(会返回count和hasMore)
	pageIndex:1,                      // 当前第几页
	pageSize:10,                      // 每页显示数据
	fieldJson:{                       // 主表字段显示规则
		token:false,
		password:false,
	},
	fieldJson2:{                      // 副表字段显示规则
		
	},
	whereJson:{                       // 主表where条件
		
	},
	whereJson2:{                      // 副表where条件
		money:1
	},
	sortArr:[                         // 排序规则
		{
			"name":"money",
			"type":"desc"
		}
	]
}, event.util);
...更多其他可以下载插件体验


```

## `列表渲染`前后端一体模板
### 页面地址 `pages/db-test/list/list` 
##  核心点：前端只需要更改v-for循环内的样式和请求的云函数地址即可快速开发一个列表渲染功能

#### 列表渲染模板体验地址
![列表渲染体验地址](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-vk-cloud-router-test/97de21c0-e9ae-11ea-b997-9918a5dda011.png?x-oss-process=image/resize,h_250 "列表渲染体验地址")
#### 插件首页体验地址
![插件首页体验地址](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-vk-cloud-router-test/51de83e0-e9ae-11ea-81ea-f115fe74321c.png?x-oss-process=image/resize,h_250 "插件首页体验地址")
 
#### 客户端（前端）功能介绍:（页面路径：`pages/db-test/list/list`）
#### 若无数据，需要先执行添加测试数据的函数（页面路径：`pages/db-test/db-test`）
```
1、列表数据分页获取
2、无数据时的额外显示（显示空内容组件）
3、搜索功能
4、下拉底部加载下一页
5、加载过程底部状态提示 (加载更多、正在加载、没有更多了)
（熟练后只需要5分钟即可开发一个钱包余额收支列表功能（其中4分钟时间还是用在写样式上））
export default {
		data() {
			// 页面数据变量
			return {
				url:"db_test/pub/getList",		// 获取list数据的云函数请求路径
				...其他
			}
		}
		...其他
}
```
#### 云函数端（后端）功能介绍:（云函数路径：`db_test/pub/getList`）
```
1、根据where条件获取对应的数据表的数据（支持分页、排序、字段筛选、双表连接等）
云函数最终返回的数据格式为：
{
	code: 0,							// 0 成功 其他：失败
	hasMore: true,				// 是否还有下一页
	pageIndex: 1,					// 当前第几页
	pageSize: 10,					// 每页获取的数量
	rows: [{_id: "5f44680d3228ad0001b1ec1a", money: 5, kehuid: "001",…},…], // list数据
	total: 30							// 数据库符合条件的共有多少条数据
}

```

#### 开发一个列表渲染就是这么简单

`前后端一体动态数据组件`
### 已陆续新增一些 集成了`uview-ui`的`前后端一体动态数据组件`
### 如: 公告组件 图片轮播组件 等
### 前后端一体动态数据组件优势:

#### 1、减少APP或小程序的审核次数，页面组件局部更新不需要重新发布小程序，且实时生效。
#### 2、方便维护，只需要修改数据库对应的组件数据即可达到修改页面的目的。
#### 3、是支持可视化装修页面的必备能力。



# 如何切换正式环境和开发环境
## 开发环境切换分为两种方式
### 方式一：数据库使用正式环境，云函数使用开发环境。 
##### 适用场景：开发测试产生的数据不会污染正式环境时。（通常是需要调用正式环境数据进行云函数bug修复时）
##### 切换方法：切换测试环境需要复制一个`router`云函数，取名为`router-test`
##### 同时 在 `main.js` 的代码`Vue.use(vk); `的下方添加
```html
// 自定义云函数路由配置
Vue.prototype.vk.callFunctionUtil.setConfig({
	// 是否开启测试环境，true：使用测试环境，false：使用正式环境，默认true
	isTest:true
});

```

### 方式二：数据库和云函数都使用开发环境。 
##### 适用场景：开发测试产生的数据可能会污染正式环境时。（通常是新功能开发、测试时）
##### 切换方法：创建（复制）一个新的云服务空间
```html
具体步骤:
1、进入https://unicloud.dcloud.net.cn/home 创建一个新的云服务空间
2、右键cloudfunctions 选择云服务空间 - 选择新建的云服务空间(若切换失败,再试一次即可)
3、右键cloudfunctions 上传所有云函数及公共模块
4、重启项目(可关闭编译器重启或在控制台重启)
5、重启后就是测试环境，在测试环境开发测试完确保没有问题后，
切回正式环境，再上传云函数router即可更新至正式环境。
```


## 本插件更新步骤
#### 如果已经在插件的基础上进行开发了，则更新可按下面的步骤进行，否则直接下载并使用新版本插件即可。

## 后端（云函数端）更新步骤
打开 `cloudfunctions` 目录

```js
1、升级common目录下的公共模块
1.1、替换common目录下的uni-id公共模块为最新版本插件内的uni-id，并上传（右键common下的uni-id目录，点击上传公共模块）
```

```js
2、替换文件
替换router目录下的index.js文件
替换router/service目录下的user目录
替换router/service目录下的db_test目录
替换router/service目录下的components-dynamic目录
替换router目录下的util目录下的checkIsLogin.js文件
```

```js
3、上传云函数router（右键router目录，上传部署）
注意:上传前检查npm包是否已加载
目前使用的npm有:
.1、npm i ../common/uni-id
.2、npm i ../common/config
.3、npm i nodemailer
.4、npm i vk-unicloud
```

## 前端（页面端）更新步骤
在你的项目根目录执行npm命令：npm i vk-unicloud-page 进行安装

1. `npm`方式安装 先删除 `node_modules`
```js
npm i vk-unicloud-page
（若提示失败，再执行一次该命令即可）
```


## uniCloud云函数路由框架研究Q群:22466457 如有问题或建议可以在群内讨论。
## 你也可以在评论区发布留言交流心得。