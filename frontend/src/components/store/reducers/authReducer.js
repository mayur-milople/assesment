import { IS_AUTHENTICATED, SHOW_TOAST } from "../constants/constant";

const initialState = {
  isAuthenticated: false,
  ToastMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SHOW_TOAST:
      return {
        ...state,
        ToastMsg: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
