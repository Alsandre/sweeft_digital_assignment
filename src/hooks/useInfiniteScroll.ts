import { useEffect, useState } from "react";
import { TImageData, TInfiniteScroll, TQuery } from "../types";
import { generateSearchQuery } from "../services/ApiServices";
import { useGetImgBySearchQuery } from "../services/unsplashApi";

export const useInfiniteScroll = ({ searchTerm }: any) => {
  const [pageIndex, setPageIndex] = useState(1);
  const {data: scrollableData, isLoading, error} = useGetImgBySearchQuery({searchTerm: '', page:pageIndex})

  return { scrollableData, setPageIndex, isLoading, error, pageIndex };
};
