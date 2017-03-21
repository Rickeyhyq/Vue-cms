<template>
  <div class="sub-comment">
    <!-- 提交评论部分 -->
    <div class="submit-comment">
      <h4>提交评论</h4>
      <div class="submit-textarea">
        <textarea placeholder="请输入要评论的内容" rows="3"></textarea>
        <mt-button type="primary" size="large">提交评论</mt-button>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="comment-list">
      <h4>评论列表</h4>
      <div class="comment-item">
        <p>content</p>
        <div>
          <div class="comment-user">匿名用户</div>
          <div class="comment-time">时间</div>
        </div>
      </div>
      <mt-button plain type="danger" size="large">加载更多</mt-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .sub-comment {
    padding: 0 10px 5px;
    h4 {
      font-size: 16px;
    }
    .submit-textarea {
      padding: 10px 0 15px;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
    }
    .comment-list {
      margin-top: 15px;
      .comment-item {
        padding: 5px 0;
        font-size: 12px;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        p {
          margin-bottom: 5px;
        }
        .comment-user {
          float: left;
          margin-right: 100px;
        }
        .comment-time {
          float: left;
        }
      }
    } 
  }
</style>

<script>
  import common from '../../common/common.js'

  export default {
    data () {
      return {}
    },
    // 导入父组件传递过来的值
    props: ['commentId']
  }
</script>