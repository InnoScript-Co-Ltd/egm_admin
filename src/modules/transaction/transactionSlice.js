import { createSlice } from "@reduxjs/toolkit";
import { transactionPayload } from "./transactionPayload";

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        transaction: null,
        paginateParams: transactionPayload.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.transactions = action.payload;
            return state;
        },
        setShow: (state, action) => {
            state.transaction = {...action.payload};
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setShow, setPaginate } = transactionSlice.actions;
export default transactionSlice.reducer;