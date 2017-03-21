<template>
  <div class="temp">
    
    <!-- mint-ui 轮播图组件 -->
    <mt-swipe :auto="4000" class="mt_swipe">
      <mt-swipe-item v-for="item in imageList" :key="item.img">
        <a :href="item.url">
          <img :src="item.img">
        </a>
      </mt-swipe-item>
    </mt-swipe>
    
    <!-- 首页九宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/news/list" href="#">
            <span class="mui-icon mui-icon-home"></span>
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/photo/list" href="#">
            <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-chatbubble"></span>
            <div class="mui-media-body">商品购买</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-location"></span>
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-search"></span>
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-phone"></span>
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<style scoped>
  /* 轮播图 */
  .mt_swipe {
    width: 100%;
    height: 250px;
  }
  .mt_swipe img {
    width: 100%;
    height: 250px;
  }

  /* 九宫格导航 */

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }

  .mui-icon {
    width: 45px;
    height: 45px;
  }

  .mui-icon.mui-icon-home {
    background-image: url('../../../statics/images/menu3.png');
    background-repeat: round;
  }
  .mui-icon-email {
    background-image: url(../../../statics/images/menu4.png);
    background-repeat: round;
  }

  .mui-icon-chatbubble {
    background-image: url(../../../statics/images/menu5.png);
    background-repeat: round;
  }

  .mui-icon-location {
    background-image: url(../../../statics/images/menu6.png);
    background-repeat: round;
  }

  .mui-icon-search {
    background-image: url(../../../statics/images/menu9.png);
    background-repeat: round;
  }

  .mui-icon-phone {
    background-image: url(../../../statics/images/menu10.png);
    background-repeat: round;
  }

  .mui-icon-home:before,
  .mui-icon-email:before,
  .mui-icon-chatbubble:before,
  .mui-icon-location:before,
  .mui-icon-search:before,
  .mui-icon-phone:before {
    content: '';
  }


</style>

<script>

  import common from '../../common/common.js'

  export default {
    data () {
      return {
        imageList: []
      }
    },
    created () {
      this.getSwipeData()
    },
    methods: {
      getSwipeData () {
        // 获取请求地址
        const url = common.apihost + '/api/getlunbo'
        // 发送请求
        this.$http.get(url).then(res => {
          this.imageList = res.body.message
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>