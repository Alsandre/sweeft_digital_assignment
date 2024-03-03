import { useGetImgStatsQuery } from "../../store/unsplashApi";
import { TImagePreview } from "../../types";
import { IconDownloads } from "../icons/IconDownloads";
import { IconLikes } from "../icons/IconLikes";
import { IconViews } from "../icons/IconViews";
import styles from "./imagePreview.module.css";

export const ImagePreview: React.FC<TImagePreview> = ({
  id,
  urls,
  alt_description,
  onCloseModal,
}) => {
  const { data } = useGetImgStatsQuery(id);
  const downloadsTotal = data?.downloads.total ?? "";
  const likesTotal = data?.likes.total ?? "";
  const viewsTotal = data?.views.total ?? "";
  return (
    <div className={styles.backdrop} onClick={onCloseModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.container}>
        <button onClick={onCloseModal} className={styles["close-button"]}>
          Close
        </button>
        <img
          src={urls.full}
          alt={alt_description}
          className={styles["image-preview"]}
        />
        <div className={styles.stats}>
        <span className={styles.stat}>
          {downloadsTotal}
          <IconDownloads />
        </span>
        <span className={styles.stat}>
          {likesTotal}
          <IconLikes />
        </span>
        <span className={styles.stat}>
          {viewsTotal}
          <IconViews />
        </span>
        </div>
      </div>
    </div>
  );
};
