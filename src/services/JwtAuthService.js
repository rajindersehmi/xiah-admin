import fetch from "auth/FetchInterceptor";

const JwtAuthService = {};

JwtAuthService.sendOtp = function (phone) {
  return fetch({
    url: "send-otp",
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: { phone },
  })
    .then((res) => ({ res }))
    .catch((err) => ({ err }));
};
JwtAuthService.verifyOtp = function (phone, otp) {
  return fetch({
    url: "verify-otp",
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: { phone, otp },
  })
    .then((res) => ({ res }))
    .catch((err) => ({ err }));
};

JwtAuthService.login = function (email, password) {
  return fetch({
    url: "admin/login",
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: { email, password },
  })
    .then((res) => ({ res }))
    .catch((err) => ({ err }));
};

JwtAuthService.saveToken = function (data) {
  return fetch({
    url: "save-token",
    method: "post",
    data,
  })
    .then((res) => ({ res }))
    .catch((err) => ({ err }));
};

export default JwtAuthService;
