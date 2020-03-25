import { SET_USERPERMISSIONS, UserPermissions, UserPermissionActionType } from "../actionTypes";

const initialState:UserPermissions = {
    permissions: []
};

export default function(state = initialState, action : UserPermissionActionType) : UserPermissions {
    switch (action.type) {
      case SET_USERPERMISSIONS: {
        return {
          ...state,
          ...action.payload
        };
      }

      default:
        return state;
    }
  }