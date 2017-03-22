<template>
  <div class="temp">
    <!-- 轮播图 -->
    <div class="goods-swipe">
      <!-- 使用轮播图子组件 -->
      <subswipe :imageList="swipeList"></subswipe> 
    </div>
    <!-- 商品购买信息 -->
    <div class="goods-purchase">
      <h4>{{ goodsInfo.title }}</h4>
      <p>市场价:￥<del>{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;&nbsp;&nbsp;销售价:￥<span>{{ goodsInfo.sell_price }}</span></p>
      <mt-button size="small" type="primary">立即购买</mt-button>
      <mt-button size="small" type="danger">加入购物车</mt-button>
    </div>

    <!-- 商品参数信息 -->
    <div class="goods-params">
      <h4>商品参数</h4>
      <ul>
        <li>商品货号:{{goodsInfo.goods_no}}</li>
        <li>库存情况:剩余{{goodsInfo.stock_quantity}}件</li>
        <li>上架时间:{{goodsInfo.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</li>
      </ul>
      <mt-button class="goods-btn" size="large" plain type="primary">图文介绍</mt-button>
      <mt-button @click="getGoodsComment" class="goods-btn" size="large" plain type="danger">商品评论</mt-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
  // 通用样式
  .goods-swipe, .goods-purchase, .goods-params {
    padding: 5px 10px 10px;
    margin: 5px;
    margin-top: 45px;
    border: 1px solid rgba(92, 92, 92, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }
  // 商品购买信息样式
  .goods-purchase {
    height: 100%;
    margin-top: 8px;
    h4 {
      font-size: 16px;
      line-height: 24px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(92, 92, 92, 0.3); 
    }
    p {
      span {
        font-size: 16px;
        font-weight: 700;
        color: red;
      }
    }
  }
  // 商品参数信息样式
  .goods-params {
    height: 100%;
    margin-top: 8px;
    h4 {
      font-size: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(92, 92, 92, 0.3); 
    }
    ul {
      margin: 10px 0 0;
      padding: 0;
      li {
        font-size: 14px;
        line-height: 20px;
        list-style: none;
      }
    }
    .goods-btn {
      margin-top: 16px;
    }
  }
  
</style>

<script>
  import common from '../../common/common.js'
  // 引入轮播图子组件
  import subswipe from '../subcomponent/subswipe.vue'

  export default {
    data () {
      return {
        goodsInfo: {},
        swipeList: []
      }
    },
    created () {
      // 获取商品信息
      this.getGoodsInfoData()
      // 获取轮播图
      this.getSwipeListData()
    },
    methods: {
      getGoodsInfoData () {
        const url = common.apihost + '/api/goods/getinfo/' + this.$route.params.goodsId
        this.$http.get(url).then(res => {
          this.goodsInfo = res.body.message[0]
        }, err => {
          console.log(err)
        })
      },
      getSwipeListData () {
        const url = common.apihost + '/api/getthumimages/' + this.$route.params.goodsId
        this.$http.get(url).then(res => {
          this.swipeList = res.body.message
        }, err => {
          console.log(err)
        })
      },
      getGoodsComment () {
        this.$router.push({name: 'goodscomment', params: {goodsId: this.$route.params.goodsId}})
      }
    },
    // 注册子组件
    components: {
      subswipe: subswipe
    }
  }
</script>
