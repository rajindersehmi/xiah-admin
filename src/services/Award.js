import fetch from "auth/FetchInterceptor";

const AwardService = {};

AwardService.list = function (params) {
  return fetch({
    url: "awards",
    method: "get",
    params,
  });
};

AwardService.get = function (id, params) {
  return fetch({
    url: "awards/" + id,
    method: "get",
    params,
  });
};

AwardService.post = function (data) {
  return fetch({
    url: "awards",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

AwardService.put = function (id, data) {
  return fetch({
    url: "awards/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

AwardService.delete = function (data) {
  return fetch({
    url: "awards/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default AwardService;
