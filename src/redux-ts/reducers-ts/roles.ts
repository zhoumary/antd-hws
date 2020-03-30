import { FETCH_ROLES, FETCH_ROLES_ERROR, RolesActionType, RolesAPI } from "../actionTypes";

const initialState:(RolesAPI) = {
    roles: [],
    error: ""
};

export default function(state = initialState, action:RolesActionType) : RolesAPI {
    switch (action.type) {
      case FETCH_ROLES: {
        return ({
          ...state,
          roles: action.payload
        });
      }

      case FETCH_ROLES_ERROR: {
        return ({
          ...state,
          error: action.payload
        });
      }

      default:
        return state;
    }
  }