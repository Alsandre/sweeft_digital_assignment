import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

export const historySlice = createSlice({
  name: "history",
  initialState: {},
  reducers: {
    update: (
      state: { [key: string]: string },
      action: PayloadAction<{ [key: string]: string }>
    ) => {
      let currentKey = Object.keys(action.payload)[0]
      if (current(state).hasOwnProperty(currentKey)) {
        current(state);
      } else {
        return { ...state, ...action.payload };
      }
    },
  },
});

export const { update } = historySlice.actions;

export default historySlice.reducer;
