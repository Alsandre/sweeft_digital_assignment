import { Suspense, lazy, useState } from "react";
import { Serachbar } from "../../components";
import { useGetImgBySearchQuery } from "../../store/unsplashApi";
import { PopularImages } from "../../components/popularImages/PopularImages";
import { parseData } from "../../utils/parseData";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { THistorySlice } from "../../types";

const InfiniteScroll = lazy(
  () => import("../../components/imageList/InfiniteScroll")
);

export const HomePage: React.FC = () => {
  const history = useSelector((state: RootState) => state.history);
  const [scrollableData, setScrollableData] = useState<THistorySlice>({
    maxAvailablePage: 0,
    maxSavedPage: 0,
    savedData: [],
  });
  const [pageIndex, setPageIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [needFetching, setNeedFetching] = useState(false);
  const { data } = useGetImgBySearchQuery(
    {
      searchTerm,
      page: pageIndex,
    },
    {
      skip: searchTerm === "",
      selectFromResult: ({ data, isFetching, isLoading }) => ({
        data: parseData(data, pageIndex),
        isLoading,
        isFetching,
      }),
    }
  );
  const invalidQuery =
    scrollableData.savedData.length === 0 && searchTerm.length > 0;

  const handleSearch = (term: string) => {
    //if currently entered term is saved dont update search term render saved data first, if out of data then fetch
    //but fetch from the point where saved data ends
    if (history[term]) {
      setScrollableData(history[term]);
    } else {
      //this should be set for infinite scroll logic both in fetch and saved data scenarios
      if (term !== searchTerm) setPageIndex(1);

      //this should be set when fetching required
      setSearchTerm(term.trim());
      setNeedFetching(true);
    }
  };
  console.log(pageIndex, data);
  return (
    <>
      <h1>Home</h1>
      <Serachbar onSearchChange={handleSearch} />
      {invalidQuery && <span>"No result. Please try other word"</span>}

      {scrollableData.savedData.length > 0 ? (
        <Suspense fallback={<div>"Loading..."</div>}>
          {needFetching && (
            <InfiniteScroll
              imageData={data}
              updateIndex={() => setPageIndex(pageIndex + 1)}
            />
          )}
          {!needFetching && (
            <InfiniteScroll
              imageData={scrollableData}
              updateIndex={() => setPageIndex(pageIndex + 1)}
            />
          )}
        </Suspense>
      ) : (
        <PopularImages />
      )}
    </>
  );
};
