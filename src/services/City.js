import fetch from "auth/FetchInterceptor";

const CityService = {};

CityService.list = function (params) {
  return fetch({
    url: "cities",
    method: "get",
    params,
  });
};

CityService.get = function (id, params) {
  return fetch({
    url: "cities/" + id,
    method: "get",
    params,
  });
};

CityService.post = function (data) {
  return fetch({
    url: "cities",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

CityService.put = function (id, data) {
  return fetch({
    url: "cities/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

CityService.delete = function (data) {
  return fetch({
    url: "cities/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default CityService;
