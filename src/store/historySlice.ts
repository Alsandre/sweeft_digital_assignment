import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { ELocalStorage, THistoryState } from "../types";

export const historySlice = createSlice({
  name: "history",
  initialState: {},
  reducers: {
    updateHistory: (
      state: THistoryState,
      action: PayloadAction<THistoryState>
    ) => {
      let currentKey = Object.keys(action.payload)[0].trim();
      const isSaved = current(state).hasOwnProperty(currentKey);
      const savedSliceLen = isSaved ? current(state)[currentKey].length : 0;
      const currentSliceLen = action.payload[currentKey].length;
      const emptyResult = currentSliceLen === 0;
      if (isSaved && savedSliceLen > currentSliceLen) {
        localStorage.setItem("HISTORY", JSON.stringify(current(state)));
        return current(state);
      } else if (emptyResult) return current(state);
      else {
        const newState = { ...state, ...action.payload };
        localStorage.setItem("HISTORY", JSON.stringify(newState));
        return newState;
      }
    },
    syncHistory: () => {
      const savedHistoryJSON = localStorage.getItem(
        ELocalStorage.SAVED_STORAGE
      );
      const savedHistoryParsed = savedHistoryJSON
        ? JSON.parse(savedHistoryJSON)
        : {};
      return savedHistoryParsed;
    },
    clearHistory: () => {
      return {};
    },
  },
});

export const { updateHistory, syncHistory, clearHistory } =
  historySlice.actions;

export default historySlice.reducer;
