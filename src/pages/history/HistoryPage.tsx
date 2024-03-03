import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ELocalStorage } from "../../types";
import { clearHistory } from "../../store/historySlice";
import InfiniteScroll from "../../components/imageList/InfiniteScroll";
import { useState } from "react";

export const HistoryPage: React.FC = () => {
  const history = useSelector((state: RootState) => state.history);
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const searchHistory = history ? Object.keys(history) : [];
  const handleClearHistory = (): void => {
    localStorage.removeItem(ELocalStorage.SAVED_STORAGE);
    dispatch(clearHistory());
  };
  const scrollableData = term && history[term].savedData;
  console.log(scrollableData);
  return (
    <>
      <h1>History</h1>
      <button onClick={handleClearHistory}>Clear history</button>
      <ul>
        {searchHistory.length > 0 &&
          searchHistory.map((searchTerm) => (
            <li onClick={() => setTerm(searchTerm)} key={searchTerm}>
              {searchTerm}
            </li>
          ))}
      </ul>
      {scrollableData && <InfiniteScroll imageList={scrollableData} />}
    </>
  );
};
