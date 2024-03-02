import { useState } from "react";
import { TImageData, TImageListProps } from "../../types";
import { createPortal } from "react-dom";

import { ImageCard } from "./ImageCard";
import { ImagePreview } from "../imagePreview/ImagePreview";

export const ImageList: React.FC<TImageListProps> = ({ imageList }) => {
  const initActiveImg = {
    id: "",
    alt_description: "",
    urls: {},
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImgId, setActiveImgId] = useState<TImageData>(initActiveImg);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveImgId(initActiveImg);
  };

  return (
    <>
      {imageList.map((image) => (
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
    </>
  );
};
