import fetch from "auth/FetchInterceptor";

const FaqService = {};

FaqService.list = function (params) {
  return fetch({
    url: "faq",
    method: "get",
    params,
  });
};

FaqService.get = function (id, params) {
  return fetch({
    url: "faq/" + id,
    method: "get",
    params,
  });
};

FaqService.post = function (data) {
  return fetch({
    url: "faq",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

FaqService.put = function (id, data) {
  return fetch({
    url: "faq/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

FaqService.delete = function (data) {
  return fetch({
    url: "faq/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default FaqService;
