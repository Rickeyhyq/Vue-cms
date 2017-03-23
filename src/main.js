'use strict'
// 1. 导入组件
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 引入mint-ui组件，全部加载
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.min.css'

// mint-ui组件按需加载
import { Header, Button, Swipe, SwipeItem, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Lazyload);
// Vue.use(Header)
// Vue.use(Button)
// Vue.use(Mint)

// 引入mui相关文件
import '../statics/mui/css/mui.min.css'

// 引入自己的css文件
import '../statics/css/base.css'

// 注册全局过滤器
import moment from 'moment'
Vue.filter('dateFormat', (input, formatString) => {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return moment(input).format(formatString)
})

// 使用vue-resource
Vue.use(VueResource)

// 使用路由
Vue.use(VueRouter)

// 引入组件
import home from './components/home/home.vue'
import member from './components/member/member.vue'
import shopcart from './components/shopcart/shopcart.vue'
import settings from './components/settings/settings.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photo/photolist.vue'
import photoinfo from './components/photo/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodscomment from './components/goods/goodscomment.vue'
import goodsdesc from './components/goods/goodsdesc.vue'

// 创建并配置路由
const vueRouter = new VueRouter({
  routes: [
    { name: '/', path: '/', redirect: 'home'},
    { name: 'home', path: '/home', component: home},
    { name: 'member', path: '/member', component: member},
    { name: 'shopcart', path: '/shopcart', component: shopcart},
    { name: 'settings', path: '/settings', component: settings},
    { name: 'newslist', path: '/news/list', component: newslist},
    { name: 'newsinfo', path: '/news/info/:newsId', component: newsinfo},
    { name: 'photolist', path: '/photo/list', component: photolist},
    { name: 'photoinfo', path: '/photo/info/:photoId', component: photoinfo},
    { name: 'goodslist', path: '/goods/list', component: goodslist},
    { name: 'goodsinfo', path: '/goods/info/:goodsId', component: goodsinfo},
    { name: 'goodscomment', path: '/goods/comments/:goodsId', component: goodscomment},
    { name: 'goodsdesc', path: '/goods/desc', component: goodsdesc}
  ],
  // 设置当前激活路由的样式
  linkActiveClass: 'mui-active'
})

// 2. 创建Vue对象
new Vue({
  el: '#app',
  router: vueRouter,
  render: c => c(App)  // 使用webpack渲染App.vue这个根组件(c是一个函数)
})