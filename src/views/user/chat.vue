<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>

    <!-- 聊天区域 -->
    <div class="chat-list">
      <!-- 小智同学 -->
      <div class="chat-item left">
        <van-image fit="cover" round :src="XzImg"/>
        <div class="chat-pao">干啥呢，河蟹</div>
      </div>
      <!-- 用户 -->
      <div class="chat-item right">
        <div class="chat-pao">没看正忙，挖沙呢</div>
        <van-image fit="cover" round :src="userinfo.photo"/>
      </div>
    </div>

    <!--发表聊天内容的表单构件-->
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="content" placeholder="说点什么...">
        <van-button size="mini" :loading="isloading" @click="send()" slot="button">提交</van-button>
      </van-field>
    </div>

  </div>
</template>

<script>
// 导入socket.io-client
import io from 'socket.io-client'

// 用户基本信息api
import { apiUserInfo } from '@/api/user.js'
// 导入小智头像
import XzImg from '@/assets/img/xz.png'

export default {
  name: 'user-chat',
  data () {
    return {
      // msg 和 timestamp 是服务器端要求的名字，发送和接收的数据都遵守
      // name是自定义成员，请注意维护
      // [
      //  {msg:'用户消息',timestamp:时间,name:'vip'},
      //  {msg:'机器人消息',timestamp:时间,name:'xz'},
      //  {msg:'用户消息',timestamp:时间,name:'vip'},
      //  {msg:'机器人消息',timestamp:时间,name:'xz'},
      // ]
      talks: [], // 全部的聊天内容(用户和机器人的)
      socket: null, // socket.io连接对象，本身不在模板中使用，可以通过null做初始化

      userinfo: {}, // 用户基本信息，使用{}声明空对象，不要使用null，因为其要在模板中应用
      XzImg, // 对象简易成员赋值接收 变量， XzImg:XzImg
      content: '', // 发表的聊天内容
      isloading: false // 提交聊天加载动画
    }
  },
  created () {
    this.getUserInfo()
    // socket.io连接初始化配置，页面加载完毕，连接就配置完成
    this.setSocket()
  },
  methods: {
    // 用户 对 小智 说话
    send () {
      // 没有数据，不给发送
      if (!this.content) { return false }
      console.log(123)
      // 把聊天内容先存储给talks
      const args = {
        msg: this.content,
        timestamp: Date.now(),
        name: 'vip'
      }
      this.talks.push(args)

      // 把聊天内容发送给服务器端,利用socket
      // this.socket.emit('服务器端事件名称',传递的数据)
      // 注意：args是一个拥有3个成员的对象，可不是单纯的聊天内容
      this.socket.emit('message', args)
    },

    // 建立socket连接
    setSocket () {
      // 客户端 向 服务器端 发请求，建立连接
      this.socket = io('http://ttapi.research.itcast.cn') // socket.io连接

      // 服务器端连接成功，向 客户端 发请求告知
      // 创建事件，感知连接状态,connect是固定标志
      this.socket.on('connect', () => {
        console.log('连接成功')

        // 连接成功让"小智同学"主动发起对话，即给talks里边添加一个记录
        this.talks.push({
          msg: 'outman,最近干啥呢？',
          timestamp: Date.now(),
          name: 'xz'
        })
      })

      // 服务器端 向 客户端 发送回复聊天信息
      // message 是 服务器端 已经声明好的名字，是固定的，代表事件名称
      this.socket.on('message', (back) => {
        // 回来的消息格式为：{msg:机器人回复内容,timestamp:回复时间}
        // console.log(content)
        // 把content存储到talks成员里边
        // this.talks.push({ msg:机器人回复内容,timestamp:回复时间, name: 'xz' })
        this.talks.push({ ...back, name: 'xz' })
      })
    },
    // 获取用户信息
    async getUserInfo () {
      this.userinfo = await apiUserInfo()
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
