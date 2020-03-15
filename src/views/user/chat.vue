<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>

    <!-- 聊天区域 -->
    <div class="chat-list">
      <!-- 小智同学 -->
      <div class="chat-item left">
        <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg"/>
        <div class="chat-pao">干啥呢，河蟹</div>
      </div>
      <!-- 用户 -->
      <div class="chat-item right">
        <div class="chat-pao">没看正忙，挖沙呢</div>
        <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg"/>
      </div>
    </div>

    <!--发表聊天内容的表单构件-->
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="content" placeholder="说点什么...">
        <van-button size="mini" :loading="isloading" slot="button">提交</van-button>
      </van-field>
    </div>

  </div>
</template>

<script>
export default {
  name: 'user-chat',
  data () {
    return {
      content: '', // 发表的聊天内容
      isloading: false // 提交聊天加载动画
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 92px 0 100px 0;
  // 聊天区域
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    // 单条聊天项目
    .chat-item{
      padding: 20px;
      // 头像
      .van-image{
        vertical-align: top;
        width: 80px;
        height: 80px;
      }
      // 聊天内容
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 80px;
        max-width: 140%;
        min-height: 80px;
        line-height: 76px;
        border: 1px solid #c2d9ea;
        border-radius: 8px;
        position: relative;
        padding: 0 20px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 28px;
        color: #333;
        // 箭头标志
        // & 并且连接的意思
        // ::before 伪类选择器
        &::before{
          content: "";
          width: 20px;
          height: 20px;
          position: absolute;
          top: 24px;
          border-top:1px solid #c2d9ea;
          border-right:1px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
// 右侧聊天项目
.chat-item.right{
  text-align: right;
  // 聊天内容
  .chat-pao{
    margin-left: 0;
    margin-right: 30px;
    // 箭头标志
    &::before{
      right: -12px;
      // 倾斜45度
      transform: rotate(45deg);
    }
  }
}
// 左侧聊天项目
.chat-item.left{
  text-align: left;
  // 聊天内容
  .chat-pao{
    margin-left: 30px;
    margin-right: 0;
    // 箭头标志
    &::before{
      left: -10px;
      // 倾斜-135度
      transform: rotate(-135deg);
    }
  }
}
// 留言表单构件，固定定位
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 88px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
