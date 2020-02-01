/*
 * @Auto: 王磊
 * @Date: 2019-04-08
 * @Description: 权限验证模块
 * @LastEditors: wl
 * @LastEditTime: 2019-07-14 09:20:12
 */

import store from '@/store'

/**
 * @method
 * @param {string} perms 检查的字符串
 * @return {boolean} 返回结果
 * @desc 判断用户是否拥有操作权限
 * 根据传入的权限标识，查看是否存在用户权限标识集合
 */
export function hasPermission (perms) {
  let hasPermission = false
  let permissions = store.state.user.perms
  
  for (let i = 0, len = permissions.length; i < len; i++) {
    if (permissions[i] === perms) {
      hasPermission = true
      break
    }
  }
  return hasPermission
}

/**
 * @method
 * @param {string} pageName 页面name
 * @return {object} 页面按钮权限
 * @desc
 */
export function pagePermission(pageName) {
  return {}
}
