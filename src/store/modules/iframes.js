/*
 * @Auto: 蔡佳志
 * @Date: 2019-05-31 15:21:15
 * @Description: 外部网址嵌套状态模块
 * @LastEditors: 蔡佳志
 * @LastEditTime: 2019-07-14 11:16:08
 */

export default {
    state: {
      // 当前嵌套页面路由路径
      iframeUrl: [],
      // 所有嵌套页面路由路径访问URL
      iframeUrls: []
    },
    getters: {},
    mutations: {
      // 设置iframeUrl
      setIFrameUrl (state, iframeUrl) {
        state.iframeUrl = iframeUrl
      },
      // iframeUrls
      addIFrameUrl (state, iframeUrl) {
        state.iframeUrls.push(iframeUrl)
      }
    },
    actions: {}
  }
  