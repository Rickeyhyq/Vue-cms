'use strict'
// 1. 导入模块
import Vue from 'vue'
import app from './app.vue'

// 2. 创建Vue对象
new Vue({
  el: '#app',
  render: c => c(app)  // 使用webpack渲染app.vue这个根组件(c是一个函数)
})