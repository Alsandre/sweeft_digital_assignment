import { useEffect, useState } from "react";
import { ImageList, Serachbar } from "../../components";
import styles from "./homePage.module.css";
import { useGetImgBySearchQuery } from "../../store/unsplashApi";
import { PopularImages } from "../../components/popularImages/PopularImages";

export const HomePage: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, isFetching, isLoading, error } = useGetImgBySearchQuery({
    searchTerm: "whale",
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
      <Serachbar />
      {scrollableData.length > 0 ? (
        <ul className={styles.content}>
          <ImageList imageList={scrollableData} />
          {isLoading && "Loading..."}
          {error && `${error}`}
        </ul>
      ) : (
        <PopularImages />
      )}
    </>
  );
};
