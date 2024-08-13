import { createSlice } from "@reduxjs/toolkit";
import { merchantBankAccountPayload } from "./merchantBankAccountPayload";

const merchantBankAccountSlice = createSlice({
    name: 'merechantBankAccount',
    initialState: {
        merchantBankAccounts: [],
        merchantBankAccount: null,
        paginateParams: merchantBankAccountPayload.paginateParams,
    },
    reducers: {
        index: (state, action) => {
            state.merchantBankAccounts = action.payload;
            return state;
        },
        update: (state, action) => {
            state.merchantBankAccount = {...action.payload};
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setPaginate } = merchantBankAccountSlice.actions;
export default merchantBankAccountSlice.reducer;