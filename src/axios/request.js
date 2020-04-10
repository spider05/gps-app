import { Message } from 'element-ui'
import axios from 'axios'
import Qs from 'qs'
import { EF_URL } from './config'
import { Axios } from './axios-plugin'

function parseJSON(response) {
  return response.json()
}
function checkStatus(response) {
  console.log('response:', response)
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export function request(url, options) {
  if (options) {
    if (options.method == 'GET') {
      if (options.params) {
        const paramsArray = []
        // 拼接参数
        Object.keys(options.params).forEach(key => paramsArray.push(key + '=' + options.params[key]))
        if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
        } else {
          url += '&' + paramsArray.join('&')
        }
        options.params = undefined
      }
    }
    options.credentials = 'same-origin'
    // 配合Axios
    options.url = url
  } else {
    // 配合Axios
    options = {
      url
    }
  }

  // axios用到
  //  let m_URL=`${EF_URL}${url}`;
  //   return axios(m_URL, options)

  const req = Axios.request(options)
    // .then(checkStatus)//axios用到
    // .then(parseJSON)
    .then((data) => {
      // console.log("request:",data)
      // 检测到未登录，直接跳转到登录页面.
      if (data.statusCode === 401) {
        var fromUrl = data.data.replace('api/', '')
        window.location.href = fromUrl.substr(0, fromUrl.lastIndexOf('/'))
      }

      //  return Promise.resolve(data.data)
      return data.data// { data };
    })
    .catch((err) => {
      // message.error(err);
      console.log('9999', err)
      // message.warn(url+"接口异常");
      Message({
        message: url + '接口异常',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(err)
    })
  return req
}

export function postOptions(values) {
  const options = {
    method: 'POST',
    // body: JSON.stringify(values),
    data: values || '',
    transformRequest: [function(data) {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }
  return options
}
export function getOptions(values) {
  const options = {
    method: 'GET',
    params: values,
    headers: { 'Content-Type': 'application/json' }
  }
  return options
}
