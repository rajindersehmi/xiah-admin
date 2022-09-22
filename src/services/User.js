import fetch from "auth/FetchInterceptor";

const UserService = {};

UserService.list = function (params) {
  return fetch({
    url: "users",
    method: "get",
    params,
  });
};

UserService.get = function (id, params) {
  return fetch({
    url: "users/" + id,
    method: "get",
    params,
  });
};

UserService.loggedIn = function (params) {
  return fetch({
    url: "user/",
    method: "get",
    params,
  });
};

UserService.post = function (data) {
  return fetch({
    url: "users",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

UserService.create = function (data) {
  return fetch({
    url: "users-create",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

UserService.put = function (id, data) {
  return fetch({
    url: "users/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

UserService.disable = function (id, data) {
  return fetch({
    url: "users-disable/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

UserService.verifyPartner = function (id, data) {
  return fetch({
    url: "partner/verify/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

UserService.partnerDetails = function (id, params) {
  return fetch({
    url: "partner/" + id,
    method: "get",
    params,
  });
};

UserService.downloadCSV = function (params) {
  return fetch({
    url: "export-users",
    method: "get",
    responseType: "blob",
    params,
  });
};

export default UserService;
