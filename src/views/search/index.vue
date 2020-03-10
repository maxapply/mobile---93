<template>
  <div class="container">
    <!-- 自己的导航栏
    left-arrow：左侧有箭头
    @click-left：单击左侧箭头的事件处理
    $router.back() 执行路由的后退操作
    -->
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()"/>
    <!-- 搜索输入框
      .trim: 是vue框架修饰符，要去除内容左右空白
    -->
    <van-search v-model.trim="searchText" placeholder="请输入搜索关键词"/>
    <van-cell-group>
      <van-cell :title="item" icon="search" v-for="(item,k) in suggestionList" :key="k"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 获得联想建议数据api
import { apiSearchSuggestion } from '@/api/search.js'
export default {
  name: 'search-index',
  watch: {
    // searchText进行监听
    searchText: async function (newV) {
      // 用户没有输入信息不要联想
      if (!newV) {
        // 去除旧的联想数据
        this.suggestionList = []
        return false
      }

      // 正常联想
      const result = await apiSearchSuggestion(newV)
      // console.log(result)
      // data接收
      this.suggestionList = result.options
    }
  },
  data () {
    return {
      suggestionList: [], // 联想建议数据列表
      searchText: '' // 用户输入的搜索关键字
    }
  }
}
</script>

<style scoped lang='less'></style>
