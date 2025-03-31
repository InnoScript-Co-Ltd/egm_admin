import { createSlice } from "@reduxjs/toolkit";
import { promotionPayload } from "./promotionPayload";

const promotionSlice = createSlice({
    name: 'promotion',
    initialState: {
        promotions: [],
        promotion: null,
        paginateParams: promotionPayload.paginateParams,
    },
    reducers: {
        index: (state, action) => {
            state.promotions = action.payload;
            return state;
        },
        update: (state, action) => {
            state.promotion = {...action.payload};
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setPaginate } = promotionSlice.actions;
export default promotionSlice.reducer;