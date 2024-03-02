import { TImageCardProps } from "../../types";
import styles from "./imageCard.module.css";

export const ImageCard: React.FC<TImageCardProps> = ({
  urls,
  alt_description,
  onClick,
}) => {
  return (
    <li className={styles.card}>
      <img src={urls.regular} alt={alt_description} onClick={onClick} />
    </li>
  );
};
