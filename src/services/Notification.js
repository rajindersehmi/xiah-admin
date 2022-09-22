import fetch from "auth/FetchInterceptor";

const NotificationService = {};

NotificationService.list = function (params) {
  return fetch({
    url: "notifications",
    method: "get",
    params,
  });
};

NotificationService.markAsRead = function (id, params) {
  return fetch({
    url: "notifications-read/" + id,
    method: "get",
    params,
  });
};

NotificationService.markAllAsRead = function (params) {
  return fetch({
    url: "notifications-read-all",
    method: "get",
    params,
  });
};

export default NotificationService;
