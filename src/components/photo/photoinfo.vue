<template>
  <div class="temp">
    <div class="photo-title">
      <h4>{{ photoInfo.title }}</h4>
      <p>{{ photoInfo.add_time | dateFormat('YYYY-MM-DD') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ photoInfo.click }}次浏览</p>
    </div>
    <div class="thumimage-list">
      <ul>
        <li v-for="item in thumimageList">
          <a>
            <img :src="item.src">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
  .thumimage-list {
    width: 100%;
    padding: 0 10px;
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        display: inline-block;
        width: 80px;
        height: 80px;
        background-color: pink;
        margin: 10px 15px;
        a {
          display: block;
          width: 100%;
          height: 100%;
          img {
          width: 100%;
          }
        }
      }
    }
    
  }
</style>

<script>
  import common from '../../common/common.js'

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
          this.thumimageList = res.body.message
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>