'use strict'
// 1. 导入组件
import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'

// 引入mint-ui组件，全部加载
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.min.css'

// mint-ui按需加载
import { Header, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
// Vue.use(Header)
// Vue.use(Button)
// Vue.use(Mint)

import '../statics/mui/css/mui.min.css'

// 2. 创建Vue对象
new Vue({
  el: '#app',
  render: c => c(App)  // 使用webpack渲染App.vue这个根组件(c是一个函数)
})