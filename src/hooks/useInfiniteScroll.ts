import { useEffect, useState } from "react";
import { TImageData, TInfiniteScrollProps, TQuery } from "../types";
import { generateSearchQuery } from "../services/ApiServices";

export const useInfiniteScroll = ({ searchTerm }: TInfiniteScrollProps) => {
  const [scrollableData, setScrollableData] = useState<TImageData[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    let urlQuery = generateSearchQuery({
      query: searchTerm,
      page: pageIndex,
    } as TQuery);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let res = await fetch(urlQuery);
        if (!res.ok) throw new Error("Please consider updating limit");
        let data = await res.json();
        let imagedata = data.results.map(
          (result: any) => ({ ...result } as Pick<TImageData, keyof TImageData>)
        );
        setScrollableData(imagedata);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageIndex]);

  return { scrollableData, setPageIndex, isLoading, error };
};
