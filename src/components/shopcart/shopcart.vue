<template>
  <div class="temp">
    <!-- 添加到购物车的商品列表部分 -->
    <div class="shopcart-list">
      <section class="shopcart-item" v-for="(item, index) in shopCartList">
        <div class="item-switch">
                                              <!-- 数组中对应的值跟随按钮状态变化 -->
          <mt-switch @change="change" class="switch" v-model="switchValues[index]"></mt-switch>
        </div>
        <img :src="item.thumb_path">
        <div class="goods-info">
          <h5>{{ item.title }}</h5>
          <div class="goods-price">
            <span>￥{{ item.sell_price }}</span>
            数量：<div class="item-count">{{ item.count }}</div>
            <mt-button @click="deleteById(item.id)" size="small" type="danger" class="del-btn">删除</mt-button>
          </div>
        </div>
      </section>
    </div>
    <!-- 商品总价结算部分 -->
    <div class="check-out">
      <div class="total-price">
        <p>合计：￥<span>{{ totalPrice }}</span></p>
        <p>已勾选商品<span> {{ selectedCount }} </span>件,总金额：￥<span>{{ totalPrice }}</span></p>
      </div>
      <mt-button size="small" type="danger" class="buy-btn">结算</mt-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
  // 商品列表部分样式
  .shopcart-list {
    padding: 5px 5px 0;
    margin-bottom: 130px;
    .shopcart-item {
      display: flex;
      height: 100px;
      margin-bottom: 6px;
      background-color: #fff;
      .item-switch {
        padding: 0 10px;
        .switch {
          width: 52px;
          height: 100px;
        }
      }
      img {
        margin-top: 10px;
        padding: 5px;
        width: 80px;
        height: 80px;
      }
    }
    .goods-info {
      padding: 5px 10px;
      h5 {
        margin: 0;
        color: black;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 20px;
        max-height: 40px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .goods-price {
        margin-top: 18px;
        font-size: 14px;
        span {
          display: inline-block;
          width: 60px;
          font-size: 16px; 
          color: red;
          margin-right: 10px;
        }
        .item-count {
          display: inline-block;
          text-align: center;
          width: 20px;
          height:20px;
          border: 1px solid rgba(92, 92, 92, 0.4);
          margin-top: 3px;
        }
        .del-btn {
          padding: 0 6px;
          height: 26px;
          margin-left: 10px; 
        }
      }
    }
  }
  // 商品总价部分样式
  .check-out {
    height: 70px;
    width: 100%;
    position: fixed;
    bottom: 50px;
    background-color: #fff;
    .total-price {
      float: left;
      padding: 10px;
      p {
        color: black;
        margin-bottom: 5px;
        span {
          font-size: 16px;
          color: red;
        }
      }
    }
    .buy-btn {
      float: right;
      font-size: 20px;
      width: 80px;
      height: 40px;
      margin-top: 16px;
      margin-right: 14px;
    }
  }
</style>

<script>
  import common from '../../common/common.js'
  // 导入购物车管理模块
  import { getItem, removeItem } from '../../common/shopcartmanager.js'

  import { bus } from '../../common/bus.js'

  export default {
    data () {
      return {
        shopCartList: [],
        switchValues: [],
        selectedCount: 0,
        totalPrice: 0
      }
    },
    created () {
      // 获取初始化数据
      this.getShopCartData()
    },
    methods: {
      getShopCartData () {
        // 获取localStorage中存储的数据
        const goodsArray = getItem()
        // 格式化成对象形式 {goodsId: count}
        let goodsObj = {}
        goodsArray.forEach(item => {
          goodsObj[item.goodsId] = item.count
        })

        // 将每个goodsId拼接成指定形式的字符串，获取图片 '87,88,89...'
        let idArray = []
        for (var key in goodsObj) {
          idArray.push(key)
        }
        let idStr = idArray.join(',')
        console.log(idStr)
        const url = common.apihost + '/api/goods/getshopcarlist/' + idStr
        this.$http.get(url).then(res => {
          res.body.message.forEach(item => {
            item.count = goodsObj[item.id]
          })
          this.shopCartList = res.body.message
          // 计算总价
          let totalPrice = 0
          let selectedCount = 0
          this.shopCartList.forEach((item, index) => {
            this.switchValues[index] = true
            selectedCount += item.count
            totalPrice += item.count * item.sell_price
          })
          this.totalPrice = totalPrice
          this.selectedCount = selectedCount
        }, err => {
          console.log(err)
        })
      },
      // switch按钮change事件,重新计算总价
      change () {
        // console.log(this.switchValues)
        let totalPrice = 0
        let selectedCount = 0
        let totalCount = 0
        this.switchValues.forEach((item, index) => {
          totalCount += this.shopCartList[index].count
          // 如果按钮为选中状态就计算到总价中
          if (item) {
            let goods = this.shopCartList[index]
            selectedCount += goods.count
            totalPrice += goods.sell_price * goods.count
          }
        })
        bus.$emit('delete', totalCount)
        this.totalPrice = totalPrice
        this.selectedCount = selectedCount
      },
      deleteById (goodsId) {
        // 删除localStorage中的商品
        removeItem (goodsId);
        
        // 删除商品列表中商品
        for (var i = 0; i< this.shopCartList.length; i++) {
          if (this.shopCartList[i].id == goodsId){
            this.shopCartList.splice(i,1);
            this.switchValues.splice(i,1);
            break
          }
        }

        // 重新计算总价
        this.change()
      }
    }
  }
</script>