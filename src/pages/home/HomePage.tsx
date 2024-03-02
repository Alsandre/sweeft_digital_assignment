import { Suspense, lazy, useEffect, useState } from "react";
import { Serachbar } from "../../components";
import styles from "./homePage.module.css";
import { useGetImgBySearchQuery } from "../../store/unsplashApi";
import { PopularImages } from "../../components/popularImages/PopularImages";

const ImageList = lazy(() => import("../../components/imageList/ImageList"));

export const HomePage: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching, error } = useGetImgBySearchQuery({
    searchTerm,
    page: pageIndex,
  });
  const scrollableData = data?.results ?? [];
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
      <Serachbar onSearchChange={(term) => console.log(term)}/>
      {scrollableData.length > 0 ? (
        <ul className={styles.content}>
          <Suspense fallback={<div>"Loading..."</div>}>
            <ImageList imageList={scrollableData} />
          </Suspense>
          {error && `${error}`}
        </ul>
      ) : (
        <PopularImages />
      )}
    </>
  );
};
