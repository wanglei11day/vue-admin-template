
import axios from '@/api/axios'

// 分页查询

export const getList = (params) => {
    return axios({
      url: '/sys/sys_user/list',
      method: 'get',
      params
    })
  }