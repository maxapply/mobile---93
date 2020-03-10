// 导入axios
import request from '@/utils/request.js'

// 搜索相关的api函数制作
/**
 * 根据用户输入信息，获得联想关键字
 * @param {用户输入的关键字} q
 */
export function apiSearchSuggestion (q) {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: {
      q
    }
  })
}
