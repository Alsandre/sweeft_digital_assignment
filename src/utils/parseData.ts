import { TImageData, TResultType, TSearchResponse } from "../types";

export function parseData(data: TSearchResponse): TImageData[] {
  if (data) {
    return data?.results.map((result: TResultType) => {
      const { id, alt_description, urls } = result;
      return { id, alt_description, urls };
    });
  } else return [];
}
