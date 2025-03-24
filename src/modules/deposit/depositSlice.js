import { createSlice } from "@reduxjs/toolkit";
import { depositPayload } from "./depositPayload";

const depositSlice = createSlice({
    name: 'deposits',
    initialState: {
        deposits: [],
        deposit: null,
        paginateParams: depositPayload.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.deposits = action.payload;
            return state;
        },
        setShow: (state, action) => {
            state.deposit = {...action.payload};
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setShow, setPaginate } = depositSlice.actions;
export default depositSlice.reducer;