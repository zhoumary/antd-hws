import {request} from '../utils/request';
import {rolesURL} from '../utils/ApiURL';

export const getRoles = () => {
    return request({
        url:    rolesURL,
        method: 'GET'
    });
}