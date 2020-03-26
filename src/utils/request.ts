/**
 * request 网络请求工具: axios
 */
import axios from "axios";
import { Cookies } from "react-cookie";
import { notification } from 'antd';
import {host} from '../utils/ApiURL';

const codeMessage: {
    [index: number]: { message: string }
  } = {
    200: {message: '服务器成功返回请求的数据。'},
    201: {message: '新建或修改数据成功。'},
    202: {message: '一个请求已经进入后台排队（异步任务）。'},
    204: {message: '删除数据成功。'},
    400: {message: '发出的请求有错误，服务器没有进行新建或修改数据的操作。'},
    401: {message: '用户没有权限（令牌、用户名、密码错误）。'},
    403: {message: '用户得到授权，但是访问是被禁止的。'},
    404: {message: '发出的请求针对的是不存在的记录，服务器没有进行操作。'},
    406: {message: '请求的格式不可得。'},
    410: {message: '请求的资源被永久删除，且不会再得到的。'},
    422: {message: '当创建一个对象时，发生一个验证错误。'},
    500: {message: '服务器发生错误，请检查服务器。'},
    502: {message: '网关错误。'},
    503: {message: '服务不可用，服务器暂时过载或维护。'},
    504: {message: '网关超时。'},
};


/**
 * error handler
 */
const errorHandler = (error:any) => {        
    let errorMsg:{
        message: string;
        isError: boolean;
    } = {
        message: "",
        isError: false
    };

    const errorResp = error.response;
    if (errorResp) {
      const errorRespData = errorResp.data;
      if (errorRespData) {
        if (errorRespData.message) {
            errorMsg.message = errorRespData.message;
            errorMsg.isError = true;
        } else {
            errorMsg.message = errorRespData;
            errorMsg.isError = true;
        }
        return errorMsg;
      }          
    } else {
        errorMsg.message = error.message;
        errorMsg.isError = true;
        return errorMsg;
    }    
};


/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
    baseURL: host
});


/**
 * Request Wrapper with default success/error actions
 */
const request = function(options:any) {
    let respError:{
        message: string;
        isError: boolean;
    } | undefined = {
        message: "",
        isError: false
    }

    let returnData:{
        responseData:object;
        errorMessage:string;
    } = {
        responseData:{},
        errorMessage:""
    }
    
    const onSuccess = function(response:any) {      
        const rdata = response.data;
        console.debug(rdata);

        return Promise.resolve(rdata);
    }
  
    const onError = function(error:any) {
        console.error('Request Failed:', error);
  
        respError = errorHandler(error);
        if (respError != undefined) {
            returnData.errorMessage = respError.message;
        }
  
        return Promise.reject(returnData.errorMessage);
    }
  
    return client(options)
              .then(onSuccess)
              .catch(onError);
}

export {request}


