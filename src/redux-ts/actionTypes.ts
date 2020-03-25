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


