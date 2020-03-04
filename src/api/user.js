// 导入已经配置好的axios函数对象
// request就是经过各种初始配置的axios对象，可以直接使用
import request from '@/utils/request.js'

// 导出一个函数，可以对用户账号进行校验
export function apiUserLogin (data) {
  // 调用axios
  // axios.get()
  // axios.post()
  // axios({
  //   url:请求地址,
  //   method:'get/post',
  //   params:xx, // get方式传递参数
  //   data:xx  // post方式传递参数
  // })
  // return 调用当前函数，可以获得到请求结果
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: data
  })
}
