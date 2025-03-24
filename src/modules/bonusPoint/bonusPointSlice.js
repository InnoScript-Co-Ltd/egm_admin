import { createSlice } from "@reduxjs/toolkit";
import { bonusPointPayload } from "./bonusPointPayload";

const bonusPointSlice = createSlice({
    name: 'bonusPoint',
    initialState: {
        bonusPoints: [],
        bonusPoint: null,
        paginateParams: bonusPointPayload.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.bonusPoints = action.payload;
            return state;
        },
        setShow: (state, action) => {
            state.bonusPoint = {...action.payload};
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setShow, setPaginate } = bonusPointSlice.actions;
export default bonusPointSlice.reducer;