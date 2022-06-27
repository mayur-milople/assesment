import axios from "axios";
import { Cookies } from "react-cookie";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});
const cookies = new Cookies();
api.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
    };
    if (cookies.get("access_token")) {
      config.headers["Authorization"] = `${cookies.get("access_token")}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    if (response?.status === 401) {
      window.location.replace("/");
    }
    return Promise.resolve(response);
  },
  async function (err) {
    const originalRequest = err.config;
    console.log(`🚀 - err?.response?.status`, err.response?.data);
    if (err?.response?.status === 400 || err?.response?.status === 500) {
      return Promise.reject(err.response?.data);
    } else if (
      (err?.response?.status === 401 || err?.response?.status === 400) &&
      originalRequest.url.includes("/account/token/refresh/")
    ) {
      console.log("response in interceptor line number 48");
      cookies.remove("access_token");
      return;
    } else if (err?.response?.status === 401 && !originalRequest._retry) {
      console.log("response in interceptor line number 53");
    } else {
      console.log("response in interceptor line number 82");
      return err;
    }
  }
);
export { api };
