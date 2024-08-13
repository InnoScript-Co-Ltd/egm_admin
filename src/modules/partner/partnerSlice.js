import { createSlice } from "@reduxjs/toolkit";
import { partnerPayload } from "./partnerPayload";

const partnerSlice = createSlice({
    name: 'partner',
    initialState: {
        partners: [],
        partner: null,
        paginateParams: partnerPayload.paginateParams,
    },
    reducers: {
        index: (state, action) => {
            state.partners = action.payload;
            return state;
        },
        update: (state, action) => {
            state.partner = {...action.payload};
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setPaginate } = partnerSlice.actions;
export default partnerSlice.reducer;