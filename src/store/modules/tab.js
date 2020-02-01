/*
 * @Auto: 蔡佳志
 * @Date: 2019-05-31 15:21:15
 * @Description: 系统选项卡
 * @LastEditors: 蔡佳志
 * @LastEditTime: 2019-07-14 11:15:42
 */

export default {
    state: {
      // 主入口标签页
      mainTabs: [],
      // 当前标签页名
      mainTabsActiveName: ''
    },
    mutations: {
      /* 设置选项卡 */
      updateMainTabs (state, tabs) {
        state.mainTabs = tabs
      },
      // 设置当前激活选项卡
      updateMainTabsActiveName (state, name) {
        state.mainTabsActiveName = name
      }
    }
  }
  