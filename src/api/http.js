/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import baseUrl from './url';
import router from '../router'
import store from '../store/index'
import { Message } from 'element-ui'
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    Message({
        showClose: true,
        message: msg,
        type: 'error',
        duration: 2000
    })
}

const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

/*******创建axios实例********/
let instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    withCredentials: false,
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


const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
            // 403 token过期
            // 清除token并跳转登录页
        case 403:
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.dispatch('UserLogout')
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
            // 404请求不存在
        case 404:
            tip('请求的资源不存在');
            break;
        default:
            console.log(other);
    }
}


// request拦截器
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        token && (config.headers['authorization'] = `token ${localStorage.getItem('token')}`)
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
    // res => {
    //     // console.log(res)
    //     res.status == 200 ? Promise.resolve(res) : Promise.reject(res)
    //         // if (response.data.code == 401) {
    //         //     tip('token失效')
    //         //     router.push('/login')
    //         //     store.dispatch('UserLogout')
    //         // }
    //         // return response;
    // },
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    //请求失败
    error => {
        console.log(error)
        const { response } = error
        if (response) {
            //请求已发出，但不在2xx的范围
            errorHandle(response.status, response.data.message)
            return Promise.reject(response);
        }
    }
);


export default instance;