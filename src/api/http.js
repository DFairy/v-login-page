/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import baseUrl from './url';
import router from '../router'
import store from '../store/index'
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
// const tip = msg => {
//         this.$message({
//             message: msg,
//             type: 'error'
//         });
//     }
/*******创建axios实例********/
let instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
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

// request拦截器
instance.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers['authorization'] = `token ${localStorage.getItem('token')}`
                // 让每个请求携带自定义token
        }
        return config
    },
    error => {
        // 出错
        console.log(error)
        Promise.reject(error)
    }
)

// 拦截响应，遇到token不合法则报错
instance.interceptors.response.use(
    response => {
        console.log(response.data, '1111')
        if (response.data.code == 401) {
            // this.$message.error(response.data.message);
            router.push('/login')
            store.dispatch('UserLogout')
        }
        return response;
    },
    error => {
        console.log(error)
        const errRes = error.response;
        return Promise.reject(errRes); // 返回接口返回的错误信息
    }
);


export default instance;