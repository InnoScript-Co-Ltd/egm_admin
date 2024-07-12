import { createSlice } from "@reduxjs/toolkit";
import { packagePayload } from "./packagePayload";

const packageSlice = createSlice({
    name: 'package',
    initialState: {
        packages: [],
        packageDetail: null,
        paginateParams: packagePayload.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.packages = action.payload;
            return state;
        },
        update: (state, action) => {
            state.packageDetail = action.payload;
            return state;
        },
        show: (state, action) => {
            state.packageDetail = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = packageSlice.actions;
export default packageSlice.reducer;