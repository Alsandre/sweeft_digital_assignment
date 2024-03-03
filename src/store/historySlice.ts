import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { THistoryState } from "../types";

export const historySlice = createSlice({
  name: "history",
  initialState: {},
  reducers: {
    updateHistory: (
      state: THistoryState,
      action: PayloadAction<THistoryState>
    ) => {
      let currentKey = Object.keys(action.payload)[0];
      const isSaved = current(state).hasOwnProperty(currentKey);
      const savedSliceLen = isSaved ? current(state)[currentKey].length : 0;
      const currentSliceLen = action.payload[currentKey].length;
      if (isSaved && savedSliceLen > currentSliceLen) {
        return current(state);
      } else {
        return { ...state, ...action.payload };
      }
    },
  },
});

export const { updateHistory } = historySlice.actions;

export default historySlice.reducer;
