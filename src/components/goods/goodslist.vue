<template>
  <div class="temp">
    <div class="goods-list">
      <section class="goods-item" v-for="item in goodsList">
        <router-link :to="'/goods/info/' + item.id">
          <img :src="item.img_url">
          <div class="goods-about">
            <h4>{{ item.title }}</h4>
            <p class="goods-price">现价:<span>￥{{ item.sell_price }}</span>&nbsp;&nbsp;&nbsp;&nbsp;原价:￥<del>{{ item.market_price }}</del></p>
            <p class="goods-tips">热卖中&nbsp;&nbsp;&nbsp;&nbsp;剩余库存:<span>{{ item.stock_quantity }}</span></p>
          </div>
        </router-link>
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .goods-list {
    width: 100%;
    height: 100%;
    padding: 5px 5px 0; 
    .goods-item {
      width: 100%;
      height: 120px;
      margin-bottom: 5px;
      background-color: #fff;
      border: 1px solid rgba(92, 92, 92, 0.2);
      img {
        float:left;
        width: 33%;
        height: 120px;
        padding: 3px;
      }
      .goods-about {
        float: right;
        width: 67%;
        height: 100%;
        padding: 5px 10px 5px 15px;
        h4 {
          color: black;
          font-size: 16px;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-height: 22px;
          max-height: 44px;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        p.goods-price {
          margin-top: 10px;
          span {
            color: red;
            font-weight: 700;
            font-size: 16px;
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
        goodsList: []
      }
    },
    created () {
      this.getGoodsListData()
    },
    methods: {
      getGoodsListData () {
        const url = common.apihost + '/api/getgoods'
        this.$http.get(url).then(res => {
          this.goodsList = res.body.message
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>