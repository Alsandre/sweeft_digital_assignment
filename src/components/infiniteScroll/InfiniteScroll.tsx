import { lazy, useRef, useState } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import styles from "./infiniteScroll.module.css";

const ImageList = lazy(() => import("./ImageList"));

const BOTTOM_SCROLL_OFFSET = 40;
const BACK_TO_TOP_OFFSET = 300;

const InfiniteScroll: React.FC<{ term: string }> = ({ term }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollableData, setPageIndex, isFetching, error } =
    useInfiniteScroll(term);
  const [isLoading, setIsLoading] = useState(false);

  const handlScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > BACK_TO_TOP_OFFSET);
    !isFetching && setIsLoading(false);
    if (isLoading) return;
    const scrolledToBottom =
      e.currentTarget.scrollHeight - BOTTOM_SCROLL_OFFSET <
      e.currentTarget.scrollTop + e.currentTarget.clientHeight;
    if (scrolledToBottom) {
      console.log("scroll");
      setPageIndex((prevInd) => prevInd + 1);
      setIsLoading(true);
    }
  };
  const handleClick = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };
  return (
    <div ref={containerRef} onScroll={handlScroll} className={styles.container}>
      {error && `<span>Error! message: ${error}!`}
      {scrollableData.length > 0 && (
        <ul>
          {scrollableData.length > 0 && (
            <ImageList imageList={scrollableData} />
          )}
          {isFetching && "Loading..."}
        </ul>
      )}
      <button
        onClick={handleClick}
        className={`${styles["back-to-top"]} ${
          isScrolled && styles["fade-in"]
        }`}
      >
        BACK TO TOP
      </button>
    </div>
  );
};

export default InfiniteScroll;
