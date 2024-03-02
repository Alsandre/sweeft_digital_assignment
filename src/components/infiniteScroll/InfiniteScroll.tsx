import { TImageData, TInfiniteScroll } from "../../types";
import styles from "./infiniteScroll.module.css";

export const InfiniteScroll: React.FC<TInfiniteScroll> = ({ imageList }) => {
  return (
    <>
      {imageList.map((image: TImageData) => {
        return (
          <img
            width={"500px"}
            className={styles["image-card"]}
            src={image.urls.regular}
            alt={image.alt_description}
            key={image.id}
          />
        );
      })}
    </>
  );
};

