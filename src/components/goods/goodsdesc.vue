<template>
  <div class="temp">
    商品介绍页
  </div>
</template>

<style lang="less" scoped>
  
</style>

<script>
  import common from '../../common/common.js'

  export default {
    data () {
      return {
        goodsDecs: {}
      }
    },
    created () {
      this.getGoodsDescData()
    },
    methods: {
      getGoodsDescData () {
        const url = common.apihost + '/api/goods/getdesc' + this.$route.params.goodsId
        this.$http.get(url).then(res => {
          this.goodsDecs = res.body.message
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>