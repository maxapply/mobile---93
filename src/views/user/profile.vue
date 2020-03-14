<template>
  <div class="page-user-profile">
    <van-nav-bar
                 left-arrow
                 @click-left="$router.back()"
                 title="编辑资料"
                 right-text="保存"></van-nav-bar>
      <!-- 绘制 头像、名称、性别、生日 的单元格 -->
      <van-cell-group>
        <!--
          center：使得单元格内容垂直方向居中显示
        -->
        <van-cell title="头像" is-link center>
          <!--
            单元格可以通过命名插槽对各个位置进行填充
            具体要表现头像 slot="default" 定义value右侧单元格内容
          -->
          <!--
            round 使得图片变为圆形
            fit="cover" 对图片做适应 保持宽高缩放图片，使图片的“短边”能完全显示出来，裁剪“长边”
          -->
          <van-image
            slot="default"
            width="50"
            height="50"
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          ></van-image>
        </van-cell>
        <van-cell title="名称" is-link value="蜡笔大新"></van-cell>
        <van-cell title="性别" is-link value="女"></van-cell>
        <van-cell title="生日" is-link value="2018-03-09"></van-cell>
      </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'user-profile'
}
</script>

<style scoped lang='less'></style>
