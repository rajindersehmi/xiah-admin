import fetch from "auth/FetchInterceptor";

const InfographicsService = {};

InfographicsService.list = function (params) {
  return fetch({
    url: "infographic",
    method: "get",
    params,
  });
};

InfographicsService.get = function (id, params) {
  return fetch({
    url: "infographic/" + id,
    method: "get",
    params,
  });
};

InfographicsService.post = function (data) {
  return fetch({
    url: "infographic",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

InfographicsService.put = function (id, data) {
  return fetch({
    url: "infographic/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

InfographicsService.delete = function (data) {
  return fetch({
    url: "infographic/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default InfographicsService;
