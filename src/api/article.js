// axios导入
import request from '@/utils/request.js'

// 文章相关api函数制作

/**
 * 根据频道获得文章列表信息
 * channel_id 是 频道ID
 * timestamp 是 时间戳整数 单位毫秒 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 *            用于数据【分页】(瀑布、下拉动作都是在获取“下一页”数据)
 *            timestamp=当前时间戳   获得第1页数据  数据返回来后有一个名称为 pre_timestamp的字段
 *            timestamp=上次数据的pre_timestamp  获得第2页数据  数据返回来后有一个名称为 pre_timestamp的字段
 *            timestamp=上次数据的pre_timestamp  获得第3页数据  数据返回来后有一个名称为 pre_timestamp的字段
 *            timestamp=上次数据的pre_timestamp  获得第4页数据  数据返回来后有一个名称为 pre_timestamp的字段
 *            ……
 *            如此反复，就可以不断获得"下一页"数据的效果了
 * with_top 是 0或1 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
 * eslint：空格要求是英文输入法的
 *         变量名称是"驼峰"风格，不建议使用下划线的
 */
export function apiArticleList ({ channel_id, timestamp }) {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params: {
      channel_id,
      timestamp,
      with_top: 1
    }
  })
}