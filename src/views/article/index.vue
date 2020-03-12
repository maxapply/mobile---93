<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="文章详情"></van-nav-bar>
    <!-- 标题、作者头像、作者名称、文章发表时间、关注、文章详情、是否喜欢、点赞 -->
    <div class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo"/>
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | formatTime}}</p>
        </div>
        <van-button round size="small" type="info">{{article.is_followed?'取消关注':'+ 关注'}}</van-button>
      </div>
      <div class="content">
        <p v-html="article.content"></p>
      </div>
      <div class="zan">
        <!--
          class="active" 代表激活红色的样式
              通过attitude属性值决定当前按钮是否有红框
          plain： 表示按钮没有背景色，就是白底，但是有边框
          icon="like-o" 给按钮设置图标
        -->
        <van-button
          round
          size="small"
          :class="{active:article.attitude===1}"
          plain
          icon="like-o"
          style="margin-right:8px;"
        >点赞</van-button>
        <van-button
          round
          size="small"
          :class="{active:article.attitude===0}"
          plain
          icon="delete"
        >不喜欢</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// 文章详情api
import { apiArticleDetail } from '@/api/article.js'
export default {
  // 每个组件name声明的名字【不要】与html标签重名，
  // 例如div、span、table，article、header、footer
  name: 'article-index',
  data () {
    return {
      // 只是声明一个普通的空对象，是临时的，这个对象在模板中不输出，就可以用null
      // 模板展示的是要用{}的
      // data成员不要使用null
      article: {} // vue声明空对象，最好使用{},不要用null，与响应式有点冲突
    }
  },
  created () {
    this.getArticleDetail()
  },
  methods: {
    // 获得文章详情
    async getArticleDetail () {
      const result = await apiArticleDetail(this.$route.params.aid)
      this.article = result
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  padding: 0 20px 88px;
  margin-top: 92px;
  .title {
    font-size: 36px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 20px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 20px 0;
    display: flex;
    position: sticky;
    background-color: #fff;
    top: 92px;
    z-index: 2;
    .text {
      flex: 1;
      padding-left: 20px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 40px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    p {
      font-size: 28px;
    }
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>
