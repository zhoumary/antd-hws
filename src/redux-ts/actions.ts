import { UserInfo, SET_USERINFO, UserPermissions, SET_USERPERMISSIONS } from "./actionTypes";

export const setUserInfo = (userInfo:UserInfo) => ({
    type: SET_USERINFO,
    payload: userInfo
});

export const setUserPermissions = (userPermissions:UserPermissions) => ({
    type: SET_USERPERMISSIONS,
    payload: userPermissions
});
