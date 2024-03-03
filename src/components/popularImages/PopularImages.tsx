import { useEffect, useState } from "react";
import ImageList from "../imageList/ImageList";
import { popularImages } from "../../services/unsplashPopularImages";
import { IImageData } from "../../services/unsplashSearch";

export const PopularImages: React.FC = () => {
  const [popImagesList, setPopImagesList] = useState<IImageData[]>([]);
  useEffect(() => {
    async () => {
      const data = await popularImages();
      setPopImagesList(data.imageList);
    };
  }, []);
  return <>{popImagesList && <ImageList imageList={popImagesList} />}</>;
};
