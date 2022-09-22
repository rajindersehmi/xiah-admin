const dev = {
  API_ENDPOINT_URL: process.env.REACT_APP_API_URL,
  BASE_IMG_URL: process.env.REACT_APP_API_IMAGE_URL,
  CUSTOMER_URL: process.env.REACT_APP_CUSTOMER_URL,
  INVOICE_URL: process.env.REACT_APP_INVOICE_URL,
};

const prod = {
  API_ENDPOINT_URL: process.env.REACT_APP_API_URL,
  BASE_IMG_URL: process.env.REACT_APP_API_IMAGE_URL,
  CUSTOMER_URL: process.env.REACT_APP_CUSTOMER_URL,
};

const test = {
  API_ENDPOINT_URL: process.env.REACT_APP_API_URL,
  BASE_IMG_URL: process.env.REACT_APP_API_IMAGE_URL,
  CUSTOMER_URL: process.env.REACT_APP_CUSTOMER_URL,
};

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    case "test":
      return test;
    default:
      break;
  }
};

export const env = getEnv();
