import { useGetPopularImgsQuery } from "../../store/unsplashApi";
import ImageList from "../imageList/ImageList";

export const PopularImages: React.FC = () => {
  const { data: popImagesList, error, isLoading } = useGetPopularImgsQuery("");
  return (
    <>
      {isLoading && "Loading..."}
      {error && "Rate Limit exceeded, please check back later."}
      {popImagesList && <ImageList imageList={popImagesList} />}
    </>
  );
};
