import axios from "axios";
import { API_BASE_URL } from "configs/AppConfig";
import history from "../history";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { notification } from "antd";

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// Config
const ENTRY_ROUTE = "/auth/admin/login";
const TOKEN_PAYLOAD_KEY = "authorization";
const PUBLIC_REQUEST_KEY = "public-request";

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem(AUTH_TOKEN);

    if (jwtToken) {
      config.headers[TOKEN_PAYLOAD_KEY] = "bearer" + jwtToken;
    }

    if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
      // history.push(ENTRY_ROUTE);
      // window.location.reload();
    }

    for (let k in config.params) {
      if (config.params[k] === "") {
        delete config.params[k];
      }
    }

    return config;
  },
  (error) => {
    // Do something with request error here
    notification.error({
      message: "Error",
    });
    Promise.reject(error);
  }
);

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let notificationParam = {
      message: "",
    };

    // Remove token and redirect
    if (error?.response?.status === 403) {
      notificationParam.message = "Authentication Fail";
      notificationParam.description = "Please login again";
      localStorage.removeItem(AUTH_TOKEN);
      history.push(ENTRY_ROUTE);
      window.location.reload();
    }

    if (error?.response?.status === 400) {
      notificationParam.message = "Bad Request";
      notificationParam.description = error?.response?.data.message;
    }

    if (error?.response?.status === 401) {
      notificationParam.message = "Unauthorised";
      notificationParam.description = "You are not allowed to do this action";
      localStorage.removeItem(AUTH_TOKEN);

      if (window.location.pathname != ENTRY_ROUTE) {
        history.push(ENTRY_ROUTE);
        window.location.reload();
      }
    }

    if (error?.response?.data?.errors) {
      const list = Object.values(error.response.data.errors);
      list.forEach((error) => {
        notification.error({
          message: "Bad request",
          description: error[0],
        });
      });
    }

    if (error?.response?.status === 401) {
      notificationParam.message = "Not Authorised";
    }

    if (error?.response?.status === 404) {
      notificationParam.message = "Not Found";
    }

    if (error?.response?.status === 500) {
      notificationParam.message = "Internal Server Error";
      notificationParam.description = error?.response?.data?.message;
    }

    if (error?.response?.status === 422) {
      notificationParam.message = "Bad Request";
      notificationParam.description = error?.response?.data?.message;
    }

    if (error?.response?.status === 508) {
      notificationParam.message = "Time Out";
    }

    notification.error(notificationParam);

    return Promise.reject(error);
  }
);

export default service;
