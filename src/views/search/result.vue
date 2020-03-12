<template>
  <div class='container'>
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" />
  </div>
</template>

<script>
// 获得文章api
import { apiSearchList } from '@/api/search.js'
export default {
  name: 'search-result',
  data () {
    return {
      searchList: [] // 根据关键字获得的文章列表信息
    }
  },
  created () {
    // 文章列表
    this.getSearchList()
  },
  methods: {
    // 获取文章
    async getSearchList () {
      // 调用api
      const args = { q: this.$route.params.keyword }
      const result = await apiSearchList(args)
      // data接收
      this.searchList = result.results
    }
  }
}
</script>

<style scoped lang='less'></style>
