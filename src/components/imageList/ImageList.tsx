import { TImageListProps } from "../../types";
import { ImageCard } from "./ImageCard";

export const ImageList: React.FC<TImageListProps> = ({ imageList }) => {
  return (
    <>
      {imageList.map((image) => (
        <ImageCard
          key={image.id}
          urls={image.urls}
          alt_description={image.alt_description}
          links={image.links}
          id={image.id}
        />
      ))}
    </>
  );
};
