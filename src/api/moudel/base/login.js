
import axios from '@/api/axios'

/* 登录 */
export const login = data => {
    return axios({
      url: '/sys/sys_user/login',
      method: 'post',
      data: data
    })
  }
