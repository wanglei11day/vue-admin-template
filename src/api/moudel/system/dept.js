/* 查询机构树 */

import axios from '@/api/axios'

export const findDeptTree = (params) => {
    let url = ''
    if (params.permission) {
      url = '/sys/sys_organization/tree_by_permission'
    } else {
      url = '/sys/sys_organization/tree'
    }
    return axios({
      url: url,
      method: 'get',
      params
    })
  }
  