import { ImageList } from "../../components";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import styles from "./homePage.module.css";

export const HomePage: React.FC = () => {
  const { scrollableData, setPageIndex } = useInfiniteScroll({
    searchTerm: "toad",
  });

  const handleScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
    console.log(e.target);
  };
  return (
    <>
      <h1>Home</h1>
      <div className={styles.content} onWheel={(e) => handleScroll(e)}>
        {scrollableData && <ImageList imageList={scrollableData} />}
      </div>
    </>
  );
};
