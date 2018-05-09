// import fetch from 'dva/fetch';

import axios from 'axios';
import qs from 'qs';
import HttpStatus from 'http-status-codes';
import NProgress from 'nprogress';
// import {
//   baseURL,
//   requestTimeOut
// }                 from './config'

// axios.defaults.baseURL = "http://127.0.0.1:7001";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

// 添加一个请求拦截器，用于设置请求过渡状态
axios.interceptors.request.use((config) => {
  // 请求开始，蓝色过渡滚动条开始出现
  NProgress.start();
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 添加一个返回拦截器
axios.interceptors.response.use((response) => {
  // 请求结束，蓝色过渡滚动条消失
  NProgress.done();
  return response;
}, (error) => {
  // 请求结束，蓝色过渡滚动条消失
  // 即使出现异常，也要调用关闭方法，否则一直处于加载状态很奇怪
  NProgress.done();
  return Promise.reject(error);
});

const fetch = (options) => {
  let {
    method,
    data,
    url,
  } = options

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${data ? `?${qs.stringify(data)}` : ''}`)
    case 'delete':
      return axios.delete(url, { data })
    case 'head':
      return axios.head(url, data)
    case 'post':
      return axios.post(url, data)
    case 'put':
      return axios.put(url, data)
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    console.log('options: ', options, 'response: ', response);
    if (response.status === HttpStatus.OK) {
      return response.data
    }
    throw { response } // eslint-disable-line
  }).catch((error) => {
    const { response } = error;
    console.log('request error: ', error);
    let message, status
    if (response) {
      status = response.status
      const { data, statusText } = response
      message = data.message || statusText || HttpStatus.getStatusText(status)
    } else {
      status = 600
      message = 'Network Error'
    }
    throw { status, message } // eslint-disable-line
  })
}

export const setToken = function (authToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`
}

// function parseJSON(response) {
//   return response.json();
// }

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

// /**
//  * Requests a URL, returning a promise.
//  *
//  * @param  {string} url       The URL we want to request
//  * @param  {object} [options] The options we want to pass to "fetch"
//  * @return {object}           An object containing either "data" or "err"
//  */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// }
