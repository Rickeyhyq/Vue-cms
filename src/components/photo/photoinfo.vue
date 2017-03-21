<template>
  <div class="temp">
    <!-- 标题部分 -->
    <div class="photo-title">
      <h4>{{ photoInfo.title }}</h4>
      <p>{{ photoInfo.add_time | dateFormat('YYYY-MM-DD') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ photoInfo.click }}次浏览</p>
    </div>
    
    <!-- 缩略图部分 -->
    <div class="thumimage-list">
      <ul>
        <li v-for="(item, index) in thumimageList">
          <img :src="item.src" class="preview-img" @click="$preview.open(index, thumimageList)">
        </li>
      </ul>
    </div>

    <div class="photo-content" v-html="photoInfo.content"></div>

    <!-- 评论组件 -->
    <subcomment :commentId="this.$route.params.photoId"></subcomment>
  </div>
</template>

<style lang="less" scoped>
  // 标题部分样式
  .photo-title {
    width: 100%;
    padding: 5px 10px 10px;
    h4 {
      margin: 0;
      overflow-x: auto;
      white-space: nowrap;
      line-height: 30px; 
    }
    p {
      color: #26a2ff;
      margin: 0;
    }
  }
  // 缩略图样式
  .thumimage-list {
    width: 100%;
    padding: 0 10px;
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        display: inline-block;
        width: 98px;
        height: 98px;
        background-color: pink;
        margin: 10px 10px;
        img {
          width: 100%;
        }
      }
    }
  }
  .photo-content {
    padding: 20px 10px;
    font-size: 16px;    
  }
</style>

<script>
  import common from '../../common/common.js'

  // 导入评论子组件
  import subcomment from '../subcomponent/subcomment.vue'

  export default {
    data () {
      return {
        photoInfo: {},
        // 缩略图路径数组
        thumimageList: []
      }
    },
    created () {
      this.getPhotoInfoData();
      this.getThumimagesData();
    },
    methods: {
      getPhotoInfoData () {
        const url = common.apihost + '/api/getimageInfo/' + this.$route.params.photoId
        this.$http.get(url).then(res => {
          this.photoInfo = res.body.message[0]
        }, err => {
          console.log(err)
        })
      },
      // 获取缩略图路径信息
      getThumimagesData () {
        const url = common.apihost + '/api/getthumimages/' + this.$route.params.photoId
        this.$http.get(url).then(res => {
          res.body.message.forEach(item => {
            item.w = 600
            item.h = 400
          })
          this.thumimageList = res.body.message
        }, err => {
          console.log(err)
        })
      }
    },
    components: {
      subcomment: subcomment 
    }
  }
</script>