<template>
  <div class="temp">
    <div class="goods-desc">
      <h4>{{ goodsDesc.title }}</h4>
      <div class="goods-introduction" v-html="goodsDesc.content"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .goods-desc {
    padding: 5px 10px;
    h4 {
      line-height: 24px;
    }
    .goods-introduction {
      width: 100%;
      overflow-x: auto;
      margin-top: 10px;
      padding: 10px 0;
      border-top: 1px solid rgba(92, 92, 92 ,0.3);
    }
  }
</style>

<script>
  import common from '../../common/common.js'

  export default {
    data () {
      return {
        goodsDesc: {}
      }
    },
    created () {
      this.getGoodsDescData()
    },
    methods: {
      getGoodsDescData () {
        const url = common.apihost + '/api/goods/getdesc/' + this.$route.query.goodsId
        this.$http.get(url).then(res => {
          this.goodsDesc = res.body.message[0]
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>