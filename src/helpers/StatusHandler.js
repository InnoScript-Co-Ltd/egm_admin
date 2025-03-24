import { endpoints } from "../constants/endpoints";
import { getRequest } from "./api";

export const generalStatus = async () => {
    try{

        const response = await getRequest(`/${endpoints.status}?type=${endpoints.generalStatus}`);

            const formateData = response.data.general?.map((item) => {
                return {
                    label : item, 
                    value: item
                }
            })

            return formateData;


    } catch (error) {
        console.log(error)
    }
}

export const depositStatus = async () => {
    try {
        const response = await getRequest(`/${endpoints.status}?type=${endpoints.depositStatus}`);

        const formattedData = response.data.deposit?.map((item) => ({
            label: item,
            value: item
        }));

        return formattedData;
    } catch (error) {
        console.log(error);
    }
};
