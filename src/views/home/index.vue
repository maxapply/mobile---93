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
      <van-tab title="推荐">
        <!-- div的作用是给瀑布流区域设置“垂直滚动条”，使得可以进行上拉操作 -->
        <div class="scroll-wrapper">
          <!-- 瀑布流加载效果实现
            瀑布流执行：
            1. 页面加载完毕，其会自动执行
              (内部会判断当前瀑布区域没有数据，当然要执行获取数据)
            2. 鼠标上拉动作，当滚动条到达"算法底部"，会执行
               算法底部：瀑布流认为要加载更多数据的位置
            v-model="loading"   表明是否是加载状态，默认为false
                                // 加载的时候，自动设置为true
                                // 加载完毕，请修改为false
                                // 是加载动画的体现
            :finished  表明瀑布停止了，没有更多数据不给加载了
                      鼠标上拉已经没有反应了
                      如果没有数据了，请设置finished为true
                      就表示都加载好了，显示没有更多了

            finished-text="没有更多了"  瀑布流停止，底部文字提示
            @load="onLoad"  是事件，是做加载数据的时候执行的
          -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!-- van-cell单元格组件
              特点：独占一行
              用法非常灵活、复杂
              title：单元格标题内容
            -->
            <van-cell v-for="item in list" :key="item" :title="item"/>
          </van-list>
        </div>

      </van-tab>
      <van-tab title="数据库">数据库内容展示</van-tab>
      <van-tab title="后端">后端内容展示</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home-index',
  data () {
    return {
      // 瀑布流相关成员
      list: [], // 数据源
      loading: false, // 瀑布流是否加载处于动画效果
      finished: false, // 瀑布流是否停止
      // 设置频道默认激活项目
      activeChannelIndex: 0
    }
  },
  methods: {
    // 瀑布流上拉执行的动作
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          // 已经没有更多了，瀑布停止了
          this.finished = true
        }
      }, 1000)
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
    // 给上拉列表区域设置样式
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
  // 给频道下边沿横向设置样式
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
