import { endpoints } from "../../constants/endpoints";
import { getRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, show, update } from "./permissionSlice";


export const permissionService = {
    update: async (dispatch, id, payload) => {
        const response = await putRequest(`${endpoints.permission}/${id}`, payload);
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
        const response = await getRequest(`${endpoints.permission}/${id}`);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(show(response.data));
        }
        
        return response;
    },

    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.permission, params);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(index(response.data.data ? response.data.data : response.data));
        }
        return response;
    },
}