import fetch from "auth/FetchInterceptor";

const ExtraService = {};

ExtraService.list = function (params) {
  return fetch({
    url: "extra-service",
    method: "get",
    params,
  });
};

ExtraService.get = function (id, params) {
  return fetch({
    url: "extra-service/" + id,
    method: "get",
    params,
  });
};

ExtraService.post = function (data) {
  return fetch({
    url: "extra-service",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

ExtraService.put = function (id, data) {
  return fetch({
    url: "extra-service/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

ExtraService.delete = function (data) {
  return fetch({
    url: "extra-service/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default ExtraService;
