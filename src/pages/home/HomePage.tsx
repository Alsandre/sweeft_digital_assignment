import { useEffect, useState } from "react";
import { ImageList, Serachbar } from "../../components";
import styles from "./homePage.module.css";
import { useGetImgBySearchQuery } from "../../store/unsplashApi";

export const HomePage: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, isFetching, isLoading, error } = useGetImgBySearchQuery({
    searchTerm: "",
    page: pageIndex,
  });
  const scrollableData = data?.results ?? [];

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPageIndex((prev) => prev + 1);
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
      <ul className={styles.content}>
        {scrollableData.length > 0 && <ImageList imageList={scrollableData} />}
        {isLoading && "Loading..."}
        {error && `${error}`}
      </ul>
    </>
  );
};
