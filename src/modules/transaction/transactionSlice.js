import { createSlice } from "@reduxjs/toolkit";
import { transactionPayload } from "./transactionPayload";

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        transaction: null,
        paginateParams: transactionPayload.paginateParams,
        total: 0
    },
    reducers: {
        setIndex: (state, action) => {
            state.transactions = action.payload.data.data ? action.payload.data.data : action.payload.data;
            state.total = action.payload.data.data ? action.data.total : action.payload.data.length;
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

export const { setIndex, update, setShow, setPaginate } = transactionSlice.actions;
export default transactionSlice.reducer;