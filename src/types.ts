export type TImageData = {
  id: string;
  alt_description: string;
  urls: { [key: string]: string };
};

export type TImagePreview = TImageData & { onCloseModal: () => void };

export type TImageListProps = {
  imageList: TImageData[];
};

export type TImageCardProps = TImageData & { onClick: () => void };

export type THistoryState = {
  [key: string]: TImageData[];
};

export type TActionType = {
  type: string;
  payload?: any;
};

export type TSearchBarProps = {
  onSearchChange: (term: string) => void;
};
