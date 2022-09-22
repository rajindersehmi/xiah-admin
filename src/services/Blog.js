import fetch from "auth/FetchInterceptor";

const BlogService = {};

BlogService.list = function (params) {
  return fetch({
    url: "fullpage/Blog",
    method: "get",
    params,
  });
};

BlogService.get = function (id, params) {
  return fetch({
    url: "fullpage/Blog/" + id,
    method: "get",
    params,
  });
};

BlogService.post = function (token,data) {
  return fetch({
    url: "fullpage/create",
    method: "post",
    headers: {
      "content-type": "multipart/form-data"
    },
    params:{
      token
    },
    data: data,
  });
};

BlogService.put = function (id, data) {
  return fetch({
    url: "fullpage/Blog/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

BlogService.delete = function (data) {
  return fetch({
    url: "fullpage/Blog/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data,
  });
};

export default BlogService;
