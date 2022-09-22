import {
  SENDOTP,
  AUTHENTICATED,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SHOW_LOADING,
  VERIFYOTP,
  SETPHONE,
  SIGNINWITHEMAIL,
  FETCHUSER,
} from "../constants/Auth";

export const sendOtp = (payload) => {
  return {
    type: SENDOTP,
    payload,
  };
};
export const loginWithEmail = (payload) => {
  return {
    type: SIGNINWITHEMAIL,
    payload,
  };
};

export const verifyOtp = (user) => {
  return {
    type: VERIFYOTP,
    payload: user,
  };
};

export const authenticated = (token) => {
  return {
    type: AUTHENTICATED,
    token,
  };
};

export const fetchUser = (user) => {
  return {
    type: FETCHUSER,
    user,
  };
};

export const setUserPhone = (phone) => {
  return {
    type: SETPHONE,
    phone,
  };
};

export const signOut = () => {
  return {
    type: SIGNOUT,
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    message,
  };
};

export const hideAuthMessage = () => {
  return {
    type: HIDE_AUTH_MESSAGE,
  };
};

export const showLoading = () => {
  return {
    type: SHOW_LOADING,
  };
};
