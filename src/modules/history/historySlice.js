import { createSlice } from "@reduxjs/toolkit";
import { historyPayload } from "./historyPayload";

const historySlice = createSlice({
  name: "history",
  initialState: {
    historys: [],
    historyDetail: null,
    paginateParams: historyPayload.paginateParams,
  },
  reducers: {
    index: (state, action) => {
      state.historys = action.payload;
      return state;
    },
    update: (state, action) => {
      state.historyDetail = action.payload;
      return state;
    },
    show: (state, action) => {
      state.historyDetail = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.paginateParams = action.payload;
      return state;
    },
  },
});

export const { index, update, show, setPaginate } = historySlice.actions;
export default historySlice.reducer;
