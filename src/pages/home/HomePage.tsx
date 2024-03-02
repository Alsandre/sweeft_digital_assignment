import { ImageList, Serachbar } from "../../components";
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
          <ImageList
            isLoading={isLoading}
            imageList={scrollableData}
            onScrollEnd={() => setPageIndex((curInd) => curInd + 1)}
          />
        )}
        {isLoading && "Loading..."}
        {error && `${error}`}
      </div>
    </>
  );
};
