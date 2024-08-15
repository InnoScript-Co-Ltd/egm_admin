import { createSlice } from "@reduxjs/toolkit";
import { depositPayload } from "./depositPayload";

const depositSlice = createSlice({
    name: 'deposit',
    initialState: {
        deposit_transcations: [],
        deposit_transcation: null,
        paginateParams: depositPayload.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.deposit_transcations = action.payload;
            return state;
        },
        update: (state, action) => {
            state.deposit_transcation = action.payload;
            return state;
        },
        show: (state, action) => {
            state.deposit_transcation = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = depositSlice.actions;
export default depositSlice.reducer;