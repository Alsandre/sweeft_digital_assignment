import { useEffect, useState } from "react";
import { TInfiniteScrollProps, TQuery } from "../types";
import { generateSearchQuery } from "../services/ApiServices";

export const useInfiniteScroll = ({ searchTerm }: TInfiniteScrollProps) => {
  const [scrollableData, setScrollableData] = useState();
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    let urlQuery = generateSearchQuery({ query: searchTerm, page: pageIndex } as TQuery);
    const fetchData = async () => {
        let res = await fetch(urlQuery);
        let data = await res.json();
        setScrollableData(data);
    }
    fetchData()
  }, [pageIndex]);

  return {scrollableData, setPageIndex}
};
