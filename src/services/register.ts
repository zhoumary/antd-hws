import {request} from '../utils/request';
import {registerURL} from '../utils/ApiURL';

export const register = (registerData:any) => {
    return request({
        url:    registerURL,
        method: 'POST',
        data: registerData,
        headers: {
            "content-type": "application/json"
        }
    });
}