/**
 * request 网络请求工具: axios
 */
import axios from "axios";
import { Cookies } from "react-cookie";
import { notification } from 'antd';

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
export const errorHandler = (error:any) => {
    const errorResp = error.response;
        
    let errorMsg:string;
    if (errorResp) {
      const errorRespData = errorResp.data;
      if (errorRespData) {
        if (errorRespData.message) {
          errorMsg = errorRespData.message
        } else {
            errorMsg = errorRespData;
        }
        return errorMsg;
      }          
    } else {
        errorMsg = error.message;
        return errorMsg;
    }    
};


/**
 * 配置request请求时的默认参数
 */
/**
 *  接口请求数据时执行的方法
 *  接受参数为请求的路径apiUrl、请求接口配置参数configObj
 */

export const request = (method:string, url:string, headers:object, data:object) => {
    switch (method) {
        case "POST":
            // POST
            axios({
                url: url,
                method: method,
                headers: headers,
                data: data
            })
                .then(response => {
                    return response
                })
                .catch((error) => {
                    return errorHandler(error);
                })           
    
        default:
            return notification.info({
                message: 'Not a network request',
                description:
                    'This is not a network request!',
            });
    }
    


    
}




