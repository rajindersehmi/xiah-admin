import fetch from "auth/FetchInterceptor";

const PlanService = {};

PlanService.list = function (params) {
  return fetch({
    url: "plans",
    method: "get",
    params,
  });
};

PlanService.get = function (id, params) {
  return fetch({
    url: "plans/" + id,
    method: "get",
    params,
  });
};

PlanService.post = function (data) {
  return fetch({
    url: "plans",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

PlanService.put = function (id, data) {
  return fetch({
    url: "plans/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

PlanService.delete = function (data) {
  return fetch({
    url: "plans/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

PlanService.downloadCSV = function (params) {
  return fetch({
    url: "export-plans",
    method: "get",
    responseType: "blob",
    params,
  });
};

export default PlanService;
