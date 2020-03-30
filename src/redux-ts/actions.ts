import { UserInfo, SET_USERINFO, UserPermissions, SET_USERPERMISSIONS, FETCH_ROLES, RolesAPI, FETCH_ROLES_ERROR } from "./actionTypes";

export const setUserInfo = (userInfo:UserInfo) => ({
    type: SET_USERINFO,
    payload: userInfo
});

export const setUserPermissions = (userPermissions:UserPermissions) => ({
    type: SET_USERPERMISSIONS,
    payload: userPermissions
});

export const fetchRoles = (roles:RolesAPI["roles"]) => ({
    type: FETCH_ROLES,
    payload: roles
});

export const fetchRolesError = (rolesError:RolesAPI["error"]) => ({
    type: FETCH_ROLES_ERROR,
    payload: rolesError
});
