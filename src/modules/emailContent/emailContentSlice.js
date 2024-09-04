import { createSlice } from "@reduxjs/toolkit";
import { emailContentPayload } from "./emailContentPayload";

const emailContentSlice = createSlice({
    name: 'emailContent',
    initialState: {
        emailContents: [],
        emailContent: null,
        paginateParams: emailContentPayload.paginateParams,
    },
    reducers: {
        index: (state, action) => {
            state.emailContents = action.payload;
            return state;
        },
        update: (state, action) => {
            state.emailContent = {...action.payload};
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setPaginate } = emailContentSlice.actions;
export default emailContentSlice.reducer;