<template>
  <div class="temp">
    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList">
					<a href="#">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{ item.title }}
							<p class="mui-ellipsis">
                发表时间 {{ item.add_time | dateFormat('YY-MM-DD') }}
                <span>点击 {{ item.click }}</span>
              </p>
						</div>
					</a>
				</li>
			</ul>
  </div>
</template>

<style lang="css" scoped>
  
  .mui-table-view-cell img {
    width: 50px;
    height: 40px;
  }
  
  .mui-ellipsis {
    color: #0094ff;
    font-size: 12px;
    margin-top: 4px;
  }

  .mui-ellipsis span {
    float: right;
  }
</style>

<script>
  import common from '../../common/common.js'

  export default {
    data () {
      return {
        newsList: []
      }
    },
    created () {
      this.getNewsListData()
    },
    methods: {
      // 获取新闻列表数据
      getNewsListData () {
        // 获取新闻列表的地址
        const url = common.apihost + '/api/getnewslist'
        // 发送请求
        this.$http.get(url).then(res => {
          this.newsList = res.body.message
        }, err => {
          console.log('加载新闻列表数据失败')
        })
      }
    }
  }
</script>