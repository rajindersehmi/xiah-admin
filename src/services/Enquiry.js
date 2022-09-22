import fetch from "auth/FetchInterceptor";

const EnquiryService = {};

EnquiryService.list = function (params) {
  return fetch({
    url: "enquiries",
    method: "get",
    params,
  });
};

EnquiryService.partnersList = function (params) {
  return fetch({
    url: "enquiries/partners",
    method: "get",
    params,
  });
};

EnquiryService.get = function (id, params) {
  return fetch({
    url: "enquiries/" + id,
    method: "get",
    params,
  });
};

EnquiryService.post = function (data) {
  return fetch({
    url: "enquiries",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

EnquiryService.put = function (id, data) {
  return fetch({
    url: "enquiries/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

EnquiryService.assignLead = function (id, data) {
  return fetch({
    url: "enquiries/assign/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

EnquiryService.putOnAuction = function (id, data) {
  return fetch({
    url: "enquiries/mark-for-bidding/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

EnquiryService.addRemark = function (id, data) {
  return fetch({
    url: "enquiries/add-remark-enquiry/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

EnquiryService.addPlan = function (id, data) {
  return fetch({
    url: "enquiries/assign/plans/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

EnquiryService.cancelEnquiry = function (id) {
  return fetch({
    url: "enquiries/cancel/" + id,
    method: "post",
  });
};

EnquiryService.delete = function (data) {
  return fetch({
    url: "enquiries/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

EnquiryService.downloadCSV = function (params) {
  return fetch({
    url: "export-enquiries",
    method: "get",
    responseType: "blob",
    params,
  });
};

export default EnquiryService;
