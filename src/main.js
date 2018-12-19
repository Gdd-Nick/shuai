// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui相关文件
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
// 导入自己封装的myaxios插件
import MyAxios from '@/assets/js/myaxios.js'
// 引入自定义重置样式
import '@/assets/css/reset.css'

// 使用element-ui插件
Vue.use(ElementUI)
// 使用自己封装的插件
Vue.use(MyAxios)

// 在生产环境不要要设置一些提示/警告
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
