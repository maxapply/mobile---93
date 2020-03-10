<template>
  <div class="container">
    <!-- 自己的导航栏
    left-arrow：左侧有箭头
    @click-left：单击左侧箭头的事件处理
    $router.back() 执行路由的后退操作
    -->
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()"/>
    <!-- 搜索输入框 -->
    <van-search v-model="searchText" placeholder="请输入搜索关键词"/>
    <van-cell-group>
      <van-cell title="联想关键字" icon="search"></van-cell>
      <van-cell title="联想关键字" icon="search"></van-cell>
      <van-cell title="联想关键字" icon="search"></van-cell>
      <van-cell title="联想关键字" icon="search"></van-cell>
      <van-cell title="联想关键字" icon="search"></van-cell>
      <van-cell title="联想关键字" icon="search"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'search-index',
  data () {
    return {
      searchText: '' // 用户输入的搜索关键字
    }
  }
}
</script>

<style scoped lang='less'></style>
