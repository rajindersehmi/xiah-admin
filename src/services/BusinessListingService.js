import fetch from "auth/FetchInterceptor";

const BusinessListingService = {};

BusinessListingService.list = function (params) {
  return fetch({
    url: "bussiness-listing",
    method: "get",
    params,
  });
};

BusinessListingService.listClaims = function (params) {
  return fetch({
    url: "bussiness-listing/claim",
    method: "get",
    params,
  });
};

BusinessListingService.get = function (id, params) {
  return fetch({
    url: "bussiness-listing/" + id,
    method: "get",
    params,
  });
};

BusinessListingService.getClaiming = function (id, params) {
  return fetch({
    url: "bussiness-listing/claim/" + id,
    method: "get",
    params,
  });
};

BusinessListingService.post = function (data) {
  return fetch({
    url: "bussiness-listing",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

BusinessListingService.put = function (id, data) {
  return fetch({
    url: "bussiness-listing/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

BusinessListingService.updateClaim = function (id, data) {
  return fetch({
    url: "bussiness-listing/update-claim/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

BusinessListingService.delete = function (data) {
  return fetch({
    url: "bussiness-listing/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

BusinessListingService.downloadCSV = function (params) {
  return fetch({
    url: "export-plans",
    method: "get",
    responseType: "blob",
    params,
  });
};

export default BusinessListingService;
