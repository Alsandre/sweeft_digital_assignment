import { useGetImgStatsQuery } from "../../store/unsplashApi";
import { TImagePreview } from "../../types";
import styles from "./imagePreview.module.css";

export const ImagePreview: React.FC<TImagePreview> = ({
  id,
  urls,
  alt_description,
  onCloseModal,
}) => {
  const { data } = useGetImgStatsQuery(id);
  console.log(data);
  const downloadsTotal = data?.downloads.total ?? "";
  const likesTotal = data?.likes.total ?? "";
  const viewsTotal = data?.views.total ?? "";
  return (
    <div className={styles.backdrop} onClick={onCloseModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <button onClick={onCloseModal}>Close</button>
        <img
          src={urls.full}
          alt={alt_description}
          className={styles["image-preview"]}
        />
        <span>{downloadsTotal}</span>
        <span>{likesTotal}</span>
        <span>{viewsTotal}</span>
      </div>
    </div>
  );
};
