import { createSlice } from "@reduxjs/toolkit";
import { bankAccountTypePayload } from "./bankAccountTypePayload";

const bankAccountTypeSlice = createSlice({
    name: 'bankAccountType',
    initialState: {
        bankAccountTypes: [],
        bankAccountType: null,
        paginateParams: bankAccountTypePayload.paginateParams,
    },
    reducers: {
        index: (state, action) => {
            state.bankAccountTypes = action.payload;
            return state;
        },
        update: (state, action) => {
            state.bankAccountType = {...action.payload};
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setPaginate } = bankAccountTypeSlice.actions;
export default bankAccountTypeSlice.reducer;