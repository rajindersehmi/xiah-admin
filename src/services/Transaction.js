import fetch from "auth/FetchInterceptor";

const TransactionService = {};

TransactionService.list = function (params) {
  return fetch({
    url: `user/transaction/paypal`,
    method: "get",
    params,
  });
};

TransactionService.downloadCSV = function (params) {
  return fetch({
    url: "export-transaction",
    method: "get",
    responseType: "blob",
    params,
  });
};
TransactionService.downloadSelectedInvioces = function (params) {
  return fetch({
    url: "download-invoice-zip",
    method: "get",
    responseType: "blob",
    params,
  });
};

export default TransactionService;
