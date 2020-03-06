// 导入axios对象
import request from '@/utils/request.js'

// 频道相关api函数配置文件

/**
 * 获取用户的频道列表数据
 * 一般数据获取请求方式都是get
 * 当前函数不要传递参数(从【接口文档】可知)
 */
export function apiChannelList () {
  // return：返回axios执行的结果
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}
