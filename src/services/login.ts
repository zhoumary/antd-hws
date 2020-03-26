import {request} from '../utils/request';
import {loginURL, logoutURL} from '../utils/ApiURL';

const login = (bodyFormData:any) => {
    return request({
        url:    loginURL,
        method: 'POST',
        data: bodyFormData,
        headers: {
            "content-type": "multipart/form-data"
        }
    });
}

const logout = (bodyFormData:any) => {
    return request({
        url:    logoutURL,
        method: 'POST',
        data: bodyFormData,
        headers: {
            "content-type": "multipart/form-data"
        }
    });
}

const Services = {
    login, logout //, update, delete, etc. ...
}

export default Services;