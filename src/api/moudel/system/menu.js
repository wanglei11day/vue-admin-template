/* 查找导航菜单树 */
import axios from '@/api/axios'



export const findTree = (params) => {
    return axios({
      url: '/sys/sys_resource/tree',
      method: 'get',
      params
    })
  }