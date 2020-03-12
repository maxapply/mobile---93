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
      @search: 搜索框单击“回车按钮”的事件触发
    -->
    <van-search v-model.trim="searchText" placeholder="请输入搜索关键词"
      @search="$router.push('/search/result/'+searchText)"/>
    <van-cell-group>

        <!-- 联想关键字内容展示列表 -->
      <van-cell icon="search" v-for="(item,k) in suggestionList" :key="k"
        @click="$router.push('/search/result/'+item)"
      >
        <!-- 应为要应用methods方法，并且该方法返回的信息里边有 html标签+css样式
        所以不要直接使用title属性，相反要应用命名插槽，内部结合v-html应用 -->
        <div slot="title" v-html="highLightCell(item,searchText)"></div>
      </van-cell>

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
    searchText: function (newV) {
      // 该监听器每次进来的时候，首先清除 this.timer（就是setTimeout停止）定时器
      clearTimeout(this.timer)
      // 用户没有输入信息不要联想
      if (!newV) {
        // 去除旧的联想数据
        this.suggestionList = []
        return false
      }

      // 防抖技术要介入
      // 对setTimeout的返回结果进行接收，以便可以中断其执行
      // 会返回"整型数字"信息
      // 给当前组件临时声明一个timer的临时成员，这个成员不用事先通过data声明
      // 组件运行期间都生效，使得就是唯一的timer被使用(即使事件被多次调用)
      this.timer = setTimeout(async () => {
        // 正常联想
        const result = await apiSearchSuggestion(newV)
        // console.log(result)
        // data接收
        this.suggestionList = result.options
      }, 1000)
    }
  },
  data () {
    return {
      suggestionList: [], // 联想建议数据列表
      searchText: '' // 用户输入的搜索关键字
    }
  },
  methods: {
    // 关键字高亮设置
    // content: 要高亮设置的目标内容[vue本地项目]
    // keywords: 被匹配的关键字[Vue]
    highLightCell (content, keywords) {
      // 1. 创建正则，i修饰符，表示忽略大小写
      //    A. /  / 方式
      //    B. new RegExp()方式
      //    const reg = /\d{5}/i  或  const reg = new RegExp('\d{5}','i')
      //    由于正则主体内容是keywords变量，不方便使用//创建，相反送RegExp就比较合适
      const reg = new RegExp(keywords, 'i')

      // 2. 正则与目标内容进行匹配
      //    A. test()返回是否匹配到的Boolean值
      //    B. match()返回匹配到的结果（对象、null）
      // 因为要获得匹配到的内容，所以要使用match方法
      // 语法：目标内容.match(正则)
      const rst = content.match(reg)
      // console.log(rst) // ["vue", index: 0, input: "vue本地项目获s", groups: undefined]
      // 结论：
      // rst[0]： 就是从目标内容中匹配到关键字信息【重点】
      // rst['index']：关键字出现的下标位置
      // rst['input']：代表完整的目标内容

      // 如果目标内容没有匹配到关键字，就不要做高亮了，原样输出即可
      if (rst === null) {
        return content
      }

      // 3. 对目标内容的关键字做替换，把"普通"的关键字变为"高亮"的关键字
      // 字符串.replace(目标关键字，替换内容)
      // content.replace('vue'，'<span style="color:red;">vue</span>')
      // content.replace(正则，'<span style="color:red;">rst[0]</span>')
      return content.replace(reg, `<span style="color:red;">${rst[0]}</span>`)
    }
  }
}
</script>

<style scoped lang='less'></style>
