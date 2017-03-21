<template>
  <div class="temp">
    <div class="category">
      <ul>
        <li>
          <a href="#">全部</a>
        </li>
        <li v-for="item in categoryList">
          <a href="#">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
</style>

<script>
  import common from '../../common/common.js'

  export default {
    data () {
      return {
        categoryList: []
      }
    },
    created () {
      this.getCategoryListData()
    },
    methods: {
      getCategoryListData () {
        const url = common.apihost + '/api/getimgcategory'
        this.$http.get(url).then(res => {
          this.categoryList = res.body.message
        }, err => {
          console.log(err)
        })
      }
    }
  }

</script>