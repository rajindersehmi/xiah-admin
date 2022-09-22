import fetch from "auth/FetchInterceptor";

const PageService = {};

PageService.list = function (params) {
  return fetch({
    url: "pages",
    method: "get",
    params,
  });
};

PageService.get = function (id, params) {
  return fetch({
    url: "pages/" + id,
    method: "get",
    params,
  });
};

PageService.post = function (data) {
  return fetch({
    url: "pages",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

PageService.put = function (id, data) {
  return fetch({
    url: "pages/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

PageService.delete = function (data) {
  return fetch({
    url: "pages/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default PageService;
