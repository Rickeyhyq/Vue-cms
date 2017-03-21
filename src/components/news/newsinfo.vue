<template>
  <div class="temp">
    <div class="news-title">
      <h4 :title="newsInfo.title">{{ newsInfo.title }}</h4>
      <p>时间：{{ newsInfo.add_time | dateFormat('YYYY-MM-DD') }} &nbsp; 点击{{ newsInfo.click }} &nbsp; 分类：新闻</p>  
    </div>
    <div class="news-content">
      <p v-html="newsInfo.content"></p>
    </div>

    <!-- 使用评论子组件 -->
    <!-- 父组件传递值给子组件，子组件用prop接受 -->
    <subcomment :commentId="this.$route.params.newsId"></subcomment>
  </div>
</template>

<style scoped>
  .news-title {
    padding: 10px;
    border-bottom: 2px solid #b8b8b8;
  }

  /* 设置文字超出一行的部分自动隐藏，以...代替 */
  .news-title h4 {
    width: 100%;
    overflow-x: auto; /* 设置可以x轴滑动显示超出的部分 */
    /*text-overflow: ellipsis;  显示省略符号来代表被修剪的文本 */
    white-space: nowrap; /* 禁止换行 */
  }

  .news-title p {
    color: #0094ff;
    font-size: 12px;
    margin-bottom: 0;
  }

  .news-content {
    padding: 10px;
  }
</style>

<script>
  import common from '../../common/common.js'

  // 导入评论子组件
  import subcomment from '../subcomponent/subcomment.vue'

  export default {
    data () {
      return {
        newsInfo: {}
      }
    },
    created () {
      this.getNewsInfoData()
    },
    methods: {
      getNewsInfoData () {
        // 获取newsId
        const newsId = this.$route.params.newsId
        // 拼接url
        const url = common.apihost + '/api/getnew/' + newsId
        // 发送请求获取新闻详情页数据
        this.$http.get(url).then(res => {
          this.newsInfo = res.body.message[0]
        })
      }
    },
    components: {
      subcomment: subcomment
    }
  }
</script>