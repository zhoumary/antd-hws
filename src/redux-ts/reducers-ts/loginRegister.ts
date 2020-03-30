import { SET_USERINFO, UserInfo, UserInfoActionType } from "../actionTypes";

const initialState:UserInfo = {
    userID: 0,
    userName: "",
    password: ""
};

export default function(state = initialState, action : UserInfoActionType) : UserInfo {
  switch (action.type) {
    case SET_USERINFO: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}

export const getRoles = initialState;