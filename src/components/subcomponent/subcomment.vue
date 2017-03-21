<template>
  <div class="sub-comment">
    <!-- 提交评论部分 -->
    <div class="submit-comment">
      <h4>提交评论</h4>
      <div class="submit-textarea">
        <textarea ref="commentData" placeholder="请输入要评论的内容" rows="3"></textarea>
        <mt-button type="primary" size="large" @click="submitComment()">提交评论</mt-button>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="comment-list">
      <h4>评论列表</h4>
      <div class="comment-item" v-for="item in commentList">
        <p>{{ item.content }}</p>
        <div>
          <div class="comment-user">{{ item.user_name }}</div>
          <div class="comment-time">{{ item.add_time | dateFormat('YYYY-MM-DD') }}</div>
        </div>
      </div>
      <mt-button plain type="danger" size="large" class="loadmore" @click="loadMore()">加载更多</mt-button>
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
      border-top: 1px solid #b8b8b8;
      border-bottom: 1px solid #b8b8b8;
    }
    .comment-list {
      margin-top: 15px;
      .comment-item {
        height: 100%;
        padding: 5px 0;
        font-size: 12px;
        border-top: 1px solid #b8b8b8;
        // border-bottom: 1px solid #b8b8b8;
        p {
          margin-bottom: 5px;
        }
        .comment-user {
          color: #26a2ff;
          display: inline-block;
          margin-right: 100px;
        }
        .comment-time {
          color: #26a2ff;
          display: inline-block;
        }
      }
      .loadmore {
        margin-top: 20px;
      }
    } 
  }
</style>

<script>
  import common from '../../common/common.js'
  import { Toast } from 'mint-ui'

  export default {
    data () {
      return {
        pageIndex: 1,
        commentList: [],
        // 判断是否加载完全部评论内容
        isCompleteLoad: false
      }
    },
    created () {
      this.getCommentData(this.pageIndex, true)
    },
    methods: {
      // 获取评论数据
      getCommentData (pageIndex, isReload) {
        const url = common.apihost + '/api/getcomments/' + this.commentId + '?pageindex=' + pageIndex
        console.log(url)
        // 发送请求获取数据
        this.$http.get(url).then(res => {
          const message = res.body.message
          // 判断是不是重新加载第一页评论
          if (isReload) {
            if (message.length <= 0) {
              Toast({message: '当前还没有人评论过', duration: 1000})            
            }
            this.commentList = message
          } else {
            if (message.length <= 0) {
              this.isCompleteLoad = true;
              Toast({message: '没有更多评论了', duration: 1000})
            }
            // 如果不是第一页拼接字符串加载后面的评论
            this.commentList = this.commentList.concat(message)
          }
        }, err => {
          console.log(err)
        })
      },
      // 加载更多
      loadMore () {
        // 如果评论加载完成就不获取更多
        if (this.isCompleteLoad){
          Toast({message: '没有更多评论了', duration: 1000})
          return;
        }
        this.pageIndex++
        this.getCommentData(this.pageIndex, false)
      },
      submitComment () {
        let comment = this.$refs.commentData.value
        console.log(comment)
        // 判断评论内容非空
        if (!comment || comment.trim().length == 0){
          Toast({message: '评论内容不能为空!', duration: 1000})
          return
        }
        const url = common.apihost + '/api/postcomment/'+this.commentId;
        // 发送post请求,提交评论
        this.$http.post(url, {content: comment}, {emulateJSON: true}).then(res => {
          Toast({message: "评论成功", duration: 1000});
          this.pageIndex = 1
          // 重新获取首页的评论
          this.getCommentData(this.pageIndex, true)
          // 清空输入框的内容
          this.$refs.commentData.value = ''
        }, err => {
          console.log(err)
        })
      }
    },
    // 导入父组件传递过来的值
    props: ['commentId']
  }
</script>