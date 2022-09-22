import fetch from "auth/FetchInterceptor";

const ExtraServiceContent = {};

ExtraServiceContent.list = function (params) {
  return fetch({
    url: "extra-service-content",
    method: "get",
    params,
  });
};

ExtraServiceContent.get = function (id, params) {
  return fetch({
    url: "extra-service-content/" + id,
    method: "get",
    params,
  });
};

ExtraServiceContent.post = function (data) {
  return fetch({
    url: "extra-service-content",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

ExtraServiceContent.put = function (id, data) {
  return fetch({
    url: "extra-service-content/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

ExtraServiceContent.delete = function (data) {
  return fetch({
    url: "extra-service-content/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default ExtraServiceContent;
