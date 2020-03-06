<template>
  <!-- div的作用是给瀑布流区域设置“垂直滚动条”，使得可以进行上拉操作 -->
  <div class="scroll-wrapper">
    <!-- 下拉包围上拉 -->
    <!--
      v-model："isLoading" 设置下拉加载状态的
              // true：正在加载，自动修改为真，当发生"下拉"动作就变为true
              // false默认值，加载结束需要手动修改为false
      @refresh="onRefresh" 事件，当发生"下拉"动作是，该事件自动执行
                          // 该事件可以实现数据获取操作
    -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
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
              模板中应用超大整型数据，需要通过toString转换为"字符串"
        -->
        <!-- <van-cell v-for="item in list" :key="item" :title="item"/> -->
        <van-cell
          v-for="item in articleList"
          :key="item.art_id.toString()"
          :title="item.title"/>

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 获得文章列表的api
import { apiArticleList } from '@/api/article.js'

export default {
  name: 'com-article',
  // 接收父组件传递过来的频道id信息
  // 1. 简易方式接收
  // props: ['channelID'],
  // 2. 高级方式接收
  props: {
    channelID: {
      // type:类型限制String Number Array, 类型不符合，就接收不到
      // required:true, 参数必须传递
      type: Number,
      required: true
    }
  },
  data () {
    return {
      articleList: [], // 文章列表信息
      // 通过ts声明时间戳条件，这样后期可以灵活发生变化
      ts: Date.now(), // 文章列表分页"时间戳"条件
      // 下拉成员
      isLoading: false, // 是否处于加载状态
      // 瀑布流相关成员
      list: [], // 数据源
      loading: false, // 瀑布流是否加载处于动画效果
      finished: false // 瀑布流是否停止
    }
  },
  created () {
    // 获得真实文章列表数据
    this.getArticleList()
  },
  methods: {
    // 获得文章列表信息
    // async修饰的函数，这个函数如果有return返回信息，
    // 信息类型是Promise对象

    async getArticleList () {
      // 调用api获得数据（参数:频道id、时间戳）
      const obj = {
        channel_id: this.channelID,
        timestamp: this.ts
      }
      const result = await apiArticleList(obj)
      // console.log(result)
      // data接收数据
      // 升级：不要把数据给与data成员，要在瀑布里边发生给与动作
      //       在这里边请return返回，用瀑布接收使用
      return result
      // this.articleList = result.results
    },
    // 下拉执行的动作
    onRefresh () {
      // 设置1s延迟
      setTimeout(() => {
        this.onLoad() // 调用上拉获得数据
        this.isLoading = false // 下拉加载完成/结束加载动画
        this.$toast.success('刷新成功') // 成功提示
      }, 1000)
    },

    // 瀑布流上拉执行的动作
    async onLoad () {
      // 每次执行给延迟0.8秒
      await this.$sleep(800)

      // 瀑布 与 真实文章 结合
      // 1. 获得真实文章数据
      const articles = await this.getArticleList()
      // articles:{results:文章列表，pre_timestamp:分页时间戳}
      // console.log(articles)
      // 2. 对数据做处理
      if (articles.results.length > 0) {
        // 有获得数据
        // data接收数据，要设置"追加"，不要直接赋值
        // 直接赋值会使得瀑布的数据区域填充不满，会造成瀑布不断加载效果
        // this.articleList = articles.results
        // articles.results:[{id,title,xx},{id,title,xx},{id,title,}……]
        this.articleList.push(...articles.results)
        // ... 展开运算符，是要把[]数组标志给去除，使得内部各个小元素暴露出来，进而被push追加使用
        // this.articleList.push({id,title,xx},{id,title,xx},{id,title,}……)
        // 更新时间戳，方便获取"下一页"数据
        this.ts = articles.pre_timestamp
      } else {
        // 没有获得到数据，要停止瀑布流
        this.finished = true
      }

      // 3. 停止瀑布加载动画
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
// 给上拉列表区域设置样式
.scroll-wrapper {
  height: 100%;
  // 瀑布流区域如果垂直方向内容过多，要呈现滚动条
  // 是瀑布实现的关键要素
  overflow-y: auto;
}
</style>
