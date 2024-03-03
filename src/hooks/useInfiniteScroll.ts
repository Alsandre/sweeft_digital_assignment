import { useEffect, useState } from "react";
import { IImageData, searchQuery } from "../services/unsplashSearch";

export const useInfiniteScroll = (term: string) => {
  const [scrollableData, setScrollableData] = useState<IImageData[]>([]);
  const [cachedData, setCachedData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const historyInStorage =
      localStorage.getItem("history") !== null
        ? JSON.parse(localStorage.getItem("history")!)
        : null;

    const termDataFromStorage = historyInStorage
      ? historyInStorage[term]
      : null;
    termDataFromStorage && setCachedData(termDataFromStorage);
    if (isFirstRender && termDataFromStorage) {
      console.log("isFirstRender && termDataFromStorage");
      const firstPageData = termDataFromStorage.slice(0, 20);
      setScrollableData(firstPageData);
      setPageIndex(1);
    } else if (isFirstRender) {
      console.log("isFirstRender");
      fetchFromUnsplashAPI();
      setPageIndex(1);
    } else if (scrollableData.length < cachedData.length && pageIndex !== 1) {
      console.log("scrollableData.length < cachedData.length");
      setScrollableData(cachedData.slice(0, pageIndex * 20));
    } else if (pageIndex !== 1) {
      console.log("effect else block");
      fetchFromUnsplashAPI();
    }
    async function fetchFromUnsplashAPI() {
      setIsFetching(true);
      try {
        const parsedData = await searchQuery(term, pageIndex);
        console.log("fetching");
        console.log(parsedData);
        if (parsedData.status === "ok") {
          setScrollableData((prevState) => {
            const newState = [...prevState, ...parsedData.imageList];
            const searchHistory = localStorage.getItem("history");
            const parsedSearchHistory = searchHistory
              ? JSON.parse(searchHistory)
              : {};

            parsedSearchHistory[term] = newState;
            localStorage.setItem(
              "history",
              JSON.stringify(parsedSearchHistory)
            );
            return newState;
          });
        } else {
          console.error(parsedData.error);
          setError(parsedData.error);
        }
      } catch (error: any) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsFetching(false);
      }
    }
    console.log("pI:", pageIndex);
    console.log("^^^^^========^^^^^");
    setIsFirstRender(false);
    return () => console.log("effect CleanUp");
  }, [pageIndex, term]);

  return { scrollableData, error, isFetching, setPageIndex };
};
