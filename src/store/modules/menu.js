/*
 * @Auto: 蔡佳志
 * @Date: 2019-05-31 15:21:15
 * @Description: 系统导航菜单模块
 * @LastEditors: 蔡佳志
 * @LastEditTime: 2019-07-14 11:15:59
 */

export default {
    state: {
      // 导航菜单树
      navTree: []
    },
    getters: {},
    mutations: {
      // 设置导航菜单树
      setNavTree (state, navTree) {
        state.navTree = navTree
      }
    },
    actions: {}
  }
  