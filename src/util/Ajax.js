/****************************************************************
 * created by Celsius on 2020-08-11 for application entry file
 ****************************************************************/

/** 引入axios 对象 */
import axios from "axios";

/**
 * 定义一个Ajax
 * @param {AxiosRequestConfig} requst 需要传递的参数
 */
const Ajax = async request => {

    let param = {
        baseURL: '/apis',
        url: request.url,
        params: request.params || {},
        data: request.data || {},
        method: request.method ? request.method : 'GET',
        headers: {'Content-Type': 'application/json;charset=Utf-8'},
        timeout: 15000
    };

    /** 判断是否有上传进度回调参数，有需要加上 */
    if (request.onUploadProgress) {
        param.onUploadProgress = request.onUploadProgress;
    }

    let result = await axios(param).catch(e => {
        console.log(e);
        return {code: 900, message: 'local error'};
    });
    if (result) return result.data;
}

/** 导出Ajax 方法 */
export default Ajax;