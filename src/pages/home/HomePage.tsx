import { useEffect } from "react";
import { ImageList, Serachbar } from "../../components";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import styles from "./homePage.module.css";

export const HomePage: React.FC = () => {
  const { scrollableData, setPageIndex, isLoading, error, pageIndex } =
    useInfiniteScroll({
      searchTerm: "toad",
    });

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isLoading) {
        console.log("Fetching more data...");
        setPageIndex((prev) => prev + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [pageIndex, isLoading]);

  return (
    <>
      <h1>Home</h1>
      <Serachbar />
      <div className={styles.content}>
        {scrollableData && <ImageList imageList={scrollableData} />}
        {isLoading && "Loading..."}
        {error && `${error}`}
      </div>
    </>
  );
};
