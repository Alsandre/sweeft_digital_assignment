import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ELocalStorage } from "../../types";
import { clearHistory } from "../../store/historySlice";

export const HistoryPage: React.FC = () => {
  const history = useSelector((state: RootState) => state.history);
  const dispatch = useDispatch();
  const searchHistory = history ? Object.keys(history) : [];
  const handleClearHistory = (): void => {
    localStorage.removeItem(ELocalStorage.SAVED_STORAGE);
    dispatch(clearHistory());
  };
  return (
    <>
      <h1>History</h1>
      <button onClick={handleClearHistory}>Clear history</button>
      <ul>
        {searchHistory.length > 0 &&
          searchHistory.map((term) => <li key={term}>{term}</li>)}
      </ul>
    </>
  );
};
