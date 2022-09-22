import fetch from "auth/FetchInterceptor";

const BannerService = {};

BannerService.list = function (params) {
  return fetch({
    url: "banner",
    method: "get",
    params,
  });
};

BannerService.get = function (id, params) {
  return fetch({
    url: "banner/" + id,
    method: "get",
    params,
  });
};

BannerService.post = function (data) {
  return fetch({
    url: "banner",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

BannerService.put = function (id, data) {
  return fetch({
    url: "banner/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

BannerService.delete = function (data) {
  return fetch({
    url: "banner/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default BannerService;
