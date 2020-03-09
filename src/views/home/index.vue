<template>
  <div class="container">
    <!--
      van-tabs:标签页组件
        v-model设置默认激活项目 ，激活根据是项目的下标，从0开始
      van-tab: 标签页项目组件
        title：标签名称
        内容区域：标签对应内容
    -->
    <van-tabs v-model="activeChannelIndex">
      <!-- 给标签页的左侧或右侧通过命名插槽设置内容 -->
      <div slot="nav-right" class="channel-more" @click="showPopup=true">
        <!-- 三杠图标 -->
        <van-icon name="wap-nav"/>
      </div>
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <!-- 使用 ，把激活频道id当参数，传递给子组件-->
        <com-article :channelID="item.id"></com-article>
      </van-tab>
    </van-tabs>

    <!--
      应用频道子组件弹出层
      把“我的频道”数据传递给子组件
      传递"激活频道"的下标信息
    -->
    <com-channel
      v-model="showPopup"
      :channelList="channelList"
      :activeChannelIndex="activeChannelIndex"
    ></com-channel>
  </div>
</template>

<script>
// 导入com-channel.vue
import ComChannel from './components/com-channel.vue'

// 导入获得频道的api函数:我的频道、全部频道
import { apiChannelList, apiChannelAll } from '@/api/channel.js'

// 导入文章瀑布组件
import ComArticle from './components/com-article.vue'
export default {
  name: 'home-index',
  components: {
    // 注册
    ComArticle,
    ComChannel
  },
  // 计算属性有缓存，相关data不变化，"结果"会缓存，提升系统性能
  computed: {
    // 获得剩余频道( 全部频道-我的频道 )
    restChannel () {
      // 1. 把 我的频道  的 各个id获得出来，集成一个数组返回 [10,15,23,44……]
      //    map是映射方法，遍历数组，并以"数组"形式返回修饰后的每个单元信息信息
      //    参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide
      const userChannelIDs = this.channelList.map(item => {
        return item.id
      })
      return userChannelIDs
      // 2. 对 全部频道 做过滤，把“不符合” 我的频道 的项目收集并返回出来，就是【剩余频道】
    }
  },
  data () {
    return {
      channelAll: [], // 全部频道数据
      showPopup: false, // 控制子组件弹出层是否显示
      // 频道列表数据
      channelList: [],
      // 设置频道默认激活项目
      activeChannelIndex: 0
    }
  },
  created () {
    // 自动、第一时间 获取频道数据
    this.getChannelList()
    // 获得全部频道
    this.getChannelAll()
  },
  methods: {
    // 获得"全部"频道数据
    async getChannelAll () {
      const result = await apiChannelAll()
      this.channelAll = result.channels
    },
    // 获得频道列表数据
    async getChannelList () {
      // 通过api获得数据
      const result = await apiChannelList()
      // console.log(result)
      // data成员接收频道数据
      this.channelList = result.channels
    }
  }
}
</script>

<style scoped lang='less'>
.van-tabs {
  // 弹性布局
  display: flex;
  // 灵活的项目将垂直显示，正如一个列一样
  flex-direction: column;
  height: 100%;
  // 标签页全部内容展示区域
  /deep/ .van-tabs__content {
    // flex:1;的值是1 1 0%，【父控件有剩余空间占1份放大，父控件空间不足按1缩小，自身的空间大小是0%】
    flex: 1;
    overflow: hidden;
  }
  // 标签页具体内容展示区域
  /deep/ .van-tab__pane {
    height: 100%;
  }
  // 给频道下边沿横向设置样式
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }

  /*给 更多 频道设置样式*/
  .channel-more {
    position: fixed;
    right: 0;
    background-color: white;
    line-height: 88px;
    height: 88px;
    width: 90px;
    text-align: center;
    font-size: 40px;
  }
  /*频道标签页宽度减小一些*/
  /deep/ .van-tabs__wrap {
    width: 90%; /*设置频道列表最大宽度，可以避免最后一个频道被按钮覆盖住*/
  }
}
</style>
