import Vue from 'vue'
// 导入路由包
import Router from 'vue-router'
// 导入首页组件
import Home from '@/components/home/home.vue'
// 导入登录组件
import Login from '@/components/login/login.vue'
// 导入home子组件 - Users组件
import Users from '@/components/users/users.vue'
// 使用路由包
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'home'}},
    {path: '*', redirect: {name: 'home'}},
    {name: 'login', path: '/login', component: Login},
    {
      name: 'home', path: '/home', component: Home, children: [
        {name: 'users', path: '/users', component: Users}
      ]
    }
  ]
})
