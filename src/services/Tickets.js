import fetch from "auth/FetchInterceptor";

const TicketService = {};

TicketService.list = (params) => {
  return fetch({
    url: "tickets",
    method: "get",
    params,
  });
};
TicketService.get = (id, params) => {
  return fetch({
    url: "tickets/" + id,
    method: "get",
    params,
  });
};

TicketService.updateStatus = (id, data) => {
  return fetch({
    url: "tickets/" + id + "/update-status",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

TicketService.sendMessage = (id, data) => {
  return fetch({
    url: "tickets/" + id + "/message",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

TicketService.create = (data) => {
  return fetch({
    url: "tickets/create",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: data,
  });
};

export default TicketService;
