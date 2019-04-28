/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import baseUrl from './url'
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
// const tip = msg => {
//     this.$message({
//         message: msg,
//         type: 'error'
//      });    
// }

/*******创建axios实例********/
let instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [function(data) {
        return data;
    }],
    transformResponse: [function(data) {
        return data
    }],
    auth: {},
    responseType: 'json',
    maxContentLength: 5000,
    validateStatus: function(status) {
        return status >= 200 && status < 300; // default
    },
    // showMessage:false
})

instance.interceptors.request.use(config => {
        if (localStorage.getItem('token')) {
            config.headers.Authorization = `token ${localStorage.getItem('token')}`
                .replace(/(^\")|(\"$)/g, '')
        }
        return config
    }, err => {
        return Promise.reject(err)
    })
    // axios拦截响应
instance.interceptors.response.use(response => {
    return response
}, err => {
    return Promise.reject(err)
})

export default instance;