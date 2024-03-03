import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ELocalStorage } from "../../types";
import { clearHistory } from "../../store/historySlice";
import { useState } from "react";
import styles from "./histyoryPage.module.css";
import ImageList from "../../components/imageList/ImageList";

export const HistoryPage: React.FC = () => {
  const history = useSelector((state: RootState) => state.history);
  const [termPreview, setTermPreview] = useState("");
  const dispatch = useDispatch();
  const searchHistory = history ? Object.keys(history) : [];
  const handleClearHistory = (): void => {
    localStorage.removeItem(ELocalStorage.SAVED_STORAGE);
    dispatch(clearHistory());
  };
  console.log(searchHistory);
  return (
    <>
      <div className={styles["terms-list-wrapper"]}>
        <button onClick={handleClearHistory} className={styles["clear-button"]}>
          Clear history
        </button>
        <ul className={styles["terms-list"]}>
          {searchHistory.length > 0 &&
            searchHistory.map((term, ind) => (
              <li
                key={term}
                onClick={() => setTermPreview(term)}
                className={
                  ind % 2 === 0 ? styles["term-even"] : styles["term-odd"]
                }
              >
                {term}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles["image-list-wrapper"]}>
        {termPreview.length > 0 && (
          <ImageList imageList={history[termPreview]} />
        )}
      </div>
    </>
  );
};
