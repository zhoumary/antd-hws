/**
 * request 网络请求工具: axios
 */
import axios from "axios";
import {host} from '../utils/ApiURL';


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
        if (respError !== undefined) {
            returnData.errorMessage = respError.message;
        }
  
        return Promise.reject(returnData.errorMessage);
    }
  
    return client(options)
              .then(onSuccess)
              .catch(onError);
}


/**
 * Request Interceptor
 */
const requestInterceptor = () => {
    // Add a request interceptor
    client.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}

/**
 * Request Interceptor
 */
const responseInterceptor = () => {
    // Add a response interceptor
    client.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
}


export {request, requestInterceptor, responseInterceptor}


