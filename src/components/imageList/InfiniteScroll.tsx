import { useEffect, useState } from "react";
import { TImageData, TInfiniteScrollProps } from "../../types";
import { createPortal } from "react-dom";

import { ImageCard } from "./ImageCard";
import { ImagePreview } from "../imagePreview/ImagePreview";
import styles from "./imageList.module.css";
import { EQueryParams } from "../../constants";

const InfiniteScroll: React.FC<TInfiniteScrollProps> = ({
  imageData,
  updateIndex,
}) => {
  const initActiveImg = {
    id: "",
    alt_description: "",
    urls: {},
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImgId, setActiveImgId] = useState<TImageData>(initActiveImg);
  const [pageIndex, setPageIndex] = useState(1);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveImgId(initActiveImg);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      const validQuery = imageData.savedData.length > 0;
      if (scrolledToBottom && validQuery) {
        setPageIndex(pageIndex + 1);
        if (imageData.maxSavedPage == pageIndex) updateIndex();
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [pageIndex]);
  return (
    <>
      <ul className={styles.content}>
        {imageData.savedData
          .slice(0, pageIndex * EQueryParams.SEARCH_RESULT_PER_PAGE)
          .map((image) => (
            <ImageCard
              key={image.id}
              urls={image.urls}
              alt_description={image.alt_description}
              id={image.id}
              onClick={() => {
                setActiveImgId({
                  id: image.id,
                  alt_description: image.alt_description,
                  urls: image.urls,
                });
                setIsModalOpen(true);
              }}
            />
          ))}
        {isModalOpen &&
          createPortal(
            <ImagePreview {...activeImgId} onCloseModal={handleCloseModal} />,
            document.body
          )}
      </ul>
    </>
  );
};
export default InfiniteScroll;
