import { api } from "../../helper/instance";
import {
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  SHOW_TOAST,
} from "../constants/constant";

export const getUser = () => (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });

    let link = `auth/admin/users`;

    api
      .get(link)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          const data = res.data.data;

          console.log(data);
          dispatch({
            type: ALL_USER_SUCCESS,
            payload: data,
          });
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });

    // console.log("data", data);
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.message,
    });
  }
};


