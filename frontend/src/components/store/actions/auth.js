import { IS_AUTHENTICATED } from "../constants/constant";

export const setIsAuth = (flag) => {
  return (dispatch) => {
    dispatch({ type: IS_AUTHENTICATED, payload: flag });
  };
};
