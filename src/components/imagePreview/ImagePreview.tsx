import { useEffect, useState } from "react";
import { TImagePreview } from "../../types";
import styles from "./imagePreview.module.css";
import { imageStats } from "../../services/unsplashStats";

export const ImagePreview: React.FC<TImagePreview> = ({
  id,
  urls,
  alt_description,
  onCloseModal,
}) => {
  const [downloads, setDownloads] = useState(0);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  useEffect(() => {
    (async () => {
      const { downloads, likes, views } = await imageStats(id);
      setDownloads(downloads);
      setViews(views);
      setLikes(likes);
    })();
  }, []);
  return (
    <div className={styles.backdrop} onClick={onCloseModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <button onClick={onCloseModal}>Close</button>
        <img
          src={urls.full}
          alt={alt_description}
          className={styles["image-preview"]}
        />
        <span>{downloads}</span>
        <span>{likes}</span>
        <span>{views}</span>
      </div>
    </div>
  );
};
