import fetch from "auth/FetchInterceptor";

const BrandService = {};

BrandService.list = function (params) {
  return fetch({
    url: "brands",
    method: "get",
    params,
  });
};

BrandService.get = function (id, params) {
  return fetch({
    url: "brands/" + id,
    method: "get",
    params,
  });
};

BrandService.post = function (data) {
  return fetch({
    url: "brands",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

BrandService.put = function (id, data) {
  return fetch({
    url: "brands/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

BrandService.delete = function (data) {
  return fetch({
    url: "brands/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

BrandService.downloadCSV = function (params) {
  return fetch({
    url: "export-brands",
    method: "get",
    responseType: "blob",
    params,
  });
};

export default BrandService;
