<template>
  <div class="comment">
    <!--van-list：实现瀑布加载效果-->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in commentList" :key="item.com_id.toString()">
        <!-- 作者头像
          slot="icon" 是cell单元格命名插槽，自定义左侧图标
        -->
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt>
        </div>
        <!-- 作者名称
          slot="title" 是cell单元格命名插槽，左侧标题内容
        -->
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <!-- 点赞
          slot="default" 是cell单元格命名插槽，右侧内容
          danger:点赞，红色
          default:没有点赞，没有特殊颜色
        -->
        <div slot="default">
          <van-button icon="like-o" size="mini" plain
          :type="item.is_liking?'danger':'default'">&nbsp;{{item.like_count}}</van-button>
        </div>
        <!-- 评论内容和时间
          slot="label" 是cell单元格命名插槽，下方描述信息
        -->
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate | formatTime}}</span>
            ·
            <span>{{item.reply_count}}&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 评论列表api
import { apiCommentList } from '@/api/comment.js'
export default {
  name: 'com-comment',
  data () {
    return {
      // 评论列表
      commentList: [],
      // offset不需要在模板中使用，所以可以使用null
      offset: null, // 评论分页标志,数据偏移量

      // 评论瀑布相关成员
      list: [], // demo数据
      loading: false, // 瀑布动画控制
      finished: false // 瀑布停止控制
    }
  },
  methods: {
    async onLoad () {
      await this.$sleep(800)

      // 根据文章id获得评论列表
      const comments = await apiCommentList({
        articleID: this.$route.params.aid,
        offset: this.offset
      })
      // 瀑布动画消失
      this.loading = false

      // 判断是否有获得到评论列表
      // comments.results: [{},{},{},……]
      if (!comments.results.length) {
        // 没有数据瀑布停止
        this.finished = true
        return false // 停止后续代码执行
      }
      // 有数据,给追加到 commentList成员里边
      this.commentList.push(...comments.results)
      // 对分页标志offset进行赋值
      this.offset = comments.last_id
    }
  }
}
</script>

<style lang="less" scoped>
.comment{
  margin-top:15px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  /deep/ .van-cell__title{
    .van-cell__label{
      width:400px;
    }
  }
}
</style>
