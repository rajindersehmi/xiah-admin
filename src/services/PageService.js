import axios from "axios";
const PageService = {};

PageService.getPrivacy = function () {
  return axios.get(
    "https://www.api.tsuk.deliverable.services/customer/v1/pages/privacy-policy"
  );
};
PageService.getTerms = function () {
  return axios.get(
    "https://www.api.tsuk.deliverable.services/customer/v1/pages/terms-of-use"
  );
};
export default PageService;
