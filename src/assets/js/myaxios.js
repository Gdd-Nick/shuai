// 目的：将 axios 封装为 vue 的插件
// 1）创建一个 js 文件，用来封装 axios
// 2）在文件中创建一个插件对象
// 3）添加一个 install 方法
// 4）实现这个方法
// 5）导出这个对象
// 6）在 main.js 中引用这个自定义插件
// ===============================================

// 引入axios
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

// 创建插件对象
var myaxios = {}
// 给插件对象添加install方法
// 实现这个方法
myaxios.install = function (Vue) {
  // 把axios挂载到vue实例中
  Vue.prototype.$http = axios
}
// 导出这个插件对象
export default myaxios
