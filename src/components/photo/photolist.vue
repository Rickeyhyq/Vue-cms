<template>
  <div class="temp">
    <div class="category">
      <ul>
        <li @click="getPhotoListByCategoryId(0)">
          <a>全部</a>
        </li>
        <li v-for="item in categoryList" @click="getPhotoListByCategoryId(item.id)">
          <a>{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <div class="photo-list">
      <section class="photo-item" v-for="photo in photoList">
        <h4>{{ photo.title }}</h4>
        <router-link :to="'/photo/info/' + photo.id">
          <img v-lazy="photo.img_url">
          <div class="mask-content">{{ photo.zhaiyao }}</div>
        </router-link>
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
  // 图片列表导航部分
  .category {
    width: 100%;
    height: 40px;
    line-height: 40px;
    overflow-x: auto;
    white-space: nowrap;
    ul {
      margin: 0;
      padding: 0 5px;
      li {
        display: inline-block;
        list-style: none;
        padding: 0 5px;
      }
    }
  }

  // 图片部分
  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  .photo-list {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    .photo-item {
      width: 100%;
      position: relative;
      margin-bottom: 10px;
      h4 {
        overflow-x: auto;
        width: 100%;
        white-space: nowrap;
        line-height: 30px
      }
      a {
        display: block;
        img {
        width: 100%;
        }
        .mask-content {
          font-size: 14px;
          position: absolute;
          width: 100%;
          height: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          bottom: 4px;
          color: white;
          padding: 5px;
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
</style>

<script>
  import common from '../../common/common.js'

  import { Indicator } from 'mint-ui'

  export default {
    data () {
      return {
        categoryList: [],
        photoList: []
      }
    },
    created () {
      this.getCategoryListData()
      this.getPhotoListByCategoryId(0);
    },
    methods: {
      // 获取图片分类导航列表
      getCategoryListData () {
        const url = common.apihost + '/api/getimgcategory'
        this.$http.get(url).then(res => {
          this.categoryList = res.body.message
        }, err => {
          console.log(err)
        })
      },
      // 根据分类id获取图片列表
      getPhotoListByCategoryId (categoryId) {
        // 清空之前导航里面的图片列表内容
        this.photoList = []

        // 加载中提示
        Indicator.open({
          text: '加载中...',
          spinnerType: 'double-bounce'
        });

        const url = common.apihost + '/api/getimages/' + categoryId
        this.$http.get(url).then(res => {
          this.photoList = res.body.message
          console.log(this.photoList);
          // 获取数据完成关闭提示
          Indicator.close()
        }, err => {
          console.log(err)
        })
      }
    }
  }

</script>