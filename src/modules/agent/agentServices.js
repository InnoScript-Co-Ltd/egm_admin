import { endpoints } from "../../constants/endpoints"
import { getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { setAgent, setAgents } from "./agentSlice";

export const agentServices = {
    store: async (payload, dispatch) => {
        const response = await postRequest(endpoints.agent, payload);
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

    index: async (dispatch, type, params) => {
        const response = await getRequest(`${endpoints.agent}/${type}`, params);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(setAgents(response.data.data ? response.data.data : response.data));
        }
        return response;
    },

    update: async (dispatch, payload, id) => {
        const response = await putRequest(`${endpoints.partner}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(setAgent(response.data));
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message
            }));
        }
        return response;
    },

    show: async (dispatch, type, id) => {
        const response = await getRequest(`${endpoints.agent}/${type}/${id}`);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {   
            dispatch(setAgent(response.data));
        }
        
        return response;
    },
}