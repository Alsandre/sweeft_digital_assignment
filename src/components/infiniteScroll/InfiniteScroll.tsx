import { useCallback, useRef } from "react";
import { TImageData, TInfiniteScroll } from "../../types";
import styles from "./infiniteScroll.module.css";

export const InfiniteScroll: React.FC<TInfiniteScroll> = ({
  imageList,
  onScrollEnd,
}) => {
  console.log("InfiniteScroll");
  const observer = useRef<IntersectionObserver | null>(null);
  const observerTarget = useCallback((node: HTMLImageElement) => {
    if (!node) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        console.log("no intersec");
        if (entries[0].isIntersecting) {
          console.log("intersec");
          onScrollEnd();
        }
      },
      { threshold: 0.3 }
    );
    observer.current.observe(node);
  }, []);
  return (
    <>
      {imageList.map((image: TImageData, index) => {
        return (
          <img
            width={"500px"}
            className={styles["image-card"]}
            src={image.urls.regular}
            alt={image.alt_description}
            key={image.id}
            ref={index == imageList.length - 1 ? observerTarget : null}
          />
        );
      })}
    </>
  );
};
