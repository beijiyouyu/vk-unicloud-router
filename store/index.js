import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 加载modules目录下所有文件(分模块)
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})
const store = new Vuex.Store({
    modules,
		// 如果是开发环境,则开启严格模式
		strict: process.env.NODE_ENV === 'development'
})

export default store
