import { TImageListProps } from "../../types";
import { ImageCard } from "./ImageCard";
import styles from './imageList.module.css'

export const ImageList: React.FC<TImageListProps> = ({ imageList }) => {
  return (
    <div>
      <ul className={styles.content}>
        {imageList.map((imageData) => (
          <ImageCard key={imageData.id} {...imageData} />
        ))}
      </ul>
    </div>
  );
};
