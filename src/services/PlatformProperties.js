import fetch from "auth/FetchInterceptor";

const PlatformPropertyService = {};

PlatformPropertyService.list = function (params) {
  return fetch({
    url: "platform-properties",
    method: "get",
    params,
  });
};

PlatformPropertyService.get = function (id, params) {
  return fetch({
    url: "platform-properties/" + id,
    method: "get",
    params,
  });
};

PlatformPropertyService.post = function (data) {
  return fetch({
    url: "platform-properties",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

PlatformPropertyService.put = function (id, data) {
  return fetch({
    url: "platform-properties/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

export default PlatformPropertyService;
