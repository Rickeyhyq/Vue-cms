<template>
  <div class="sub-count">
    <div class="subtract" @click="subtract">-</div>
    <div class="count">{{ count }}</div>
    <div class="add" @click="add">+</div>
  </div>
</template>

<style lang="less" scoped>
  .sub-count {
    margin-bottom: 15px;
    div {
      text-align: center;
      margin-right: 8px;
      display: inline-block;
      width: 25px;
      line-height: 24px;
      border: 1px solid rgba(92, 92 ,92, 0.4);
    }
    .count {
      width: 40px;
    }
  }
</style>

<script>
  import { Toast } from 'mint-ui'

  export default {
    data () {
      return {
        count: 1
      }
    },
    methods: {
      subtract () {
        if (this.count <= 1){
          return
        }
        this.count--
        this.broadcast()
      },
      add () {
        if (this.count >= this.stockCount) {
          Toast({
            message: '库存不足',
            duration: 1000
          })
          return
        }
        this.count++
        this.broadcast()
      },
      broadcast () {
        // 将this.count发送给goodsinfo(父组件)
        // 子组件中发送数据给父组件，就是使用this.$emit(事件名称,值)
        this.$emit('goodsCount', this.count)
      }
    },
    // 父组件穿过来库存数量
    props: ['stockCount']
  }
</script>