/**
 * article模块接口列表
 */

import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const list = {
    // 列表展示    
    listDetail() {
        return axios.post(`/list`);
    },
    // 添加分类   
    addTitle(params) {
        return axios.post(`/list/addTitle`, qs.stringify(params));
    },
    // 删除分类    
    delItem(params) {
        return axios.post(`/list/del`, qs.stringify(params));
    },
    // 添加网址
    addWeb(params) {
        return axios.post(`/list/addWeb`, qs.stringify(params));
    },
    //删除网址
    delWeb(params) {
        return axios.post(`/list/delWeb`, qs.stringify(params));
    }
}

export default list;