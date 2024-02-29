export enum EQueryType {
  SEARCH = "search",
  POPULAR_IMAGES = "popular",
  STATISTICS = "stats",
}

export type TQuery = {
  query: string;
  page: number;
  id: string;
  type: EQueryType
};

export type TInfiniteScrollProps = {
    searchTerm: string
}