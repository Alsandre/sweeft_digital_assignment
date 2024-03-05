import { lazy, useEffect, useState } from "react";
import { popularImages } from "../../services/unsplashPopularImages";
import { IImageData } from "../../services/unsplashSearch";

const ImageList = lazy(() => import("../infiniteScroll/ImageList"));

export const PopularImages: React.FC = () => {
  console.log("pop");
  const [popImagesList, setPopImagesList] = useState<IImageData[]>([]);
  useEffect(() => {
    (async () => {
      const data = await popularImages();
      setPopImagesList(data.imageList);
      console.log(data);
    })();
  }, []);
  return <>{popImagesList && <ImageList imageList={popImagesList} />}</>;
};
