import { forwardRef } from "react";
import { TImageData } from "../../types";

export const ImageCard = forwardRef<HTMLLIElement, TImageData>(
  ({ urls, alt_description }, ref) => {
    console.log(ref);
    return (
      <li ref={ref}>
        <img src={urls.thumb} alt={alt_description} />
      </li>
    );
  }
);
