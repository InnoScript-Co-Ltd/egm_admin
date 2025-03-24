import { endpoints } from "../../constants/endpoints"
import { getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, setShow } from "./depositSlice";

export const depositService = {
    partnerIndex: async (dispatch, params) => {
        const result = await getRequest(`${endpoints.deposit}`, params);
        await httpServiceHandler(dispatch, result);
        
        if (result.status === 200) {
            dispatch(index(result.data.data ? result.data.data : result.data));
        }
        
        return result;
    },

    index: async (dispatch, params) => {
        const result = await getRequest(endpoints.deposit, params);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(index(result.data.data ? result.data.data : result.data));
        }
        
        return result;
    },

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.deposit}/${id}`);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(setShow(result.data));
        }

        return result;
    },

    showUpdate: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.repayment}/${id}`);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(setShow(result.data));
        }

        return result;
    },

    makePayment: async (dispatch, id) => {
        const result = await postRequest(`${endpoints.deposit}/${id}/make-payment`, null);
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

    getRepayment: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.repayment}/${endpoints.deposit}/${id}`);
        await httpServiceHandler(dispatch, result);
    
        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }
    
        return result;
    },

    repaymentUpdate: async (dispatch, id, payload) => {
        const result = await putRequest(`${endpoints.repayment}/${id}`, payload);
        await httpServiceHandler(dispatch, result);
    
        if (result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: "Repayment updated successfully"
            }));
        } else {
            dispatch(updateNotification({
                show: true,
                summary: "Error",
                severity: "error",
                detail: result.message || "Failed to update repayment"
            }));
        }
    
        return result;
    },    

    makeReject: async (dispatch, id) => {
        const result = await postRequest(`${endpoints.deposit}/${id}/make-reject`, null);
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