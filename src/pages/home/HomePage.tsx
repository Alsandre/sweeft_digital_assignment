import { Suspense, lazy, useEffect, useState } from "react";
import { Serachbar } from "../../components";
import { useGetImgBySearchQuery } from "../../store/unsplashApi";
import { PopularImages } from "../../components/popularImages/PopularImages";
import { parseData } from "../../utils/parseData";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ImageList = lazy(() => import("../../components/imageList/ImageList"));

export const HomePage: React.FC = () => {
  const history = useSelector((state: RootState) => state.history);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: scrollableData, isFetching } = useGetImgBySearchQuery(
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
      // scrollableData = history[term].slice(((pageIndex-1)*pageIndex), pageIndex*EQueryParams.SEARCH_RESULT_PER_PAGE)
    }

    //this should be set for infinite scroll logic both in fetch and saved data scenarios
    if (term !== searchTerm) setPageIndex(1);

    //this should be set when fetching required
    setSearchTerm(term.trim());
  };

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      const validQuery = scrollableData.savedData.length > 0;
      if (scrolledToBottom && !isFetching && validQuery) {
        setPageIndex(pageIndex + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [pageIndex, isFetching]);
  return (
    <>
      <h1>Home</h1>
      <Serachbar onSearchChange={handleSearch} />
      {invalidQuery && <span>"No result. Please try other word"</span>}
      {scrollableData.savedData.length > 0 ? (
        <Suspense fallback={<div>"Loading..."</div>}>
          <ImageList imageList={scrollableData.savedData} />
        </Suspense>
      ) : (
        <PopularImages />
      )}
    </>
  );
};
