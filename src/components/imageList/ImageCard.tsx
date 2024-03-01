import { TImageData } from "../../types";

export const ImageCard: React.FC<TImageData> = ({
  id,
  urls,
  alt_description,
}) => {
  return (
    <li key={id}>
      <img src={urls.thumb} alt={alt_description} />
    </li>
  );
};
