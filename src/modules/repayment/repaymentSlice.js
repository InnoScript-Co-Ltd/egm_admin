import { createSlice } from "@reduxjs/toolkit";
import { repaymentPayload } from "./repaymentPayload";

const repaymentSlice = createSlice({
    name: 'repayment',
    initialState: {
        repayments: [],
        repayment: null,
        paginateParams : repaymentPayload.paginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.repayments = action.payload;
            return state;
        },
        update: (state, action) => {
            state.repayment = action.payload;
            return state;
        },
        show: (state, action) => {
            state.repayment = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = repaymentSlice.actions;
export default repaymentSlice.reducer;