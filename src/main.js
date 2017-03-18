'use strict'
// 1. 导入组件
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'

// 引入mint-ui组件，全部加载
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.min.css'

// mint-ui组件按需加载
import { Header, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
// Vue.use(Header)
// Vue.use(Button)
// Vue.use(Mint)

// 引入mui相关文件
import '../statics/mui/css/mui.min.css'

// 使用路由
Vue.use(VueRouter)

// 引入组件
import home from './components/home/home.vue'

// 创建并配置路由
const vueRouter = new VueRouter({
  routes: [
    { name: '/', path: '/', redirect: 'home'},
    { name: 'home', path: '/home', component: home}
  ]
})

// 2. 创建Vue对象
new Vue({
  el: '#app',
  router: vueRouter,
  render: c => c(App)  // 使用webpack渲染App.vue这个根组件(c是一个函数)
}).$mount('#app')