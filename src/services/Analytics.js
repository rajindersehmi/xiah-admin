import fetch from "auth/FetchInterceptor";

const AnalyticsService = {};

AnalyticsService.get = function (params) {
  return fetch({
    url: `analytics`,
    method: "get",
    params,
  });
};

AnalyticsService.days = function (params) {
  return fetch({
    url: `analytics-days`,
    method: "get",
    params,
  });
};

AnalyticsService.count = function (params) {
  return fetch({
    url: `analytics-all`,
    method: "get",
    params,
  });
};

AnalyticsService.topCategory = function (params) {
  return fetch({
    url: `analytics-category`,
    method: "get",
    params,
  });
};

AnalyticsService.topPartners = function (params) {
  return fetch({
    url: `analytics-partner`,
    method: "get",
    params,
  });
};

AnalyticsService.revenue = function (params) {
  return fetch({
    url: `analytics-revenue`,
    method: "get",
    params,
  });
};

AnalyticsService.google = function (params) {
  return fetch({
    url: `google-analytics-total-visitor`,
    method: "get",
    params,
  });
};

export default AnalyticsService;
