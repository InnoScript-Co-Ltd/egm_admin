import { endpoints } from "../../constants/endpoints"
import { getRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { index, setShow } from "./depositSlice";

export const depositService = {
    index: async (dispatch, params) => {
        const result = await getRequest(endpoints.deposit, params);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(index(result.data.data ? result.data.data : result.data));
        }
        return result;
    },

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.deposit}/${id}`);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            dispatch(setShow(result.data));
        }

        return result;
    }
}