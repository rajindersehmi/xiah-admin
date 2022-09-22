import fetch from "auth/FetchInterceptor";

const LandingPageService = {};

LandingPageService.list = function (params) {
  return fetch({
    url: "landingpage",
    method: "get",
    params,
  });
};

LandingPageService.get = function (id, params) {
  return fetch({
    url: "landingpage/" + id,
    method: "get",
    params,
  });
};

LandingPageService.post = function (data) {
  return fetch({
    url: "landingpage",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

LandingPageService.put = function (id, data) {
  return fetch({
    url: "landingpage/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

LandingPageService.delete = function (data) {
  return fetch({
    url: "landingpage/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default LandingPageService;
