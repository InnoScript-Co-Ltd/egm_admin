import { createSlice } from "@reduxjs/toolkit";
import { balancePayload } from "./balancePayload";

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balances: [],
    balance: null,
    paginateParams: balancePayload.paginateParams,
    total: 0,
  },
  reducers: {
    index: (state, action) => {
      state.balances = action.payload;
      return state;
    },
    update: (state, action) => {
      state.balance = action.payload;
      return state;
    },
    show: (state, action) => {
      state.balance = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.paginateParams = action.payload;
      return state;
    },
  },
});

export const { index, update, show, setPaginate } = balanceSlice.actions;
export default balanceSlice.reducer;
