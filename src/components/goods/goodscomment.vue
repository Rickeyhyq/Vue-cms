<template>
  <div class="temp">
    <!-- 传递值给子组件 -->
    <subcomment :commentId="this.$route.params.goodsId"></subcomment>
  </div>
</template>

<style scoped>
  .temp {
    margin-top: 50px;
  }
</style>

<script>
  import common from '../../common/common.js'
  // 引入评论子组件
  import subcomment from '../subcomponent/subcomment.vue'

  export default {
    components: {
      subcomment: subcomment
    }
  }
</script>