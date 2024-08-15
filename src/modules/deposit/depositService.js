import { endpoints } from "../../constants/endpoints"
import { getRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { index } from "./depositSlice";

export const depositService = {
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.deposit, params);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(index(response.data.data ? response.data.data : response.data));
        }
        return response;
    },
}