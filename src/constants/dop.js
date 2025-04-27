import axios from "axios";
import { getData } from "../helpers/localstorage";
import { keys, dopURL } from "./config";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const dop = axios.create({
  baseURL: `${dopURL}`,
});
dop.interceptors.request.use(
  (config) => {
    const token = getData(keys.DOP_TOKEN) ? getData(keys.DOP_TOKEN) : null;

    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
        Accept: "Application/json",
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default dop;
