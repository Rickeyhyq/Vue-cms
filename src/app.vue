<template>
  <div>
    <!-- mint-ui header 组件 -->
    <mt-header fixed title="Vue信息管理">
      <mt-button icon="back" slot="left" @click='goBack()' v-show="isShow">返回</mt-button>
    </mt-header>

    <router-view></router-view>

    <!-- mui tab-bar 组件 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-email"></span>
        <span class="mui-tab-label">消息</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcart">
        <span class="mui-icon mui-icon-contact"><span class="mui-badge" id="badge">0</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/settings">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">设置</span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
  .mui-bar-tab {
    bottom: -1px;
    box-shadow: none;
  }
</style>

<script>
  // 引入公共的vue对象
  import { bus } from './common/bus.js';

  // 导入购物车管理模块
  import { getItem } from './common/shopcartmanager.js'

  // 注册事件的代码必须写在外面
  // 监听 goodsinfo 发射的shopCount事件c
  bus.$on('shopCount', goodsCount => {
    // 获取从 goodsinfo 传递过来的值
    console.log(goodsCount)
    var badgeObj = document.getElementById('badge')
    var count = badgeObj.innerHTML - 0
    // 累加
    count += goodsCount;
    // 重新赋值
    badgeObj.innerHTML = count
  })

  // 监听 shopcart 发射的delete事件
  bus.$on('delete', restCount => {
    // 获取从 shopcart 传递过来的值
    console.log(restCount)
    var badgeObj = document.getElementById('badge')
    // 重新赋值 restCount 为剩余的商品总数
    badgeObj.innerHTML = restCount
  })

  export default {
    data () {
      return {
        isShow: false
      }
    },
    created () {
      console.log(this.$route.path)
      // 刷新页面的时候判断当前路由的路径,如果不是首页就显示返回按钮
      if (this.$route.path.toLowerCase() == '/home' || this.$route.path.toLowerCase() == '/member' || this.$route.path.toLowerCase() == '/shopcart' || this.$route.path.toLowerCase() == '/settings') {
        this.isShow = false
      } else {
        this.isShow = true
      } 
    },
    mounted () {
      // 刷新页面时保持购物车徽标显示商品数量
      var badgeObj = document.getElementById('badge')
      var goodsCount = 0
      var goodsArray = getItem()
      console.log(badgeObj)
      goodsArray.forEach(item => {
        goodsCount += item.count
      })
      badgeObj.innerHTML = goodsCount
    },
    methods: {
      // 点击跳到上一条历史记录，返回上一页
      goBack () {
        this.$router.go(-1)
      }
      // windowOnLoad () {
      //   if (this.$route.path.toLowerCase() == '/home' || this.$route.path.toLowerCase() == '/member' || this.$route.path.toLowerCase() == '/shopcart' || this.$route.path.toLowerCase() == '/settings') {
      //     this.isShow = false
      //   } else {
      //     this.isShow = true
      //   }
      // }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        // to为下一步跳转到的路由，如果不是首页就显示返回按钮
        console.log(to.path)
        if (to.path.toLowerCase() == '/home' || to.path.toLowerCase() == '/member' || to.path.toLowerCase() == '/shopcart' || to.path.toLowerCase() == '/settings') {
          this.isShow = false
        } else {
          this.isShow = true
        }
      }
    }
  }
</script>