import fetch from "auth/FetchInterceptor";

const RedirectionService = {};

RedirectionService.list = function (params) {
  return fetch({
    url: "redirection",
    method: "get",
    params,
  });
};

RedirectionService.get = function (id, params) {
  return fetch({
    url: "redirection/" + id,
    method: "get",
    params,
  });
};

RedirectionService.post = function (data) {
  return fetch({
    url: "redirection",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

RedirectionService.put = function (id, data) {
  return fetch({
    url: "redirection/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

RedirectionService.delete = function (data) {
  return fetch({
    url: "redirection/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default RedirectionService;
