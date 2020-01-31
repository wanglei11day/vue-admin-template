/**
 * @file 嵌套页面IFrame模块
 * @author 蔡佳志
 * @createDate 2019.03
 */

import { baseUrl } from '@/utils/global'

/**
 * @method
 * @param {string} url 外部地址
 * @return {string} 处理后地址
 * @desc 嵌套页面URL地址
 */
export function getIFramePath (url) {
  let iframeUrl = ''
  if (/^iframe:.*/.test(url)) {
    iframeUrl = url.replace('iframe:', '')
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url.replace('http://', '')
    if (iframeUrl.indexOf(':') !== -1) {
      iframeUrl = iframeUrl.substring(iframeUrl.lastIndexOf(':') + 1)
    }
  }
  return iframeUrl
}

/**
 * @method
 * @param {string} url 地址
 * @return {string} 返回地址
 * @desc 嵌套页面路由路径
 */
export function getIFrameUrl (url) {
  let iframeUrl = ''
  if (/^iframe:.*/.test(url)) {
    iframeUrl = baseUrl + url.replace('iframe:', '')
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url
  }
  return iframeUrl
}
