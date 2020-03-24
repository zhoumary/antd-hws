import { SET_USERID } from "../actionTypes";

const initialState = {
  currUserID: Number
};

export default function(state = initialState, action) {
    switch (action.type) {
      case SET_USERID: {
        const { userID } = action.payload;
        return {
          ...state,
          currUserID: userID
        };
      }

      default:
        return state;
    }
  }