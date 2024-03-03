import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export const InfiniteScroll: React.FC<{ term: string }> = ({ term }) => {
  const { scrollableData, setPageIndex, isFetching, error } =
    useInfiniteScroll(term);
  return (
    <div>
      {error && `<span>Error! message: ${error}!`}
      {scrollableData.length > 0 && (
        <ul>
          {scrollableData.map((obj) => {
            return (
              <li key={obj.id}>
                <img src={obj.urls.regular} alt="" />
              </li>
            );
          })}
          {isFetching && "Loading..."}
        </ul>
      )}
    </div>
  );
};
