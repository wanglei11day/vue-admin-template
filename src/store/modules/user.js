
/*
 * @Auto: 王磊
 * @Date: 2019-04-08 09:00:03
 * @Description: 用户页面存储模块
 * @LastEditors: 王磊
 * @LastEditTime: 2019-07-14 11:16:26
 */
export default {
  state: {
    // 用户权限标识集合
    perms: [],
    // 用户消息个数
    messageCount: 0
  },
  getters: {

  },
  mutations: {
    // 用户权限标识集合
    setPerms (state, perms) {
      state.perms = perms
    },
    // 用户消息个数
    setMessageCount (state, count) {
      state.messageCount = count
    }
  },
  actions: {}
}
