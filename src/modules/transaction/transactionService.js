import { endpoints } from "../../constants/endpoints"
import { getRequest, postRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, setShow } from "./transactionSlice";

export const transactionService = {
    index: async (dispatch, params) => {
        const result = await getRequest(endpoints.transaction, params);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(index(result.data.data ? result.data.data : result.data));
        }
        
        return result;
    },

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.transaction}/${id}`);
        await httpServiceHandler(dispatch, result);

        if (result.status === 200) {
            dispatch(setShow(result.data));
        }

        return result;
    },

    makePayment: async (dispatch, payload) => {
        const result = await postRequest(endpoints.deposit, payload);
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
    }
}