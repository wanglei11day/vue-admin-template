
/*
 * @Auto: wl
 * @Date: 2019-04-08
 * @Description: http请求配置模块
 * @LastEditors: wl
 * @LastEditTime: 2019-06-08
 */
export default {
  method: 'post',
  baseUrl: 'http://171.221.175.80:8152',
  // 设置请求头
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 300000,
  // 设置重新请求次数
  retry: 4,
  // 设置重新请求的间隙
  retryDelay: 1000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'

}
