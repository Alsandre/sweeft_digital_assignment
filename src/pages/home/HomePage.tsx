import { Serachbar } from "../../components";
import { InfiniteScroll } from "../../components/infiniteScroll/InfiniteScroll";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import styles from "./homePage.module.css";

export const HomePage: React.FC = () => {
  const { scrollableData, setPageIndex, isLoading, error } = useInfiniteScroll({
    searchTerm: "toad",
  });

  return (
    <>
      <h1>Home</h1>
      <Serachbar />
      <div className={styles.content}>
        {scrollableData && (
          <InfiniteScroll
            imageList={scrollableData}
            onScrollEnd={() => setPageIndex((prevInd) => prevInd + 1)}
          />
        )}
        {isLoading && "Loading..."}
        {error && `${error}`}
      </div>
    </>
  );
};
