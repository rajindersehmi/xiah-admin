import fetch from "auth/FetchInterceptor";

const PartnerPlanService = {};

PartnerPlanService.list = function (params) {
  return fetch({
    url: "partner-plan",
    method: "get",
    params,
  });
};

PartnerPlanService.get = function (id, params) {
  return fetch({
    url: "partner-plan/" + id,
    method: "get",
    params,
  });
};

PartnerPlanService.post = function (data) {
  return fetch({
    url: "partner-plan",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

PartnerPlanService.put = function (id, data) {
  return fetch({
    url: "partner-plan/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

PartnerPlanService.delete = function (data) {
  return fetch({
    url: "partner-plan/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default PartnerPlanService;
