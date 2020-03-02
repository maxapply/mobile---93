// css后处理器的配置文件
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // rootValue是根值，是px向rem转换的砝码
      // rem = px/rootValue  除法计算
      // 200px/37.5 = 5.3333rem
      // vant设计稿的大小是375px宽度的，rootValue就是设计稿的1/10，就是37.5
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
