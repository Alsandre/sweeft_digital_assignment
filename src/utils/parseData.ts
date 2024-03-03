import { THistorySlice, TResultType, TSearchResponse } from "../types";

export function parseData(
  data: TSearchResponse,
  pageIndex: number
): THistorySlice {
  if (data) {
    let imageList = data?.results.map((result: TResultType) => {
      const { id, alt_description, urls } = result;
      return { id, alt_description, urls };
    });
    const maxAvailablePage = data.total_pages;
    return { maxSavedPage: pageIndex, maxAvailablePage, savedData: imageList };
  } else return { maxAvailablePage: 0, maxSavedPage: 0, savedData: [] };
}
