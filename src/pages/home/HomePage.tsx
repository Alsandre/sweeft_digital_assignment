import { Suspense, lazy, useEffect, useState } from "react";
import { Serachbar } from "../../components";
import { useGetImgBySearchQuery } from "../../store/unsplashApi";
import { PopularImages } from "../../components/popularImages/PopularImages";
import { parseData } from "../../utils/parseData";

const ImageList = lazy(() => import("../../components/imageList/ImageList"));

export const HomePage: React.FC = () => {
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
        data: parseData(data),
        isLoading,
        isFetching,
      }),
    }
  );
  const invalidQuery = scrollableData.length === 0 && searchTerm.length > 0;

  const handleSearch = (term: string) => {
    if (term !== searchTerm) setPageIndex(1);
    setSearchTerm(term.trim());
  };

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      const validQuery = scrollableData.length > 0;
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
      <Serachbar onSearchChange={handleSearch} />
      {invalidQuery && <span>"No result. Please try other word"</span>}
      {scrollableData.length > 0 ? (
        <Suspense fallback={<div>"Loading..."</div>}>
          <ImageList imageList={scrollableData} />
        </Suspense>
      ) : (
        <PopularImages />
      )}
    </>
  );
};
