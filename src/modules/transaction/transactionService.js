import { endpoints } from "../../constants/endpoints"
import { getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, setShow, update } from "./transactionSlice";

export const transactionService = {
    index: async (dispatch, params) => {
        const result = await getRequest(endpoints.transaction, params);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(index(result.data.data ? result.data.data : result.data));
        }
        
        return result;
    },

    update: async (dispatch, id, payload) => {
        const response = await putRequest(`${endpoints.transaction}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(update(response.data));
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message
            }));
        }
        return response;
    },

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.transaction}/${id}`);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(setShow(result.data));
        }

        return result;
    },

    update: async (dispatch, id, payload) => {
        const result = await formBuilderRequest(`${endpoints.transaction}/${id}`, payload);
        await httpServiceHandler(dispatch, result);
        return result;
    },

    makePayment: async (dispatch, id) => {
        const result = await postRequest(`${endpoints.transaction}/${id}/make-payment`, null);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },
    
    makeReject: async (dispatch, id) => {
        const result = await postRequest(`${endpoints.transaction}/${id}/make-reject`, null);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },
}