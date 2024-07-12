import { createSlice } from "@reduxjs/toolkit";
import { permissionPayload } from "./permissionPayload";

const permissionSlice = createSlice({
    name: 'permission',
    initialState: {
        permissions: [],
        permission: null,
        paginateParams: permissionPayload.paginateParams,
    },
    reducers: {
        index: (state, action) => {
            state.permissions = action.payload;
            return state;
        },
        show: (state, action) => {
            state.permission = action.payload;
            return state;
        },
        update: (state, action) => {
            state.permission = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, show, update, setPaginate } = permissionSlice.actions;
export default permissionSlice.reducer;