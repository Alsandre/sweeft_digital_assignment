import { useGetPopularImgsQuery } from "../../store/unsplashApi";

export const PopularImages: React.FC = () => {
  const { data: imagesList, error, isLoading } = useGetPopularImgsQuery("");
  type TImage = (typeof imagesList)[0];
  return (
    <>
      {isLoading && "Loading..."}
      {error && "Rate Limit exceeded, please check back later."}
      {imagesList &&
        imagesList.map((image: TImage) => {
          return (
            <img
              key={image.id}
              alt={image.alt_description}
              src={image.urls.regular}
            />
          );
        })}
    </>
  );
};
