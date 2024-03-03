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
      let currentKey = Object.keys(action.payload)[0];
      const isSaved = current(state).hasOwnProperty(currentKey);
      const savedSliceLen = isSaved ? current(state)[currentKey].length : 0;
      const currentSliceLen = action.payload[currentKey].length;
      if (isSaved && savedSliceLen > currentSliceLen) {
        localStorage.setItem("HISTORY", JSON.stringify(current(state)));
        return current(state);
      } else {
        const newState = { ...state, ...action.payload };
        localStorage.setItem("HISTORY", JSON.stringify(newState));
        return newState;
      }
    },
    syncHistory: () => {
      const savedHistoryJSON = localStorage.getItem(
        ELocalStorage.SAVED_STORAGE
      );
      console.log(savedHistoryJSON);
      const savedHistoryParsed = savedHistoryJSON
        ? JSON.parse(savedHistoryJSON)
        : {};
      return savedHistoryParsed;
    },
  },
});

export const { updateHistory, syncHistory } = historySlice.actions;

export default historySlice.reducer;
