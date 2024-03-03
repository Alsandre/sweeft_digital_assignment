import { Suspense, lazy, useEffect, useState } from "react";
import { Serachbar } from "../../components";
import { useGetImgBySearchQuery } from "../../store/unsplashApi";
import { PopularImages } from "../../components/popularImages/PopularImages";

const ImageList = lazy(() => import("../../components/imageList/ImageList"));

export const HomePage: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching } = useGetImgBySearchQuery(
    {
      searchTerm,
      page: pageIndex,
    },
    { skip: searchTerm === "" }
  );
  const scrollableData = data?.results ?? [];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
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
