import fetch from "auth/FetchInterceptor";

const CategoryService = {};

CategoryService.list = function (params) {
  return fetch({
    url: "category",
    method: "get",
    params,
  });
};

CategoryService.get = function (id, params) {
  return fetch({
    url: "category/" + id,
    method: "get",
    params,
  });
};

CategoryService.post = function (data) {
  return fetch({
    url: "category",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

CategoryService.put = function (id, data) {
  return fetch({
    url: "category/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

CategoryService.contact_forms = function () {
  return fetch({
    url: "contact-forms",
    method: "get",
  });
};

CategoryService.delete = function (data) {
  return fetch({
    url: "category/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

CategoryService.downloadCSV = function (params) {
  return fetch({
    url: "export-category",
    method: "get",
    responseType: "blob",
    params,
  });
};

export default CategoryService;
