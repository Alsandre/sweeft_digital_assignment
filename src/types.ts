export type TImageData = {
  id: string;
  alt_description: string;
  urls: { [key: string]: string };
};

export type TImagePreview = TImageData & { onCloseModal: () => void };

export type TImageListProps = {
  imageList: TImageData[];
};

export type TInfiniteScrollProps = {
  imageData: THistorySlice;
  updateIndex: () => void
};

export type TImageCardProps = TImageData & { onClick: () => void };

export type THistorySlice = {
  maxSavedPage: number;
  maxAvailablePage: number;
  savedData: TImageData[];
};
export type THistoryState = {
  [key: string]: THistorySlice;
};

export type TActionType = {
  type: string;
  payload?: any;
};

export type TSearchBarProps = {
  onSearchChange: (term: string) => void;
};

export enum ELocalStorage {
  SAVED_STORAGE = "HISTORY",
}

export type TResultType = {
  alt_description: string;
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  bradcrumbs: [];
  urls: { [key: string]: string };
  links: { [key: string]: string };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: [];
  sponsorship: any;
  topic_submissions: any;
  user: any;
};

export type TSearchResponse = {
  total: number;
  total_pages: number;
  results: TResultType[];
};

export type TSelectFromResultReturn = {
  data: TImageData[];
  isLoading: boolean;
  isFetching: boolean;
};
