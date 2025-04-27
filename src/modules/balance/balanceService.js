import { endpoints } from "../../constants/endpoints";
import {
  dopGetRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, show, update } from "./balanceSlice";

export const balanceService = {
  //   store: async (payload, dispatch) => {
  //     const response = await postRequest(endpoints.repayment, payload);
  //     await httpServiceHandler(dispatch, response);

  //     if (response.status === 200) {
  //       dispatch(
  //         updateNotification({
  //           show: true,
  //           summary: "Success",
  //           severity: "success",
  //           detail: response.message,
  //         })
  //       );
  //     }
  //     return response;
  //   },

  show: async (dispatch) => {
    const response = await dopGetRequest(endpoints.balance);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(show(response.data));
    }
    return response;
  },

  index: async (dispatch, param) => {
    try {
      const response = await dopGetRequest(endpoints.billing, {
        params: param,
      });
      await httpServiceHandler(dispatch, param, response);

      if (response.status === 200 && response.data) {
        dispatch(index(response.data));
      }

      return response;
    } catch (error) {
      console.error("Error fetching billing data:", error);
      await httpServiceHandler(dispatch, param, error.response || {});
      return error.response || {};
    }
  },

  show2: async (dispatch, id) => {
    const result = await dopGetRequest(`${endpoints.billing}/${id}`);
    await httpServiceHandler(dispatch, result);

    if (result.status === 200) {
      dispatch(show(result.data));
    }

    return result;
  },

  //   update: async (dispatch, id, payload) => {
  //     const response = await putRequest(`${endpoints.repayment}/${id}`, payload);
  //     await httpServiceHandler(dispatch, response);

  //     if (response.status === 200) {
  //       dispatch(update(response.data));
  //       dispatch(
  //         updateNotification({
  //           show: true,
  //           summary: "Success",
  //           severity: "success",
  //           detail: response.message,
  //         })
  //       );
  //     }
  //     return response;
  //   },

  //   show: async (dispatch, id) => {
  //     const response = await getRequest(`${endpoints.repayment}/${id}`);
  //     await httpServiceHandler(dispatch, response);

  //     if (response.status === 200) {
  //       dispatch(show(response.data));
  //     }

  //     return response;
  //   },
};
