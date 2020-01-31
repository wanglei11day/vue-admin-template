import axios from 'axios'
import config from './config'
import router from '@/router'
import qs from 'qs'
// 使用vuex做全局loading时使用
import store from '@/store'
import {
  promises
} from 'fs'
import {
  resolve
} from 'url'
import {
  rejects
} from 'assert'

// 创建实例
export default function $axios(options) {
  return new Promise((resolve, rejects) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      retry: config.retry,
      retryDelay: config.retryDelay,
      withCredentials: config.withCredentials
    })
    // 拦截器
    // request interceptor
    instance.interceptors.request.use(
      config => {
        // do something before request is sent
        //const token = 'eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJ6aGFuZ3lvbmdtZWkiLCJzdWIiOiIxMDcyIiwiYXVkIjoidHJhaW5pbmctc3lzdGVtIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJuYmYiOjE1NzkzMjE4MTgsImNyZWRlbnRpYWxzIjoiMTIzNDU2IiwiaXNzIjoiZmFuZ2ZhIiwicmVtZW1iZXJNZSI6ZmFsc2UsImV4cCI6MTU3OTMzMjYxOCwiaWF0IjoxNTc5MzIxODE4LCJ1c2VybmFtZSI6InpoYW5neW9uZ21laSJ9.zG0qcNdu5o1ZvqUCVbluBVU75aZbe-4Kc7RGPiWdQ5c'
        let token = sessionStorage.getItem('token')
        // 带上token
      
        if (config.url !== '/sys/sys_user/login') {
           
          if (token) {
            config.headers.Authorization = token
          } else {
            // 重定向到登录页面
            router.push('/login')
          }
        }

        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        // paramsSerializer: params => { return qs.stringify(params, { indices: false }) }
        // qs.stringify(params: {ids: [1,2,3],type: 1}, { indices: false })
        if (config.method === 'post') {
          if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(config.data)
          } else if (config.headers['Content-Type'] === 'application/json') {
            config.data = JSON.stringify(config.data)
          }
        }
        return config
      },
      error => {
        // do something with request error
        console.log(error) // for debug
          // 1. 判断请求超时
          if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            // eslint-disable-next-line no-console
            console.log('timeout请求超时')
            // return service.request(originalRequest);// 再重复请求一次
          }
          // 2. 需要重定向到错误页面
          const errorInfo = error.response
          console.log(errorInfo)
          if (errorInfo) {
            error = errorInfo.data // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
            const errorStatus = errorInfo.status // 404 403 500 ...
            router.push({
              path: `/error/${errorStatus}`
            })
          }
        return Promise.reject(error)
      }
    )
    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        // 根据返回的code值来做不同的处理
        switch (data.code) {
          case 1005:
            sessionStorage.removeItem('user')
            router.push('/login')
            break
          default:
            break
        }
        let res
        if (response.headers && response.headers['content-disposition']) {
          const headers = response.headers
          res = {
            headers: headers,
            data: data
          }
        } else {
          res = data
        }

        return res
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
              break
          }
        }
        console.error(err)
        return Promise.reject(err)
        // // 重新发送请求
        // var config = err.config
        // if (!config || !config.retry) {
        //   return Promise.reject(err) // 返回接口返回的错误信息
        // }
        // config.__retryCount = config.__retryCount || 0
        // if (config.__retryCount >= config.retry) {
        //   return Promise.reject(err)
        // }
        // config.__retryCount += 1
        // var backoff = new Promise(function (resolve) {
        //   setTimeout(function () {
        //     resolve()
        //   }, config.retryDelay || 1)
        // })
        // return backoff.then(function () {
        //   return axios(config)
        // })
      }
    )
      // 请求处理
      instance(options).then(res => {
        resolve(res)
        return false
      }).catch(error => {
        reject(error)
      })
  })
}
