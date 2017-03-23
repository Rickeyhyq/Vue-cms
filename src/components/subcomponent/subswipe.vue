<template>
  <mt-swipe :auto="3000" class="swipe">
    <mt-swipe-item v-for="item in imageList" :key="item.url" class="swipe-item">
      <a :href="item.url">
        <img :src="item.img">
      </a>
    </mt-swipe-item>
  </mt-swipe>
</template>

<style lang="less" scoped>
  .swipe {
    width: 100%;
    height: 250px;
    .swipe-item img {
      width: 100%;
      height: 250px;
    }
  }
</style>

<script>
  export default {
    // 父组件传过来的值
    props: ['imageList']
  }
</script>