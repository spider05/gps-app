import axios from 'axios'
import TokenCache from './TokenCache'
// import defaultSettings from '@/config/defaultSettings'
// import ProcessHelper from '@/utils/helper/ProcessHelper'
import { EF_URL } from './config'

const rootUrl = () => {
  // if (ProcessHelper.isProduction() || ProcessHelper.isPreview()) {
  //     return defaultSettings.publishRootUrl
  // } else {
  //     return defaultSettings.localRootUrl
  // }
  return EF_URL
}

export const Axios = axios.create({
  baseURL: rootUrl(),
  timeout: 5000// defaultSettings.apiTimeout
})

// 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
  // 设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
  // if (config.method === 'post') {
  //     // JSON 转换为 FormData
  //     const formData = new FormData()
  //     Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
  //     config.data = formData
  // }

  // 携带token
  if (TokenCache.getToken()) {
    config.headers.Authorization = 'Bearer ' + TokenCache.getToken()
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {
  // console.log('interceptors:',res)
  // 授权失败
  if (!res.data.success) {
    // TokenCache.deleteToken()
    // location.href = '/'
    // return Promise.reject(res)
  }
  // return res.data
  return res
}, error => {
  let errorMsg = ''
  if (error.message.includes('timeout')) {
    errorMsg = '请求超时!'
  } else {
    errorMsg = '请求异常00!'
  }
  console.log('0000', errorMsg)
  return Promise.resolve({ success: false, msg: errorMsg })
})

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
    Object.defineProperty(Vue.prototype, '$rootUrl', { value: rootUrl() })
  }
}
