import { useEffect, useState } from "react";
import { TImageData, TInfiniteScrollProps, TQuery } from "../types";
import { generateSearchQuery } from "../services/ApiServices";

export const useInfiniteScroll = ({ searchTerm }: TInfiniteScrollProps) => {
  const [scrollableData, setScrollableData] = useState<TImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    let urlQuery = generateSearchQuery({
      query: searchTerm,
      page: pageIndex,
    } as TQuery);
    let controller = new AbortController();
    let signal = controller.signal;

    const fetchData = async () => {
      console.log(pageIndex);
      setIsLoading(true);
      setError(null);
      try {
        let res = await fetch(urlQuery, { signal });
        if (!res.ok) throw new Error("Please consider updating limit");
        let data = await res.json();
        let imagedata = data.results.map(
          (result: any) => ({ ...result } as Pick<TImageData, keyof TImageData>)
        );
        setScrollableData((prevState) => [
          ...new Set([...prevState, ...imagedata]),
        ]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [pageIndex]);

  return { scrollableData, setPageIndex, isLoading, error };
};
