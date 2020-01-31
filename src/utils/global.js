/*
 * @Auto: 蔡佳志
 * @Date: 2019-06-03
 * @Description: 全局常量封装模块
 * @LastEditors: wd
 * @LastEditTime: 2019-11-28 15:57:39
 */

// 接口地址
export let baseUrl = ''
// 文件上传地址
export let fileUploadUrl = ''
export let videoUploadUrl = ''
// ck富文本编辑器处理地址
export let ckfinderUrl = ''
// 远程服务器地址
// http://47.111.99.27:8086

if (process.env.NODE_ENV === 'development') {
  // baseUrl = 'http://47.111.99.27:8086'
 // baseUrl = 'http://192.168.0.182:8080' // hxx
  // baseUrl = 'http://192.168.0.178:8086' // gl
  // baseUrl = 'http://192.168.0.115:8087' // jlf
  // baseUrl = '/api' // 反向代理
   baseUrl = 'http://171.221.175.80:8152' // 发布
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = ''
} else if (process.env.NODE_ENV === 'testing') {
  baseUrl = ''
}
fileUploadUrl = baseUrl + '/sys/file/upload'
videoUploadUrl = baseUrl + '/video/convert/upload'
ckfinderUrl = baseUrl + '/sys/file/upload'

export const responseCode = {
  // 请求成功
  OK: 1000,
  // 请求未授权
  NO_AUTH: 1001,
  // 服务器处理异常
  HANDLE_EXCEPTION: 1002,
  // 找不到请求所需数据
  NOT_FOUND: 1003,
  // 登录信息错误
  INCORRECT_LOGIN_INFO: 1004,
  // 未登录
  NOT_LOGIN: 1005,
  // 请求错误
  FAILED: 1006,
  // 请求参数不合法
  ILLEGAL_PARAM: 1007,
  // 唯一参数已存在
  UNIQUE_PARAM_EXISTS: 1008
}

// 题目类型值
export const hiddenType = {
  // 1、隐含 2、非隐含
  // 隐含
  HIDDEN: 1,
  // 非隐含
  SHOW: 2
}

// 题目类型选项
export const hiddenOptions = [{
  id: hiddenType.HIDDEN,
  name: 'hidden',
  title: '隐含'
}, {
  id: hiddenType.SHOW,
  name: 'show',
  title: '非隐含'
}]

// 题目类型值
export const questionType = {
  // 单选
  SINGLE: 1,
  // 判断
  JUDGE: 3,
  // 多选
  MULTIPLE: 2,
  // 问答
  ESSAY: 5,
  // 计算
  COMPUTER: 4
}

// 题目类型选项
export const questionOptions = [{
  id: questionType.SINGLE,
  name: 'single',
  title: '单选'
}, {
  id: questionType.JUDGE,
  name: 'judge',
  title: '判断'
}, {
  id: questionType.MULTIPLE,
  name: 'multiple',
  title: '多选'
}, {
  id: questionType.COMPUTER,
  name: 'computer',
  title: '计算'
}, {
  id: questionType.ESSAY,
  name: 'essay',
  title: '问答'
}]

// 难度值
export const difficulty = {
  // 简单
  SIMPLENESS: 1,
  // 一般
  ORDINARY: 2,
  // 较难
  HARDER: 3,
  // 困难
  DIFFICULTY: 4,
  // 极难
  HARDEST: 5
}

// 难度选项
export const difficultyOptions = [{
  id: difficulty.SIMPLENESS,
  name: 'simpleness',
  title: '简单'
}, {
  id: difficulty.ORDINARY,
  name: 'ordinary',
  title: '一般'
}, {
  id: difficulty.HARDER,
  name: 'harder',
  title: '较难'
}, {
  id: difficulty.DIFFICULTY,
  name: 'difficulty',
  title: '困难'
}, {
  id: difficulty.HARDEST,
  name: 'hardest',
  title: '极难'
}]

// 实训考核发布状态代码
export const practicalStatusCode = {
  // 草稿
  DRAFT: 1,
  // 已发布
  UNDERWAY: 2,
  // 已进行
  ISSUE: 3,
  // 已结束
  COMPLATE: 4
}

// 实训考核发布状态选项
export const practicalStatusOptions = [{
  id: practicalStatusCode.DRAFT,
  name: 'draft',
  title: '草稿'
}, {
  id: practicalStatusCode.UNDERWAY,
  name: 'underway',
  title: '已发布'
}, {
  id: practicalStatusCode.ISSUE,
  name: 'issue',
  title: '已进行'
}, {
  id: practicalStatusCode.COMPLATE,
  name: 'complate',
  title: '已结束'
}]

export default {
  baseUrl,
  fileUploadUrl,
  videoUploadUrl,
  responseCode,
  hiddenType,
  hiddenOptions,
  questionType,
  questionOptions,
  difficulty,
  difficultyOptions
}
