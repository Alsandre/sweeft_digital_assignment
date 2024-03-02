import { useRef, useCallback } from "react";
import { TImageListProps } from "../../types";
import styles from "./imageList.module.css";

export const ImageList: React.FC<TImageListProps> = ({
  imageList,
  isLoading,
  onScrollEnd,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const observerTarget = useCallback(
    (node: HTMLLIElement | null) => {
      if (!node) return;
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onScrollEnd();
          console.log("intersected!");
        }
      });
      observer.current.observe(node);
    },
    [isLoading]
  );
  return (
    <div>
      <ul className={styles.content}>
        {imageList.map(({ id, urls, alt_description }, index) => {
          if (index == imageList.length - 1)
            return (
              <li key={id} ref={observerTarget}>
                <img src={urls.thumb} alt={alt_description} />
              </li>
            );
          else
            return (
              <li key={id}>
                <img src={urls.thumb} alt={alt_description} />
              </li>
            );
        })}
      </ul>
    </div>
  );
};
