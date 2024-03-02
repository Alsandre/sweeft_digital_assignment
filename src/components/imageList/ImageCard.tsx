import { TImageData } from "../../types";
import styles from "./imageCard.module.css";

export const ImageCard: React.FC<TImageData> = ({ urls, alt_description }) => {
  return (
    <li className={styles.card}>
      <img src={urls.regular} alt={alt_description} />
    </li>
  );
};
