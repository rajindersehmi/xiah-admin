import fetch from "auth/FetchInterceptor";

const PushNotificationService = {};

PushNotificationService.list = function (params) {
  return fetch({
    url: "notification-fcm",
    method: "get",
    params,
  });
};

PushNotificationService.get = function (id, params) {
  return fetch({
    url: "notification-fcm/" + id,
    method: "get",
    params,
  });
};

PushNotificationService.post = function (data) {
  return fetch({
    url: "notification-fcm",
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
};

PushNotificationService.put = function (id, data) {
  return fetch({
    url: "notification-fcm/" + id,
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });
};

export default PushNotificationService;
