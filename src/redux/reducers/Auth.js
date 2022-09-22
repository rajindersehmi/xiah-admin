import {
  AUTHENTICATED,
  AUTH_TOKEN,
  FETCHUSER,
  HIDE_AUTH_MESSAGE,
  SETPHONE,
  SHOW_AUTH_MESSAGE,
  SHOW_LOADING,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
} from "../constants/Auth";

const initState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  phone: null,
  token: localStorage.getItem(AUTH_TOKEN),
  user: null,
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: "/",
        token: action.token,
      };
    case FETCHUSER:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case SETPHONE:
      return {
        ...state,
        loading: false,
        redirect: "/auth/verify-otp",
        phone: action.phone,
      };
    case SHOW_AUTH_MESSAGE:
      return {
        ...state,
        message: action.message,
        showMessage: true,
        loading: false,
      };
    case HIDE_AUTH_MESSAGE:
      return {
        ...state,
        message: "",
        showMessage: false,
      };
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        redirect: "/",
        loading: false,
        user: null,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.token,
      };
    }
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default auth;
