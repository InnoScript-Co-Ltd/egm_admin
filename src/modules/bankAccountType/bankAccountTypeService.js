import { endpoints } from "../../constants/endpoints"
import { formBuilderRequest, getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, update } from "./bankAccountTypeSlice";

export const bankAccountTypeService = {
    store: async (payload, dispatch) => {
        const response = await formBuilderRequest(endpoints.bankType, payload);
        console.log(payload)
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message
            }));
        }
        return response;
    },

    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.bankType,params);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(index(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    update: async (dispatch, payload, id) => {
        const response = await formBuilderRequest(`${endpoints.bankType}/${id}`, payload);
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
        const response = await getRequest(`${endpoints.bankType}/${id}`);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(update(response.data));
        }
        
        return response;
    },

    generatePassword: async (dispatch) => {
        const result = await getRequest(`${endpoints.partner}/generate-password`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail:result.message
            }));
        }
        return result;
    }
}