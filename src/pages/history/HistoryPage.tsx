import { ELocalStorage } from "../../types";
import { Suspense, lazy, useEffect, useState } from "react";

const InfiniteScroll = lazy(
  () => import("../../components/infiniteScroll/InfiniteScroll")
);

export const HistoryPage: React.FC = () => {
  const [term, setTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const handleClearHistory = (): void => {
    localStorage.removeItem(ELocalStorage.SAVED_STORAGE);
    setSearchHistory([]);
    setTerm("");
  };
  useEffect(() => {
    const storage = localStorage.getItem(ELocalStorage.SAVED_STORAGE)
      ? JSON.parse(localStorage.getItem(ELocalStorage.SAVED_STORAGE)!)
      : null;
    const termList = storage ? Object.keys(storage) : [];
    setSearchHistory(termList);
  }, []);
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
      <Suspense fallback={<div>"Loading..."</div>}>
        {term.length > 0 && <InfiniteScroll term={term} key={term} />}
      </Suspense>
    </>
  );
};
