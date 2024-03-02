export enum EQueryType {
  SEARCH = "search",
  POPULAR_IMAGES = "popular",
  STATISTICS = "stats",
}

export type TQuery = {
  query: string;
  page: number;
  id: string;
  type: EQueryType;
};

export type TInfiniteScrollProps = {
  searchTerm: string;
};

export type TImageData = {
  id: string;
  alt_description: string;
  urls: { [key: string]: string };
  links: { [key: string]: string };
};

export type TStatsData = {
  id: string;
  downloads: number;
  likes: number;
  views: number;
};

export type TImageListProps = {
  isLoading: boolean;
  imageList: TImageData[];
  onScrollEnd: () => void;
};

export type TImageCardProps = {
  imageData: TImageData;
};

export type THistoryState = string[];

export type TActionType = {
  type: string;
  payload?: any;
};
