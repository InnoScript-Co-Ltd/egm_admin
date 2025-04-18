import { createSlice } from "@reduxjs/toolkit";
import { usdtPayload } from "./usdtPayload";

const usdtSlice = createSlice({
  name: "bankAccountType",
  initialState: {
    usdts: [],
    usdt: null,
    paginateParams: usdtPayload.paginateParams,
  },
  reducers: {
    index: (state, action) => {
      state.usdts = action.payload;
      return state;
    },
    update: (state, action) => {
      state.usdt = { ...action.payload };
      return state;
    },
    setPaginate: (state, action) => {
      state.paginateParams = action.payload;
      return state;
    },
  },
});

export const { index, update, setPaginate } = usdtSlice.actions;
export default usdtSlice.reducer;
