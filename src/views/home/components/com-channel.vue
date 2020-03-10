<template>
  <div>
    <!-- 弹出层 -->
    <!-- 暂时体现弹出层效果
          v-model="show"  控制弹出层是否显示true/false，
                          单击遮罩层，弹出层关闭，这show自动为false
          position="bottom"  弹出层从底部出来
          :style="{ height: '40%' }" 弹出层高度
          closeable  有关闭按钮
          close-icon-position="top-left"  按钮在左上角显示
          round 有圆角
    -->
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      position="bottom"
      :style="{ height: '95%' }"
      closeable
      close-icon-position="top-left"
      round
      @closed="isEdit=false"
    >
      <div class="channel">
        <div class="channel-head">
          <div>
            <span class="title">我的频道</span>
            <span class="desc">点击进入频道</span>
          </div>
          <div>
            <van-button type="danger" plain size="mini" round @click="isEdit=!isEdit">
              {{isEdit?'完成':'编辑'}}
            </van-button>
          </div>
        </div>
        <!--van-grid 没有设置column-num属性，默认是4列-->
        <van-grid class="channel-content" :gutter="10" clickable>
          <van-grid-item v-for="(item,k) in channelList" :key="item.id">
            <span class="text"
              :style="{color:k===activeChannelIndex?'red':''}">
              {{item.name}}
            </span>
            <!-- 删除的叉号图标标志
              class="close-icon" 设置样式的
              v-show="k>0" 使得 推荐 项目不显示叉号按钮
              isEdit: 表示进入编辑状态，才显示该图标
            -->
            <van-icon v-show="k>0 && isEdit" class="close-icon" name="close" />
          </van-grid-item>
        </van-grid>
      </div>

      <div class="channel">
        <div class="channel-head">
          <div>
            <span class="title">频道推荐</span>
            <span class="desc">点击添加频道</span>
          </div>
        </div>
        <van-grid class="channel-content" :gutter="10" clickable>
          <!-- @click声明事件，使得推荐频道 被单击可以添加给 我的频道
              同时传递item参数，{id:xx,name:xx} 是对象
          -->
          <van-grid-item v-for="item in restChannel" :key="item.id"
            @click="restToUser(item)">
            <div class="info">
              <span class="text">{{item.name}}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入获得频道的api函数:全部频道、添加频道
import { apiChannelAll, apiChannelAdd } from '@/api/channel.js'
export default {
  name: 'com-channel',
  // 计算属性有缓存，相关data不变化，"结果"会缓存，提升系统性能
  computed: {
    // 获得剩余频道( 全部频道-我的频道 )
    restChannel () {
      // 1. 把 我的频道  的 各个id获得出来，集成一个数组返回 [10,15,23,44……]
      //    map是映射方法，遍历数组，并以"数组"形式返回修饰后的每个单元信息信息
      //    参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide
      const userChannelIDs = this.channelList.map(item => {
        return item.id
      })

      // 2. 对 全部频道 做过滤，把“不符合” 我的频道 的项目收集并返回出来，就是【剩余频道】
      //    数组.filter()  过滤方法，把符合条件的数组元素通过“新数组”给与返回
      //    (全部频道 去除 我的频道 给与返回)
      const rest = this.channelAll.filter(item => {
        // 我的频道  里边不包含当前项目，就给与收集
        // 判断我的频道id集合 是否包含当前项目，不包含的才收集
        // 数组.includes(元素)  判断数组中是否有出现某个元素，返回Boolean
        return !userChannelIDs.includes(item.id)
      })
      return rest
    }
  },
  data () {
    return {
      isEdit: false, // 是否是编辑状态 true/false
      channelAll: [] // 全部频道数据
    }
  },
  created () {
    // 获得全部频道
    this.getChannelAll()
  },
  methods: {
    // 添加频道(剩余频道---->我的频道)
    // @param channel:被添加的频道 {id:xx,name:xx} 对象
    restToUser (channel) {
      // 1. 对“我的频道channelList”成员属性进行添加，使得发生响应式，页面可以看到
      //    channelList是"我的频道"，是父组件给传递过来的，我们要直接对其进行操作
      //    当前组件通过props接收的，其本身还是一个"对象[{},{},{}..]"
      //    父子组件传递对象是"引用方式"：
      //               父、子组件是同一个对象的不同名称引用而已
      //               子组件修改了该对象，父组件也会感知到
      //    结论：添加好的频道 在 home/index.vue 的标签页上页会立即显示
      //    (父、子组件应用的数据，都是内存，页面刷新后，新添加的就没有了)
      this.channelList.push(channel)
      // 2. localStorage持久添加，完成此步骤后，新添加的数据就不会丢失了（即使刷新页面）
      apiChannelAdd(channel)
    },
    // 获得"全部"频道数据
    async getChannelAll () {
      const result = await apiChannelAll()
      this.channelAll = result.channels
    }
  },
  props: {
    // 接收v-model的数据信息
    value: {
      type: Boolean,
      default: false
    },
    // 接收“我的频道”数据
    channelList: {
      type: Array,
      // 注意：默认值是数组，必须使用function定义
      //       如下是箭头函数，return 一个 [] 空数组
      default: () => []
    },
    // 激活频道的下标序号
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  margin-top:70px;
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 16px;
      color:gray;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    // 删除频道叉号图标的样式
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
