import { forwardRef } from "react";
import { TImageData } from "../../types";
import styles from './imageCard.module.css'

export const ImageCard = forwardRef<HTMLLIElement, TImageData>(
  ({ urls, alt_description }, ref) => {
    console.log(ref);
    return (
      <li className={styles.card}>
        <img src={urls.thumb} alt={alt_description} />
      </li>
    );
  }
);
