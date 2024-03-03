import { Suspense, lazy, useState } from "react";
import { Serachbar } from "../../components";
import { PopularImages } from "../../components/popularImages/PopularImages";

const InfiniteScroll = lazy(
  () => import("../../components/infiniteScroll/InfiniteScroll")
);

export const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    //if currently entered term is saved dont update search term render saved data first, if out of data then fetch
    //but fetch from the point where saved data ends
    //this should be set for infinite scroll logic both in fetch and saved data scenarios

    setSearchTerm(term.trim());
  };
  return (
    <>
      <h1>Home</h1>
      <Serachbar onSearchChange={handleSearch} />

      <Suspense fallback={<div>"Loading..."</div>}>
        {searchTerm.length > 0 ? (
          <InfiniteScroll term={searchTerm} key={searchTerm} />
        ) : (
          <PopularImages />
        )}
      </Suspense>
    </>
  );
};
