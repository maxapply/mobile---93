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
            :src="userprofile.photo"
          ></van-image>
        </van-cell>
        <van-cell title="名称" is-link :value="userprofile.name"></van-cell>
        <van-cell title="性别" is-link :value="userprofile.gender===0?'男':'女'"></van-cell>
        <van-cell title="生日" is-link :value="userprofile.birthday"></van-cell>
      </van-cell-group>
  </div>
</template>

<script>
// 用户资料api
import { apiUserProfile } from '@/api/user.js'
export default {
  name: 'user-profile',
  data () {
    return {
      // 用户资料的对象成员
      /**
          ├─ id integer 必须  用户id
          ├─ name string 必须  用户名
          ├─ photo string 必须  头像
          ├─ mobile string 必须  手机号
          ├─ gender integer 必须  性别，0-男，1-女
          ├─ birthday string 必须  生日，格式 '2018-12-20'
       */
      userprofile: {}
    }
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    // 获得资料
    async getUserProfile () {
      // data直接接收数据
      this.userprofile = await apiUserProfile()
    }
  }
}
</script>

<style scoped lang='less'></style>
