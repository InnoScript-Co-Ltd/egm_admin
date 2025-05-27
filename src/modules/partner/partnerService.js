import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, update } from "./partnerSlice";

export const partnerService = {
  store: async (payload, dispatch) => {
    const response = await postRequest(endpoints.partner, payload);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message,
        })
      );
    }
    return response;
  },

  partnerTransaction: async (dispatch, id, params) => {
    const response = await getRequest(
      `${endpoints.transaction}/partner/${id}`,
      params
    );
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(index(response.data.data ? response.data.data : response.data));
    }

    return response;
  },

  index: async (dispatch, params) => {
    const response = await getRequest(endpoints.partner, params);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(index(response.data.data ? response.data.data : response.data));
    }
    return response;
  },

  update: async (dispatch, payload, id) => {
    const response = await putRequest(`${endpoints.partner}/${id}`, payload);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(update(response.data));
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message,
        })
      );
    }
    return response;
  },

  show: async (dispatch, id) => {
    const response = await getRequest(`${endpoints.partner}/${id}`);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(update(response.data));
    }

    return response;
  },

  generatePassword: async (dispatch) => {
    const result = await getRequest(`${endpoints.partner}/generate-password`);
    await httpServiceHandler(dispatch, result);

    if (result.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: result.message,
        })
      );
    }
    return result;
  },

  approveAccount: async (dispatch, id) => {
    const result = await postRequest(`${endpoints.partner}/${id}/approve`);
    await httpServiceHandler(dispatch, result);

    if (result.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: result.message,
        })
      );
    }
  },

  approveKyc: async (dispatch, id) => {
    const result = await postRequest(`${endpoints.partner}/${id}/approve-kyc`);
    await httpServiceHandler(dispatch, result);

    if (result.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: result.message,
        })
      );
    }
  },
};
