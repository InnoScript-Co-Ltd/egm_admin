import { createSlice } from "@reduxjs/toolkit";
import { invoicePayload } from "./invoicePayload";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: [],
    invoice: null,
    paginateParams: invoicePayload.paginateParams,
    total: 0,
  },
  reducers: {
    index: (state, action) => {
      state.invoices = action.payload;
      return state;
    },
    update: (state, action) => {
      state.invoice = action.payload;
      return state;
    },
    show: (state, action) => {
      state.invoice = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.paginateParams = action.payload;
      return state;
    },
  },
});

export const { index, update, show, setPaginate } = invoiceSlice.actions;
export default invoiceSlice.reducer;
