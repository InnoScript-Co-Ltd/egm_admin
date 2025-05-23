import http from "../constants/axios";
import { httpErrorHandler, httpResponseHandler } from "./handler";
import { keys } from "../constants/config";
import dop from "../constants/dop";

const urlParams = (params) => {
  let paramsArray = [];
  Object.keys(params).map((value) => {
    return paramsArray.push(`${value}=${params[value]}`);
  });
  return paramsArray.join("&");
};

/**
 * Http get method request
 * @param {*} path
 * @param {*} params
 * @returns
 */
export const getRequest = async (path, params) => {
  try {
    const url = params ? `${path}?${urlParams(params)}` : path;
    const result = await http.get(url);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error);
  }
};

/**
 * Http post method request
 * @param {*} path
 * @param {*} payload
 * @returns
 */
export const postRequest = async (path, payload) => {
  try {
    const result = await http.post(path, payload);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error);
  }
};

/**
 * Http post method request for updating process include mutiple files or file
 * @param {*} path
 * @param {*} payload
 * @returns
 */
export const formBuilderRequest = async (path, payload) => {
  try {
    const result = await http.post(path, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error);
  }
};

//For Digital Ocean
export const dopGetRequest = async (path, params = {}) => {
  try {
    const response = await dop.get(path, {
      headers: {
        Authorization: `Bearer ${keys.DOP_TOKEN}`,
      },
      params,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return httpErrorHandler(error);
  }
};

/**
 * Http put method request
 * @param {*} path
 * @param {*} payload
 * @returns
 */
export const putRequest = async (path, payload) => {
  try {
    const result = await http.put(path, payload);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error);
  }
};

/**
 * Http delete method request
 * @param {*} path
 * @returns
 */
export const delRequest = async (path) => {
  try {
    const result = await http.delete(path);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error);
  }
};
