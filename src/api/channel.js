// 导入axios对象
import request from '@/utils/request.js'

// 导入store(Vuex)，可以判断用户是否登录系统 store.state.user.token?'登录':'未登录'
import store from '@/store/index.js'

// 频道相关api函数配置文件

// 本地持久化存储频道设置的key(游客 和 登录用户 分别设置)
const CHANNEL_KEY_TRAVEL = 'hm-channel-travel' // 游客key
const CHANNEL_KET_VIP = 'hm-channel-vip' // 登录用户Key
/**
 * 获取用户的频道列表数据
 * 一般数据获取请求方式都是get
 * 当前函数不要传递参数(从【接口文档】可知)
 *
 * 应用端明确要求如下函数返回"Promise对象"结果
 * 给函数前边设置async，那么这个函数return返回结果以"Promise对象"形式体现
 */
export async function apiChannelList () {
  // 1. 从缓存localStorage里边获得频道(注意区分用户是否有登录系统)

  // 根据用户是否登录系统获得对应的localStorage操作的key
  const key = store.state.user.token ? CHANNEL_KET_VIP : CHANNEL_KEY_TRAVEL
  // 读取缓存的频道数据:null  实体字符串
  // 频道数据在localStorage中存储的样子：[{id:xx,name:xx},{id:xx,name:xx},{id:xx,name:xx},……]
  // 是“数组对象集”，但是类型是字符串
  const cacheChannels = localStorage.getItem(key)

  // 2. 判断是否有缓存频道数据
  if (cacheChannels) {
    // 有数据，直接返回应用
    return { channels: JSON.parse(cacheChannels) }
  } else {
    // 没有数据，就走axios获得数据应用
    // 注意：request前边需要设置await，保证同步执行，后续代码可以正常获得rst结果
    const rst = await request({
      url: '/app/v1_0/user/channels',
      method: 'get'
    })
    // 把获得好的数据存储给localStorage，以便下次使用
    localStorage.setItem(key, JSON.stringify(rst.channels))
    // 数据对外输出应用即可
    return rst
  }
  // 应用组件使用的频道数据：
  // {channels:[{id:xx,name:xx},{id:xx,name:xx},{id:xx,name:xx},……]}
}

/**
 * 获得全部频道
 */
export function apiChannelAll () {
  return request({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}
