/*
 * @Auto: 王磊
 * @Date: 2019-04-08 09:00:03
 * @Description: 网站状态模块
 * @LastEditors: 王磊
 * @LastEditTime: 2019-07-14 11:14:54
 */

export default {
  state: {
    // 导航栏收缩状态
    collapse: false,
    // 菜单和路由是否已经加载
    menuRouteLoaded: false,
    // 系统标题
    systemName: '后台管理系统',
    // 系统图标
    systemIconUrl: '',
    // 系统状态是否改变
    systemIsChange: true
  },
  getters: {
    // 侧边栏展开状态
    collapse (state) {
      return state.collapse
    },
    // 系统名称
    systemName (state) {
      return state.systemName
    },
    /* 系统图标 */
    systemIconUrl (state) {
      return state.systemIconUrl
    },
    /* 系统图标改变状态 */
    systemIsChange (state) {
      return state.systemIsChange
    }
  },
  mutations: {
    // 改变侧边栏收缩状态
    onCollapse (state) {
      state.collapse = !state.collapse
    },
    // 设置侧边栏收缩状态
    setCollapse (state, newValue) {
      state.collapse = newValue
    },
    // 改变菜单和路由的加载状态
    menuRouteLoaded (state, menuRouteLoaded) {
      state.menuRouteLoaded = menuRouteLoaded
    },
    /* 设置系统名称 */
    setSystemName (state, newName) {
      state.systemName = newName
    },
    /* 设置系统图标 */
    setSystemIconUrl (state, newUrl) {
      state.systemIconUrl = newUrl
    },
    /* 设置系统信息是否改变 */
    setSystemIsChange (state, newState) {
      state.systemIsChange = newState
    }
  },
  actions: {}
}
