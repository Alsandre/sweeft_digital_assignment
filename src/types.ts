import { EQueryType } from "./constants";

export type TQuery = {
  query: string;
  page: number;
  id: string;
  type: EQueryType;
};

export type TInfiniteScroll = {
  imageList: TImageData[];
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
  imageList: TImageData[];
};

export type TImageCardProps = {
  imageData: TImageData;
};

export type THistoryState = string[];

export type TActionType = {
  type: string;
  payload?: any;
};
