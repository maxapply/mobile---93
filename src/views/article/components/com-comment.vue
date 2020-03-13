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
          <van-button
            icon="like-o"
            size="mini"
            plain
            :type="item.is_liking?'danger':'default'"
          >&nbsp;{{item.like_count}}</van-button>
        </div>
        <!-- 评论内容和时间
          slot="label" 是cell单元格命名插槽，下方描述信息
        -->
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate | formatTime}}</span>
            ·
            <span @click="showReply=true">{{item.reply_count}}&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>

    <!-- 回复列表展示-弹出层/瀑布 -->
    <van-popup v-model="showReply" position="bottom" :style="{ height: '80%' }" round>
      <!-- 瀑布加载效果 -->
      <van-list
        v-model="reply.loading"
        :finished="reply.finished"
        finished-text="没有更多了"
        @load="onLoadReply"
      >
        <van-cell v-for="item in reply.list" :key="item" :title="item">
          <!-- 作者头像 -->
          <div slot="icon">
            <img class="avatar" src="http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU" alt>
          </div>
          <!-- 作者名称 -->
          <div slot="title">
            <span>度娘</span>
          </div>
          <!-- 回复内容和时间 -->
          <div slot="label">
            <p>好厉害呀</p>
            <p>
              <span>2019-12-30 15:15:15</span>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-popup>

  </div>
</template>

<script>
// 评论列表api
import { apiCommentList } from '@/api/comment.js'
export default {
  name: 'com-comment',
  data () {
    return {
      // 回复相关--------------------------------------
      showReply: false, // 回复弹出层是否展示
      // 回复瀑布相关成员，通过reply成员包围，使得与外部的评论瀑布成员没有冲突
      reply: {
        list: [],
        loading: false, // 瀑布动画
        finished: false // 瀑布停止标志
      },

      // 评论列表相关--------------------------------
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
    // 回复瀑布加载
    onLoadReply () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.reply.list.push(this.reply.list.length + 1)
        }

        // 加载状态结束
        this.reply.loading = false

        // 数据全部加载完成
        if (this.reply.list.length >= 40) {
          this.reply.finished = true
        }
      }, 1000)
    },

    // 评论瀑布
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
.comment {
  margin-top: 15px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  /deep/ .van-cell__title {
    .van-cell__label {
      width: 400px;
    }
  }
}
</style>
