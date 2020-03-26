import {request} from '../utils/request';

export const getUser = (username:string, password:string, id:number) => {
    return request({
        url:    '/api/v1/users/' + id,
        method: 'GET',
        auth: {
            username: username,
            password: password
        }
    });
}