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

  // 注册事件的代码必须写在外面
  bus.$on('shopCount', goodsCount => {
    // 获取从 goodsinfo 传递过来的值
    console.log(goodsCount)
    var badgeObj = document.getElementById('badge')
    var oldValue = badgeObj.innerHTML - 0
    // 累加
    oldValue += goodsCount;
    // 重新赋值
    badgeObj.innerHTML = oldValue
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