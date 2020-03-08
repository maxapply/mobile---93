<template>
  <div>
    <!-- 暂时表现弹出框效果
  v-model：设置弹出框是否显示 true显示、false不显示
  title：弹出框标题，可以不设置
  show-cancel-button：显示取消按钮
  :showConfirmButton="false" 不要显示取消按钮，false是boolean值
  showConfirmButton="false" false是字符串

  closeOnClickOverlay 是否在点击遮罩层后关闭弹窗,不要绑定内容，就是true被绑定
  :closeOnClickOverlay="true"
    -->
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :showConfirmButton="false" closeOnClickOverlay>
      <img src="https://img.yzcdn.cn/vant/apple-3.jpg" width="230" height="130">
    </van-dialog>
      <!-- :value+@input 是 v-model的体现
        @input="$emit('input')" $emit调用input事件，把感知到的信息
        传递给事件对应的v-model成员里边，即父组件的showDialog
        当前组件，鼠标单击对话框旁处，就可以使得value属性值为false
        这个false信息要传递给showDialog，这可以使得后续该弹出框不断被展示出来

        理论上代码应该为：$emit('input',$event.target.value)
        实际上不要设置$event.target.value，设置到不对，因为
        van-dialog是组件，不是普通表单域，$event.target.value不能表达出来当前组件的value属性信息
        @input="$emit('input',$event)" 在van-dialog内部会被"封装"为
        $emit('input',$event.target.value)

        组件标签都是：@input="$emit('input',$event)"
        普通表单域：$emit('input',$event.target.value)
      -->
  </div>
</template>

<script>
export default {
  name: 'more-action',
  props: ['value'],
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
