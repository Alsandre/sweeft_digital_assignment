import { useState } from "react";
import { IImageData } from "../services/unsplashApi";

export const useInfiniteScroll = (term: string) => {
  const [scrollableData, setScrollableData] = useState<IImageData[]>([]);
  const [cachedData, setCachedData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [error, setError] = useState<null | string>(null);

  return { scrollableData, error, isFetching, setPageIndex };
};
