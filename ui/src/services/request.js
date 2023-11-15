import axios from "axios";
import qs from "qs";
import moment from "moment";
import { camelizeKeys, decamelizeKeys } from "humps";
import { getToken, removeToken } from "../utils/token.utils";

const request = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

request.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      response.headers["content-type"] === "application/json"
    ) {
      response.data = camelizeKeys(response.data);
    }
    return response.data;
  },
  async (error) => {
    const { config, response } = error;
    if (config?.url !== "/login" && response?.status === 401) {
      // removeToken();
    }
    return Promise.reject(error);
  }
);

request.interceptors.request.use(
  (config) => {
    const authToken = getToken();
    const newConfig = { ...config };
    newConfig.url = `${config.url}`;

    if (authToken) {
      newConfig.headers.Authorization = authToken;
    }

    newConfig.paramsSerializer = (params) =>
      qs.stringify(params, {
        encode: false,
        serializeDate: (date) => moment(date).format("YYYY-MM-DD"),
        arrayFormat: "brackets",
      });

    if (newConfig.headers["Content-Type"] === "multipart/form-data") {
      return newConfig;
    }

    if (config.params) {
      newConfig.params = decamelizeKeys(config.params);
    }

    if (config.data) {
      newConfig.data = decamelizeKeys(config.data);
    }

    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default request;
