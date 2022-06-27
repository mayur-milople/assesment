import {
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
} from "../constants/constant";

export const userReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
      return {
        loading: true,
        users: [],
      };
    case ALL_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case ALL_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
