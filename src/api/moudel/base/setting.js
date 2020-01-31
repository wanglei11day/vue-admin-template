

import axios from '@/api/axios'

/* 保存设置 */
export const save = (data) => {
  return axios({
    url: '/sys/config/update',
    method: 'post',
    data: data
  })
}

/* 查询设置 */
export const findAll = (params) => {
  return axios({
    url: '/sys/config/get',
    method: 'get',
    params
  })
}

/* 通过Key查询对应Value */
export const findByKey = (params) => {
  return axios({
    url: '/sys/config/get_by_key',
    method: 'get',
    params
  })
}
