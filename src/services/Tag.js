import fetch from "auth/FetchInterceptor";

const TagService = {};

TagService.list = function (params) {
  return fetch({
    url: "tag",
    method: "get",
    params,
  });
};

TagService.get = function (id, params) {
  return fetch({
    url: "tag/" + id,
    method: "get",
    params,
  });
};

TagService.post = function (data) {
  return fetch({
    url: "tag",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

TagService.put = function (id, data) {
  return fetch({
    url: "tag/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

TagService.delete = function (data) {
  return fetch({
    url: "tag/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default TagService;
