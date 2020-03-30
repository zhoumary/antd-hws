// get user name/password/id
export const SET_USERINFO = "SET_USERINFO";
export interface UserInfo {
    userID: number;
    userName: string;
    password: string;
}
interface UpdateUserInfoAction {
    type: typeof SET_USERINFO
    payload: UserInfo
}
export type UserInfoActionType = UpdateUserInfoAction;


// get user permissions
export const SET_USERPERMISSIONS = "SET_USERPERMISSIONS";
export interface UserPermissions {
    permissions: string[];
}
interface UpdateUserPermissionAction {
    type: typeof SET_USERPERMISSIONS
    payload: UserPermissions
}
export type UserPermissionActionType = UpdateUserPermissionAction;


// get user information from "/api/v1/users/${id}"
export const FETCH_ROLES = 'FETCH_ROLES';
export interface RolesAPI {
    roles: {name:string; id:number; description:string;}[];  
    error: string;  
}
interface UpdatRolesAction {
    type: typeof FETCH_ROLES
    payload: RolesAPI["roles"]
}

export const FETCH_ROLES_ERROR = "FETCH_ROLES_ERROR";
interface UpdatRolesErrorAction {
    type: typeof FETCH_ROLES_ERROR
    payload: RolesAPI["error"]
}

export type RolesActionType = UpdatRolesAction|UpdatRolesErrorAction;

















