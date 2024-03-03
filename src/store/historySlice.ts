import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { ELocalStorage, THistoryState } from "../types";

export const initialState: THistoryState = {
  "": { maxAvailablePage: 0, maxSavedPage: 0, savedData: [] },
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    updateHistory: (
      state: THistoryState,
      action: PayloadAction<THistoryState>
    ) => {
      let currentKey = Object.keys(action.payload)[0].trim();
      const isSaved = current(state).hasOwnProperty(currentKey);
      const currentSliceLen = action.payload[currentKey].savedData.length;
      const emptyResult = currentSliceLen === 0;
      if (isSaved) {
        const newData = [
          ...current(state)[currentKey].savedData,
          ...action.payload[currentKey].savedData,
        ];
        const maxSavedPage = current(state)[currentKey].maxSavedPage + 1;
        const newSlce = {
          ...current(state)[currentKey],
          maxSavedPage,
          savedData: newData,
        };
        const newState = { ...state, [currentKey]: newSlce };
        localStorage.setItem("HISTORY", JSON.stringify(newState));
        console.log("History updated state - ", newState);
        return newState;
      } else if (emptyResult) {
        console.log("History - emptyResult");
        return current(state);
      } else {
        const newState = { ...state, ...action.payload };
        localStorage.setItem("HISTORY", JSON.stringify(newState));
        console.log("History new entry - ", action.payload);
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
