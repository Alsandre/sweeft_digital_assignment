import { TImageListProps } from "../../types";

export const ImageList: React.FC<TImageListProps> = ({ imageList }) => {
  return (
    <div>
      {imageList.map((imageData) => (
        <li key={imageData.id}>
          <img src={imageData.urls.thumb} alt={imageData.alt_description} />
        </li>
      ))}
    </div>
  );
};
