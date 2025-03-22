import { endpoints } from "../../constants/endpoints"
import { delRequest, getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, setShow } from "./bonusPointSlice";

export const bonusPointService = {

    index: async (dispatch, params) => {
        const result = await getRequest(endpoints.bonusPoint, params);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(index(result.data.data ? result.data.data : result.data));
        }
        
        return result;
    },

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.bonusPoint}/${id}`);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(setShow(result.data));
        }

        return result;
    },

    create: async (dispatch, payload) => {
        const result = await postRequest(`${endpoints.bonusPoint}`, payload);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    update: async (dispatch, id, payload) => {
        const result = await putRequest(`${endpoints.bonusPoint}/${id}`, payload);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },

    destroy: async (dispatch, id) => {
        const result = await delRequest(`${endpoints.bonusPoint}/${id}`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: result.message
            }));
        }

        return result;
    },
}