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

export type THistoryState = string[];

export type TActionType = {
  type: string;
  payload?: any;
};
