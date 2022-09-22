import fetch from "auth/FetchInterceptor";

const GoogleAnalyticsService = {};

GoogleAnalyticsService.getAll = function (params) {
  return fetch({
    url: `analytics-google`,
    method: "get",
    params,
  });
};
export default GoogleAnalyticsService;
