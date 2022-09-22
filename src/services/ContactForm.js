import fetch from "auth/FetchInterceptor";

const ContactFormService = {};

ContactFormService.list = function (params) {
  return fetch({
    url: `contact-us`,
    method: "get",
    params,
  });
};

export default ContactFormService;
