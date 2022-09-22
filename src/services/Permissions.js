import fetch from "auth/FetchInterceptor";

const PermissionService = {};

PermissionService.getAll = function (params) {
  return fetch({
    url: "permission/get-all",
    method: "get",
    params,
  });
};

PermissionService.getRolesWithPermission = function (params) {
  return fetch({
    url: "roles/with-permission",
    method: "get",
    params,
  });
};

PermissionService.getSingleRole = function (id, params) {
  return fetch({
    url: "roles/get/" + id,
    method: "get",
    params,
  });
};

PermissionService.createRole = function (data) {
  return fetch({
    url: "roles",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

PermissionService.assignPermissions = function (data) {
  return fetch({
    url: "permission/give",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

PermissionService.revokeOne = function (id, data) {
  return fetch({
    url: "permission/revoke/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};
PermissionService.deleteRole = function (data) {
  return fetch({
    url: "roles/delete",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};
PermissionService.assignRole = function (id, params) {
  return fetch({
    url: "role/assign/" + id,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    params,
  });
};

// PlanService.post = function (data) {
//   return fetch({
//     url: "plans",
//     method: "post",
//     headers: {
//       "content-type": "multipart/form-data",
//     },
//     data: data,
//   });
// };

// PlanService.put = function (id, data) {
//   return fetch({
//     url: "plans/" + id,
//     method: "post",
//     headers: {
//       "content-type": "multipart/form-data",
//     },
//     data: data,
//   });
// };

// PlanService.delete = function (data) {
//   return fetch({
//     url: "plans/delete",
//     method: "post",
//     headers: {
//       "content-type": "multipart/form-data",
//     },
//     data,
//   });
// };

export default PermissionService;
